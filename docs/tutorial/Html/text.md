# 文本内容

HTML 提供一组文本级元素，用于标记标题、段落、强调、引用、代码等文字内容；适用于文章、说明文档、博客等以阅读为主的页面。

## 核心概念

- **块级 vs 行内**：`<h1>`–`<p>` 等默认独占一行；`<em>`、`<strong>` 等行内元素不换行（详见 [语义化结构](./semantic#块级与行内)）。
- **标题层级**：`<h1>`–`<h6>` 表达大纲结构，不要跳级（如 h1 后直接 h3）。
- **语义强调**：`<em>` 表示语气强调（斜体），`<strong>` 表示重要（粗体）；不要仅用 `<b>`/`<i>` 做样式。
- **预格式化**：`<pre>` 保留空白与换行；`<code>` 标记代码片段，常嵌套在 `<pre>` 内。
- **引用**：`<blockquote>` 块级引用；行内短引用可用 `<q>`（本表未展开）。
- **机器可读**：`<time datetime="...">` 让日期可被程序解析；`<abbr title="...">` 标记缩写全称。

## 元素速查表

| 元素 | 类型 | 作用 |
| ---- | ---- | ---- |
| `<h1>`–`<h6>` | 块级 | 六级标题，h1 最重要，每页通常仅一个 |
| `<p>` | 块级 | 段落 |
| `<em>` | 行内 | 语气强调（默认斜体） |
| `<strong>` | 行内 | 重要内容（默认粗体） |
| `<mark>` | 行内 | 高亮标记（如搜索结果） |
| `<br>` | 空元素 | 强制换行，不自成段落 |
| `<hr>` | 空元素 | 主题分隔线 |
| `<pre>` | 块级 | 预格式化文本，保留空格与换行 |
| `<code>` | 行内 | 代码片段 |
| `<sub>` / `<sup>` | 行内 | 下标 / 上标 |
| `<blockquote>` | 块级 | 长引用块 |
| `<abbr title="...">` | 行内 | 缩写，hover 显示全称 |
| `<time datetime="...">` | 行内 | 日期/时间，机器可读 |
| `<address>` | 块级 | 联系信息（作者、邮箱、地址） |

## 常用属性

| 元素 | 属性 | 说明 |
| ---- | ---- | ---- |
| `<abbr>` | `title` | 缩写的完整拼写 |
| `<time>` | `datetime` | ISO 8601 格式日期，如 `2026-08-01` |
| `<blockquote>` | `cite` | 引用来源 URL（可选） |
| 全局 | `class`、`id` | 样式与脚本钩子 → [全局属性](./global-attributes) |

## 示例

### 标题与段落

```html
<h1>HTML 文本元素</h1>        <!-- 页面主标题，每页通常一个 -->
<h2>基本概念</h2>             <!-- 二级标题，构成文档大纲 -->
<p>段落是正文的基本单位，浏览器会自动在段前后留白。</p>
<p>另起一段只需再用一个 <code>&lt;p&gt;</code>，不要用多个 <code>&lt;br&gt;</code> 模拟段落。</p>
```

### 强调、高亮与换行

```html
<p>
  <em>语气上</em>需要强调的内容，屏幕阅读器会改变语调。
  <strong>非常重要</strong>的警告信息，默认加粗显示。
  搜索命中词可以用 <mark>高亮</mark> 标记。
</p>
<p>
  诗歌或地址偶尔需要<br> <!-- br：行内换行，非段落 -->
  手动换行，但不宜滥用。
</p>
<hr> <!-- 水平线：表示主题切换 -->
```

### 代码、引用与时间

```html
<p>行内代码：<code>const x = 1;</code></p>

<pre><code> <!-- pre 保留缩进与换行 -->
function greet(name) {
  return `Hello, ${name}`;
}
</code></pre>

<blockquote cite="https://example.com/source">
  <p>设计不仅仅是外观，设计是产品如何工作。</p>
</blockquote>

<p>
  <abbr title="HyperText Markup Language">HTML</abbr> 发布于
  <time datetime="1991">1991 年</time>。
</p>

<p>化学式 H<sub>2</sub>O，面积 m<sup>2</sup>。</p>

<address>
  作者：<a href="mailto:me@example.com">me@example.com</a><br>
  地址：北京市朝阳区
</address>
```

## 常见陷阱与交叉引用

| 问题 | 正确做法 |
| ---- | -------- |
| 用 `<h3>` 做「大字」而非标题 | 标题应用 CSS 控制字号；保持层级语义 |
| 多个 `<h1>` | 通常每页一个 h1；其余用 h2–h6 |
| 用 `<br>` 撑间距 | 间距用 CSS margin/padding |
| `<pre>` 内不包 `<code>` | 可以单独用 `<pre>`，但 `<code>` 便于样式统一 |
| `<address>` 当普通地址文本 | 仅用于文档/文章作者的联系信息 |
| 特殊字符未转义 | `<`、`&` 等需用实体 → [字符实体](./entities) |

**相关章节**：[语义化结构](./semantic) · [链接](./links) · [全局属性](./global-attributes) · [字符实体](./entities)

## MDN 参考

- [HTML 文本基础](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Headings_and_paragraphs)
- [强调与重要性](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Emphasis_and_importance)
- [&lt;pre&gt; / &lt;code&gt;](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Advanced_text_features#标记代码)
- [&lt;blockquote&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/blockquote)
- [&lt;time&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/time)
- [&lt;abbr&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/abbr)
- [&lt;address&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address)
