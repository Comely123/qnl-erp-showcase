# -*- coding: utf-8 -*-
"""
把 site/ 下的外链版页面打包成自包含单文件 index.html。

背景：部分预览器 / 静态托管只注入 HTML 本身，不解析相对路径的
styles.css 与 *.js，导致 .hidden 失效、登录层与主界面叠加显示。
把全部资源内联后，只要有 index.html 一个文件即可完整运行。

源文件（保持不变，仍是唯一的真源）：
    index.template.html   外链版 HTML 骨架
    styles.css
    data.js / config.js / engine.js / app.js
产物：
    index.html            自包含单文件入口

以后改了任何源文件，重跑：python build_standalone.py
"""
import pathlib
import subprocess
import json
import re

HERE = pathlib.Path(__file__).resolve().parent
# 脚本放在站点目录内，或放在站点上一级目录，都能正确定位资源
SITE = HERE if (HERE / "styles.css").exists() else HERE / "site"
TEMPLATE = SITE / "index.template.html"
OUTPUT = SITE / "index.html"
ASSET_ORDER = ["data.js", "config.js", "engine.js", "app.js"]


def ensure_template():
    """初次运行时把现有外链版 index.html 固化为模板。"""
    if TEMPLATE.exists():
        return
    src = OUTPUT.read_text(encoding="utf-8")
    if "<script src=\"data.js\">" not in src:
        raise SystemExit("index.html 已是内联版且缺少 index.template.html，无法重建")
    TEMPLATE.write_text(src, encoding="utf-8")
    print("[template] 已固化外链骨架 -> index.template.html")


def role_buttons():
    """从 config.js 读取 6 个角色，生成静态兜底按钮（JS 启动后会被覆盖）。"""
    code = (
        "global.window=global;require('./config.js');"
        "var r=(global.ERP_CONFIG||{}).roles||[];"
        "process.stdout.write(JSON.stringify(r.map(function(x){"
        "return {id:x.id,name:x.name,person:x.person,color:x.color,desc:x.desc}})));"
    )
    out = subprocess.run(
        ["node", "-e", code], cwd=str(SITE),
        capture_output=True, text=True, encoding="utf-8", check=True,
    ).stdout
    roles = json.loads(out)
    esc = lambda s: (str(s).replace("&", "&amp;").replace("<", "&lt;")
                     .replace(">", "&gt;").replace('"', "&quot;"))
    return "\n".join(
        '        <button class="role-quick" data-act="login-role" data-role="%s" title="%s">'
        '<i style="background:%s"></i>%s<small>%s</small></button>'
        % (esc(r["id"]), esc(r["desc"]), esc(r["color"]),
           esc(r["name"]), esc(r["person"]))
        for r in roles
    ), len(roles)


def inline_guard(text, filename):
    """内联脚本里出现 </script 会截断 HTML，提前拦下。"""
    if re.search(r"</script", text, re.I):
        raise SystemExit("%s 含有 </script，需要转义后再内联" % filename)
    if re.search(r"</style", text, re.I):
        raise SystemExit("%s 含有 </style，需要转义后再内联" % filename)


def main():
    ensure_template()
    html = TEMPLATE.read_text(encoding="utf-8")

    css = (SITE / "styles.css").read_text(encoding="utf-8")
    inline_guard(css, "styles.css")
    link = '<link rel="stylesheet" href="styles.css">'
    if link not in html:
        raise SystemExit("模板里找不到样式外链标签")
    html = html.replace(
        link,
        "<style id=\"inline-styles\">\n" + css + "\n</style>", 1,
    )

    buttons, n_roles = role_buttons()
    empty_roles = '<div class="login-roles" id="loginRoles"></div>'
    if empty_roles not in html:
        raise SystemExit("模板里找不到 loginRoles 容器")
    html = html.replace(
        empty_roles,
        '<div class="login-roles" id="loginRoles">\n' + buttons + "\n      </div>", 1,
    )

    total = 0
    for name in ASSET_ORDER:
        js = (SITE / name).read_text(encoding="utf-8")
        inline_guard(js, name)
        tag = '<script src="%s"></script>' % name
        if tag not in html:
            raise SystemExit("模板里找不到脚本外链标签：%s" % name)
        html = html.replace(
            tag,
            '<script data-inline="%s">\n' % name + js + "\n</script>", 1,
        )
        total += len(js)

    # 说明性注释，便于他人知道该文件是产物
    html = html.replace(
        "<!DOCTYPE html>",
        "<!DOCTYPE html>\n<!-- 自包含构建产物：由 build_standalone.py 从 index.template.html + 5 个源文件生成，请勿手工编辑 -->",
        1,
    )

    OUTPUT.write_text(html, encoding="utf-8")
    size = OUTPUT.stat().st_size
    print("[build] index.html 自包含构建完成")
    print("        内联 CSS 1 份 / JS %d 份 / 静态角色按钮 %d 个" % (len(ASSET_ORDER), n_roles))
    print("        产物大小 %.1f KB，无外部资源引用" % (size / 1024))
    # 只看 HTML 标签上的 src/href（先剥掉 script/style 内容，避免误报 JS 字符串）
    markup = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", "", html, flags=re.S | re.I)
    left = [u for u in re.findall(r'(?:src|href)="([^"]+)"', markup)
            if not u.startswith(("#", "http://", "https://", "javascript:", "data:"))]
    print("        剩余相对路径引用：", left or "无")
    if left:
        raise SystemExit("仍存在外部资源引用，自包含构建失败")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
