# HTML 简介与文档结构

HTML（HyperText Markup Language）是描述网页结构的标记语言，用标签告诉浏览器「这里是什么内容、如何组织」；适用于任何静态或动态网页的骨架搭建。

## 核心概念

- **标记语言**：用成对或自闭合标签包裹内容，不是编程语言，没有逻辑运算。
- **语义优先**：标签名应表达内容含义（如 `header`、`nav`），而非仅用于样式（详见 [语义化结构](./semantic)）。
- **树形结构**：文档是嵌套的 DOM 树；每个元素有父节点、子节点与兄弟节点。
- **DOCTYPE**：声明文档类型，让浏览器以标准模式渲染，避免怪异模式。
- **head vs body**：`head` 放元数据（标题、编码、样式表引用）；`body` 放可见内容。
- **字符编码**：必须尽早声明 UTF-8，否则中文等字符可能乱码。
- **响应式基础**：`viewport` meta 让移动端正确缩放，是移动适配的第一步。

## 文档骨架速查

| 元素 / 属性 | 作用 | 常用值 / 备注 |
| ----------- | ---- | ------------- |
| `<!DOCTYPE html>` | 声明 HTML5 文档 | 必须放在第一行 |
| `<html lang="...">` | 根元素，声明页面语言 | `zh-CN`、`en` |
| `<head>` | 元数据容器 | 不可见，SEO / 资源加载关键 |
| `<meta charset="UTF-8">` | 字符编码 | 应放在 `head` 最前 |
| `<meta name="viewport" ...>` | 视口设置 | `width=device-width, initial-scale=1` |
| `<title>` | 页面标题 | 显示在标签页，影响 SEO |
| `<link rel="stylesheet" href="...">` | 引入外部 CSS | `rel` 必填 |
| `<script src="..." defer>` | 引入外部 JS | `defer` 不阻塞解析；见下方说明 |
| `<body>` | 可见内容容器 | 每页唯一 |
| `<!-- 注释 -->` | 开发者注释 | 不会渲染到页面 |

## 常用 meta 标签

| meta | 典型写法 | 用途 |
| ---- | -------- | ---- |
| charset | `<meta charset="UTF-8">` | 字符集 |
| viewport | `<meta name="viewport" content="width=device-width, initial-scale=1">` | 移动端视口 |
| description | `<meta name="description" content="页面摘要">` | 搜索引擎摘要 |
| author | `<meta name="author" content="作者名">` | 作者信息 |
| theme-color | `<meta name="theme-color" content="#ffffff">` | 浏览器 UI 主题色 |

## link 与 script 加载策略

| 属性 | 适用元素 | 说明 |
| ---- | -------- | ---- |
| `rel="stylesheet"` | `<link>` | 引入 CSS，默认阻塞渲染 |
| `rel="icon"` | `<link>` | 网站 favicon |
| `src` | `<script>` | 外部脚本 URL |
| `defer` | `<script>` | DOM 解析完再执行，保持顺序 |
| `async` | `<script>` | 下载完立即执行，不保证顺序 |
| `type="module"` | `<script>` | ES Module，默认 defer 行为 |

## 示例

### 最小 HTML5 模板

```html
<!DOCTYPE html> <!-- 声明 HTML5 -->
<html lang="zh-CN"> <!-- 页面语言：简体中文 -->
<head>
  <meta charset="UTF-8"> <!-- 字符编码，尽早声明 -->
  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- 移动端视口 -->
  <title>我的第一个页面</title> <!-- 浏览器标签页标题 -->
  <link rel="stylesheet" href="styles.css"> <!-- 外部样式表 -->
</head>
<body>
  <h1>你好，世界</h1>
  <p>这是正文内容。</p>
  <script src="app.js" defer></script> <!-- defer：不阻塞 DOM 解析 -->
</body>
</html>
```

### 内联样式与脚本（不推荐大规模使用）

```html
<head>
  <style>
    /* 内联 CSS：小片段可以，大项目应拆到外部文件 */
    body { font-family: sans-serif; }
  </style>
</head>
<body>
  <script>
    // 内联 JS：缺少 defer/async，可能阻塞渲染
    console.log('页面加载中');
  </script>
</body>
```

### HTML 注释

```html
<!-- 这是注释，不会显示在页面上 -->
<!-- 
  多行注释
  常用于临时禁用代码块
-->
<p>可见段落</p>
<!-- <p>被注释掉的段落</p> -->
```

## 常见陷阱与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 缺少 DOCTYPE | 浏览器进入怪异模式，布局行为不一致 |
| charset 位置靠后 | 解析前已读入的字节可能乱码；应放在 `head` 前 1024 字节内 |
| 多个 `<title>` | 只有第一个生效；每页应只有一个 |
| `script` 无 defer/async | 阻塞 HTML 解析，拖慢首屏；脚本放 `body` 末尾或加 `defer` |
| 用 `<div>` 代替语义标签 | 可访问性与 SEO 变差 → 见 [语义化结构](./semantic) |
| 全局属性滥用 | `id`/`class`/`style` 等见 [全局属性](./global-attributes) |

**相关章节**：[文本内容](./text) · [语义化结构](./semantic) · [全局属性](./global-attributes)

## MDN 参考

- [HTML 入门](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content)
- [HTML 文档结构与 head](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Webpage_metadata)
- [DOCTYPE](https://developer.mozilla.org/zh-CN/docs/Glossary/Doctype)
- [&lt;meta&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta)
- [&lt;link&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link)
- [&lt;script&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script)
- [HTML 注释](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content#html_注释)
