/* ==========================================================================
 * 启能力 ERP · 数据对齐网关（Cloudflare Worker 骨架）
 * 部署域名：erp.nexduo.xyz
 *
 * 为什么需要它：前端是纯静态站点，浏览器不能直连钉钉开放平台（跨域 + 应用鉴权）。
 * 这个 Worker 承担「翻译 + 排队 + 幂等」：把前端 DTO 翻成钉钉 AI 表格的
 * fieldId，把钉钉表单提交翻成前端单据，并维护同步游标、队列与冲突记录。
 *
 * 前端契约：site/sync.js 的 GATEWAY
 *   GET  /api/sync/pull?since=&module=
 *   POST /api/sync/push
 *   GET  /api/sync/status
 *   POST /api/sync/resolve
 *   POST /api/sync/webhook       （钉钉自动化 / 表单回调）
 *
 * 部署步骤：
 *   1. wrangler kv:namespace create SYNC_KV  → 把 id 填进 wrangler.toml
 *   2. wrangler secret put DINGTALK_APP_KEY / DINGTALK_APP_SECRET / SYNC_SECRET
 *   3. wrangler deploy
 *   4. 站点「数据对齐与自动化流」页把运行模式从「演示」切到「实时」
 *
 * 注意：下面 dingtalkCall() 中的 AI 表格 OpenAPI 路径是占位结构 —— 钉钉侧表 ID
 * 与字段 ID 已在 table-map.json 里精确定位，接真实 API 时只需把 URL 与方法
 * 换成当前租户开放的 AI 表格记录接口即可，映射与队列逻辑无需改动。
 * ========================================================================== */

import TABLE_MAP_TEXT from './table-map.json';

const MAP = typeof TABLE_MAP_TEXT === 'string' ? JSON.parse(TABLE_MAP_TEXT) : TABLE_MAP_TEXT;
const BASE_ID = MAP.baseId;

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,X-Sync-Token',
      'Cache-Control': 'no-store',
      ...extra,
    },
  });
}

function ok(data) { return json({ ok: true, ...data }); }
function fail(msg, status = 400) { return json({ ok: false, error: msg }, status); }

// ---------------------------------------------------------------- KV 队列
async function kvGet(env, key, fallback) {
  const raw = await env.SYNC_KV.get(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch (e) { return fallback; }
}
async function kvPut(env, key, value) {
  await env.SYNC_KV.put(key, JSON.stringify(value));
}
async function appendLog(env, entry) {
  const logs = await kvGet(env, 'logs', []);
  logs.unshift({ ts: new Date().toISOString(), ...entry });
  await kvPut(env, 'logs', logs.slice(0, 300));
}

// ---------------------------------------------------------------- 字段映射
// 前端 payload 的 key 可能是中文显示名，也可能是 DTO 列名；两者都能翻成 fieldId。
function toDingtalk(code, data) {
  const t = MAP.tables[code];
  if (!t) return null;
  const fields = {};
  for (const f of t.fields) {
    let v = data[f.label];
    if (v === undefined) v = data[f.key];
    if (v === undefined || v === null || v === '') continue;
    if (!f.fieldId) continue;
    // 附件 / 多选在钉钉侧是数组，其余按标量写入
    fields[f.fieldId] = Array.isArray(v) ? v : String(v);
  }
  return { tableId: t.tableId, fields };
}
function fromDingtalk(code, record) {
  const t = MAP.tables[code];
  if (!t) return null;
  const byId = {};
  for (const [k, v] of Object.entries(record.fields || record)) byId[k] = v;
  const data = {};
  for (const f of t.fields) {
    let v = byId[f.fieldId];
    if (v === undefined) v = record[f.label];
    if (v !== undefined) data[f.label] = v;
  }
  return data;
}

// ---------------------------------------------------------------- 钉钉开放平台
let _token = null;
async function dingtalkToken(env) {
  if (_token && _token.exp > Date.now()) return _token.value;
  if (!env.DINGTALK_APP_KEY || !env.DINGTALK_APP_SECRET) {
    throw new Error('未配置 DINGTALK_APP_KEY / DINGTALK_APP_SECRET');
  }
  const r = await fetch('https://api.dingtalk.com/v1.0/oauth2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ appKey: env.DINGTALK_APP_KEY, appSecret: env.DINGTALK_APP_SECRET }),
  });
  const d = await r.json();
  if (!d.accessToken) throw new Error('获取钉钉 token 失败: ' + JSON.stringify(d));
  _token = { value: d.accessToken, exp: Date.now() + (d.expireIn || 7200) * 1000 - 60000 };
  return _token.value;
}

/**
 * AI 表格记录 API 适配层。
 * TODO: 按当前租户实际开放的「AI 表格 / 多维表记录」OpenAPI 路径与方法替换 URL。
 * tableId / fieldId 已经由 table-map.json 精确给出，映射层不需要改。
 */
async function dingtalkCall(env, path, method, body) {
  const token = await dingtalkToken(env);
  const url = 'https://api.dingtalk.com' + path;
  const r = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-acs-dingtalk-access-token': token,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  if (!r.ok) throw new Error('钉钉 API ' + r.status + ': ' + text.slice(0, 200));
  try { return JSON.parse(text); } catch (e) { return { raw: text }; }
}
async function upsertDingtalkRecord(env, code, remoteId, payload) {
  const mapped = toDingtalk(code, payload);
  if (!mapped) throw new Error('未知资源码: ' + code);
  // TODO: 换成真实记录接口；remoteId 用作幂等键，避免重复写入
  return dingtalkCall(env,
    `/v1.0/able/bases/${BASE_ID}/tables/${mapped.tableId}/records`,
    remoteId ? 'PUT' : 'POST',
    { fields: mapped.fields, idempotencyKey: remoteId || undefined });
}

