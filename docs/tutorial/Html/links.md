# 链接

`<a>`（anchor）元素通过 `href` 创建超链接，连接页面、文件、锚点或外部资源；适用于导航、下载、邮件/电话跳转等所有「可点击跳转」场景。

## 核心概念

- **href 是核心**：无 `href` 或 `href=""` 的 `<a>` 只是占位，不是有效链接。
- **绝对 vs 相对**：绝对 URL 含协议与域名；相对路径相对于当前文档位置解析。
- **锚点链接**：`href="#id"` 跳转到同页或他页中带对应 `id` 的元素。
- **target 行为**：`_blank` 在新标签打开；需配合 `rel="noopener noreferrer"` 防安全风险。
- **download 属性**：提示浏览器下载而非导航（同源或 blob URL 时有效）。
- **伪协议**：`mailto:`、`tel:` 唤起邮件客户端或拨号（移动端）。

## 属性速查

| 属性 | 值示例 | 作用 |
| ---- | ------ | ---- |
| `href` | `https://example.com`、`./page.html`、`#section` | 链接目标（必填才有跳转） |
| `target` | `_self`（默认）、`_blank`、`_parent`、`_top` | 打开上下文 |
| `rel` | `noopener`、`noreferrer`、`nofollow`、`external` | 关系与安全声明 |
| `download` | `download` 或 `download="文件名.pdf"` | 触发下载 |
| `hreflang` | `zh-CN`、`en` | 目标页面语言 |
| `type` | `text/html` | 链接 MIME 类型提示 |
| `title` | 任意文本 | 补充说明（tooltip） |

## URL 类型对照

| 类型 | 示例 | 说明 |
| ---- | ---- | ---- |
| 绝对 URL | `https://developer.mozilla.org/zh-CN/` | 完整地址，站外跳转 |
| 根相对 | `/tutorial/Html/intro` | 从站点根目录起算 |
| 文档相对 | `./text.md`、`../Css/base` | 相对当前文件路径 |
| 页内锚点 | `#top`、`intro.md#核心概念` | 跳转到元素 `id` |
| 邮件 | `mailto:user@example.com?subject=Hi` | 打开邮件客户端 |
| 电话 | `tel:+8613800138000` | 移动端拨号 |
| 空链接 | `href="#"` 或 `href=""` | 仅占位，易引发页顶跳动，慎用 |

## 示例

### 基本链接与路径

```html
<!-- 站外绝对链接 -->
<a href="https://developer.mozilla.org/zh-CN/">MDN 中文</a>

<!-- 站内根相对路径 -->
<a href="/tutorial/Html/intro">HTML 入门</a>

<!-- 文档相对路径 -->
<a href="./text.md">文本内容章节</a>

<!-- 页内锚点：目标元素需有 id="pricing" -->
<a href="#pricing">跳到定价区</a>
<section id="pricing">...</section>
```

### 新标签打开（安全写法）

```html
<a
  href="https://example.com"
  target="_blank"           <!-- 新标签页打开 -->
  rel="noopener noreferrer" <!-- 防止 window.opener 劫持与 Referer 泄露 -->
>
  外部网站（安全打开）
</a>
```

> **安全提示**：`target="_blank"` 不加 `rel="noopener"` 时，新页面可通过 `window.opener` 操控原页面（tabnabbing 攻击）。始终加上 `noopener`；需要隐藏 Referer 时再加 `noreferrer`（已隐含 noopener）。

### 下载、邮件与电话

```html
<!-- download：提示下载；filename 可指定保存名 -->
<a href="/files/guide.pdf" download="用户指南.pdf">下载 PDF</a>

<!-- mailto：可带主题、抄送等查询参数 -->
<a href="mailto:support@example.com?subject=咨询&body=你好">发送邮件</a>

<!-- tel：国际格式建议带 + 与国家码 -->
<a href="tel:+861012345678">010-12345678</a>
```

## 常见陷阱与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 用 `<a>` 做按钮 | 应用 `<button>`；链接用于导航，按钮用于操作 |
| `href="#"` 当 JS 钩子 | 点击会跳页顶；用 `button` 或 `href="javascript:void(0)"`（仍不推荐） |
| 链接文字「点击这里」 | 应描述目标，利于 SEO 与屏幕阅读器 |
| 跨域 download 无效 | `download` 仅对同源 URL 或 blob 可靠 |
| 忘记 `alt` 的图片链接 | 图片链接内 `<img>` 必须有 `alt` → 见图片章节 |
| 特殊字符未编码 | URL 中的空格、`&` 等需编码 → [字符实体](./entities) |

**相关章节**：[简介与文档结构](./intro) · [语义化结构](./semantic) · [列表](./lists) · [全局属性](./global-attributes)

## MDN 参考

- [创建超链接](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Creating_links)
- [&lt;a&gt; 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a)
- [URL 与路径](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL)
- [rel 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel)
- [Link types（noopener 等）](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/noopener)
- [download 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a#download)
