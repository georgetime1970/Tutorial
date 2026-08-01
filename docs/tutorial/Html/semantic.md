# 语义化结构

语义化 HTML 用标签表达内容的**含义与结构**（页眉、导航、正文、侧栏等），而非仅用 `<div>` 堆叠；适用于提升可访问性、SEO 与代码可维护性。

## 核心概念

- **语义 vs 表现**：标签描述「是什么」，样式交给 CSS；`<b>` 仅视觉加粗，`<strong>` 表语义重要。
- **文档大纲**：标题 +  landmarks（`header`、`main` 等）帮助屏幕阅读器快速跳转。
- **Landmark 区域**：`header`、`nav`、`main`、`aside`、`footer` 构成页面骨架。
- **独立内容**：`<article>` 可单独分发（博客帖、新闻条目）；`<section>` 是主题分组，通常带标题。
- **块级 vs 行内**：块级元素默认占满一行、可设宽高；行内元素随文字流动、不可设 block 级尺寸（有例外如 `img`）。

## 块级与行内

| 类别 | 默认表现 | 典型元素 | 注意 |
| ---- | -------- | -------- | ---- |
| 块级（block） | 独占一行，可含块级/行内子元素 | `div`、`p`、`h1`–`h6`、`section`、`ul` | 可设 `width`/`height` |
| 行内（inline） | 不换行，宽度随内容 | `span`、`a`、`em`、`strong` | 不宜嵌套块级元素 |
| 行内块（inline-block） | 行内流动 + 可设尺寸 | `img`、`input`、`button` | 介于两者之间 |
| 空元素 | 无闭合内容 | `br`、`hr`、`img`、`meta` | 自闭合或空标签 |

> `display` CSS 属性可改变默认表现；语义标签的**默认**类别见下表。

## 语义元素速查

| 元素 | 类型 | 作用 | 典型场景 |
| ---- | ---- | ---- | -------- |
| `<header>` | 块级 | 页眉或区块头部 | 站点 logo、标题、搜索 |
| `<nav>` | 块级 | 导航链接集合 | 主导航、目录、分页 |
| `<main>` | 块级 | 页面唯一主内容 | 文章、产品列表（每页一个） |
| `<section>` | 块级 | 主题性内容分组 | 需配 heading 的章节 |
| `<article>` | 块级 | 独立完整内容 | 博客帖、评论、新闻卡片 |
| `<aside>` | 块级 | 侧边/附属内容 | 相关链接、广告、提示框 |
| `<footer>` | 块级 | 页脚或区块尾部 | 版权、联系方式 |
| `<figure>` | 块级 | 独立媒体单元 | 图片/代码 + 说明 |
| `<figcaption>` | — | `figure` 的标题/说明 | 图表注释 |
| `<details>` | 块级 | 可折叠 disclosure | FAQ、高级选项 |
| `<summary>` | — | `details` 的可见标题 | 点击展开/收起 |
| `<dialog>` | 块级 | 对话框/模态框 | 弹窗（配合 JS `showModal()`） |

## 常用属性

| 元素 | 属性 | 说明 |
| ---- | ---- | ---- |
| `<details>` | `open` | 布尔属性，默认展开 |
| `<dialog>` | `open` | 对话框是否打开 |
| `<dialog>` | — | JS：`dialog.showModal()` / `close()` |
| 通用 | `aria-*` | 无障碍增强，非语义标签时补充 |

## 示例

### 典型页面骨架

```html
<body>
  <header>
    <h1>站点名称</h1>
    <nav aria-label="主导航"> <!-- nav：导航 landmark -->
      <ul>
        <li><a href="/">首页</a></li>
        <li><a href="/docs">文档</a></li>
      </ul>
    </nav>
  </header>

  <main> <!-- 每页唯一主内容区 -->
    <article>
      <header>
        <h2>文章标题</h2>
        <time datetime="2026-08-01">2026年8月1日</time>
      </header>
      <section>
        <h3>第一节</h3>
        <p>正文段落……</p>
      </section>
    </article>

    <aside>
      <h2>相关阅读</h2>
      <ul><li><a href="#">链接</a></li></ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 示例公司</p>
  </footer>
</body>
```

### figure 与 details

```html
<figure>
  <img src="chart.png" alt="2026 销售趋势图"> <!-- alt：无障碍必需 -->
  <figcaption>图 1：2026 年各季度销售额</figcaption>
</figure>

<details> <!-- 默认折叠 -->
  <summary>点击查看详细参数</summary> <!-- 可点击的摘要行 -->
  <p>这里是折叠隐藏的详细内容。</p>
</details>

<details open> <!-- open：默认展开 -->
  <summary>已展开的面板</summary>
  <p>内容立即可见。</p>
</details>
```

### dialog 对话框

```html
<dialog id="confirm-dialog">
  <p>确定要删除吗？</p>
  <form method="dialog"> <!-- method="dialog"：关闭对话框 -->
    <button value="cancel">取消</button>
    <button value="ok">确定</button>
  </form>
</dialog>

<script>
  const dlg = document.getElementById('confirm-dialog');
  document.getElementById('delete-btn').addEventListener('click', () => {
    dlg.showModal(); // 以模态方式打开
  });
</script>
```

## 常见陷阱与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 全页 `<div>` 布局 | 屏幕阅读器无法识别 landmark；优先用语义标签 |
| 多个 `<main>` | 每页应只有一个 `main` |
| `<section>` 无标题 | 应有 `h2`–`h6` 描述该 section 主题 |
| `<article>` 嵌套过深 | article 内可嵌 article（如评论），但需有独立语义 |
| `nav` 滥用 | 仅用于主要导航块，不是所有链接列表 |
| `<summary>` 内放交互控件 | 可能影响展开行为；保持 summary 简洁 |

**article vs section**：article 强调「可独立存在」；section 强调「文档内的一个主题分区」。不确定时先用 section + heading。

**相关章节**：[简介与文档结构](./intro) · [文本内容](./text) · [链接](./links) · [全局属性](./global-attributes)

## MDN 参考

- [文档与网站结构](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Structuring_documents)
- [语义化 HTML 概述](https://developer.mozilla.org/zh-CN/docs/Glossary/Semantics)
- [块级与行内](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Inline_elements)
- [&lt;main&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/main)
- [&lt;article&gt; / &lt;section&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article)
- [&lt;details&gt; / &lt;summary&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/details)
- [&lt;dialog&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dialog)