// ---------------------------------------------------------------- 路由
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '');

    if (request.method === 'OPTIONS') return json({}, 204);
    if (env.SYNC_SECRET && request.headers.get('X-Sync-Token') !== env.SYNC_SECRET &&
        path !== '/api/sync/status') {
      return fail('同步令牌无效', 401);
    }

    try {
      // 状态：前端顶部同步状态条读数
      if (path === '/api/sync/status' && request.method === 'GET') {
        const [cursor, outbox, inbox, conflicts] = await Promise.all([
          env.SYNC_KV.get('cursor'),
          kvGet(env, 'outbox', []), kvGet(env, 'inbox', []), kvGet(env, 'conflicts', []),
        ]);
        return ok({ host: 'erp.nexduo.xyz', mode: 'live', baseId: BASE_ID,
          tables: Object.keys(MAP.tables).length, cursor: cursor || '',
          pending: outbox.filter(x => x.state !== 'synced').length,
          inbox: inbox.length, conflicts: conflicts.filter(x => x.state === 'open').length,
          timestamp: new Date().toISOString() });
      }

      // 拉取：把钉钉表单 / 数据表的新记录翻成前端单据
      if (path === '/api/sync/pull' && request.method === 'GET') {
        const since = url.searchParams.get('since') || '';
        const moduleCode = url.searchParams.get('module') || 'all';
        const inbox = await kvGet(env, 'inbox', []);
        const items = inbox
          .filter(x => !x.delivered && (!since || x.ts > since))
          .filter(x => moduleCode === 'all' || x.code === moduleCode)
          .slice(0, 50)
          .map(x => ({
            moduleKey: x.moduleKey, code: x.code, remoteId: x.remoteId,
            formName: x.formName || '钉钉表单', person: x.person || '钉钉表单',
            data: fromDingtalk(x.code, x.rawFields || {}),
            note: '同步网关拉取',
          }));
        // 标记已投递，实现至少一次投递 + 前端幂等去重
        for (const x of inbox) if (items.some(i => i.remoteId === x.remoteId)) x.delivered = true;
        await kvPut(env, 'inbox', inbox);
        await env.SYNC_KV.put('cursor', new Date().toISOString());
        await appendLog(env, { flow: 'F01', title: '增量拉取', detail: items.length + ' 条' });
        return ok({ items, cursor: new Date().toISOString() });
      }

      // 推送：前端填的单据回写钉钉数据表
      if (path === '/api/sync/push' && request.method === 'POST') {
        const body = await request.json();
        const items = Array.isArray(body.items) ? body.items : [];
        const outbox = await kvGet(env, 'outbox', []);
        const result = { synced: [], failed: [] };
        for (const it of items) {
          const idem = it.remoteId || (it.module + ':' + it.no);
          const hit = outbox.find(x => x.idem === idem);
          if (hit && hit.state === 'synced') { result.synced.push(idem); continue; }
          try {
            // 演示 / 未配置钉钉凭证时只落 KV 队列，不阻断前端
            if (env.DINGTALK_APP_KEY) {
              const res = await upsertDingtalkRecord(env, it.module, it.remoteId, it.data || {});
              it.dingtalkId = res.id || res.recordId || '';
            }
            outbox.unshift({ idem, ts: new Date().toISOString(), state: 'synced',
              code: it.module, no: it.no, action: it.action });
            result.synced.push(idem);
          } catch (e) {
            outbox.unshift({ idem, ts: new Date().toISOString(), state: 'failed',
              code: it.module, no: it.no, error: e.message });
            result.failed.push({ idem, error: e.message });
          }
        }
        await kvPut(env, 'outbox', outbox.slice(0, 500));
        await appendLog(env, { flow: 'F02', title: '推送完成',
          detail: result.synced.length + ' 成功 / ' + result.failed.length + ' 失败' });
        return ok({ count: result.synced.length, ...result });
      }

      // 钉钉表单 / 自动化回调：写入待拉取队列
      if (path === '/api/sync/webhook' && request.method === 'POST') {
        const body = await request.json();
        const inbox = await kvGet(env, 'inbox', []);
        inbox.unshift({ ...body, ts: body.ts || new Date().toISOString(), delivered: false });
        await kvPut(env, 'inbox', inbox.slice(0, 500));
        await appendLog(env, { flow: 'F01', title: '收到钉钉表单回调',
          detail: body.code || body.module || 'unknown' });
        return ok({ queued: 1 });
      }

      // 冲突裁决
      if (path === '/api/sync/resolve' && request.method === 'POST') {
        const body = await request.json();
        const conflicts = await kvGet(env, 'conflicts', []);
        const c = conflicts.find(x => x.id === body.id);
        if (c) {
          c.state = body.choice === 'local' ? 'keep-local' : 'keep-remote';
          c.resolvedAt = new Date().toISOString();
          await kvPut(env, 'conflicts', conflicts);
        }
        await appendLog(env, { flow: 'F06', title: '冲突已裁决', detail: body.id });
        return ok({ resolved: !!c });
      }

      return fail('未知同步端点: ' + path, 404);
    } catch (e) {
      await appendLog(env, { flow: 'ERR', title: '网关异常', detail: e.message });
      return fail(e.message, 500);
    }
  },
};
