# 字体与文本（Typography）

## 定义

**排版** 控制文字的可读性与层级：字体（font）、字号、行距、对齐、装饰与空白处理等。**font 相关属性** 多可继承，子元素会沿用父级文字样式 unless 覆盖。

## 字体属性

| 属性           | 常用值                         | 说明                         |
| -------------- | ------------------------------ | ---------------------------- |
| `font-family`  | `"PingFang SC", sans-serif`    | 逗号分隔字体栈，最后放通用族 |
| `font-size`    | `1rem`、`14px`、`smaller`      | 绝对/相对/关键字             |
| `font-weight`  | `400`、`700`、`bold`、`normal` | 100–900                      |
| `font-style`   | `normal`、`italic`、`oblique`  | 正体/斜体                    |
| `font-variant` | `normal`、`small-caps`         | 小型大写等                   |
| `line-height`  | `1.5`、`24px`、`150%`          | 行框高度，推荐无单位倍数     |

### `font` 简写

顺序：`font: [style] [variant] weight size/line-height family`

```css
body {
  font-family: system-ui, "Segoe UI", sans-serif;
  font-size: 1rem;
  line-height: 1.6; /* 相对字号，继承友好 */
}

h1 {
  font:
    700 2rem/1.2 "Georgia",
    serif;
  /* 等价于 weight size/line-height family */
}

.caption {
  font: italic small-caps 0.875rem/1.4 sans-serif;
}
```

**简写会重置**未列出的 `font-*` 子属性为初始值（如 `font-size-adjust`），覆盖范围需留意。

## 文本对齐与装饰

| 属性                   | 常用值                                 | 说明                    |
| ---------------------- | -------------------------------------- | ----------------------- |
| `text-align`           | `left`、`center`、`right`、`justify`   | 块内 inline 内容对齐    |
| `text-decoration`      | `underline`、`line-through`、`none`    | 简写含 line/style/color |
| `text-decoration-line` | `underline`、`overline`                | 细粒度控制              |
| `text-transform`       | `uppercase`、`lowercase`、`capitalize` | 视觉变换，不改 HTML     |
| `text-indent`          | `2em`、`10%`                           | 首行缩进                |
| `letter-spacing`       | `0.05em`、`normal`                     | 字距                    |
| `word-spacing`         | `0.2em`                                | 词距（空格处）          |

```css
.article p {
  text-align: justify;
  text-indent: 2em;
}

.nav-link {
  text-decoration: none;
}
.nav-link:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
}
```

## 空白与换行

| 属性          | 值         | 行为                           |
| ------------- | ---------- | ------------------------------ |
| `white-space` | `normal`   | 合并空白，自动换行             |
|               | `nowrap`   | 不换行                         |
|               | `pre`      | 保留空白与换行（类似 `<pre>`） |
|               | `pre-wrap` | 保留空白，允许换行             |
|               | `pre-line` | 合并空格，保留换行符           |

```css
.code-inline {
  white-space: nowrap;
}
.poetry {
  white-space: pre-line;
}
```

## `vertical-align` 基础

用于 **inline / table-cell** 上下文，改变相对基线或行框的垂直对齐（**不是** flex/grid 里的对齐）。

| 值                         | 说明                 |
| -------------------------- | -------------------- |
| `baseline`                 | 默认，与父行基线对齐 |
| `middle`                   | 行内中部             |
| `top` / `bottom`           | 与行高顶/底对齐      |
| `text-top` / `text-bottom` | 与父文字顶/底        |
| 长度 / `%`                 | 相对基线偏移         |

```css
.icon {
  vertical-align: middle; /* 图标与文字中线对齐 */
  height: 1em;
}
```

## 示例：文章排版

```css
.prose {
  font-family: "Source Han Serif SC", Georgia, serif;
  font-size: 1.125rem;
  line-height: 1.75;
  color: #1a1a1a;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  margin-block: 1.5em 0.5em;
}

.prose blockquote {
  margin-inline-start: 0;
  padding-inline-start: 1em;
  border-left: 4px solid #ccc;
  font-style: italic;
}
```

## 易错点

1. **`line-height` 用 `%`** — 继承的是计算值而非倍数；推荐无单位 `1.5`。
2. **`text-align: center` 不居中块级** — 只影响内部 inline；块居中用 `margin: auto` 或 flex。
3. **`font` 简写重置** — 单独设 `font-family` 后被 `font:` 覆盖丢失。
4. **`vertical-align` 对 block 无效** — 块级垂直对齐用 flex/grid 或 padding。
5. **Web 字体 FOUT/FOIT** — 用 `font-display: swap` 与 subset 优化加载。

## 检查清单

- [ ] 字体栈末尾是否包含通用族（`sans-serif` 等）？
- [ ] 正文 `line-height` 是否在 1.4–1.8 且无单位？
- [ ] 链接 `:hover` 除改色外是否有 `underline` 等线索？
- [ ] 知道 `text-transform` 不改变 DOM 文本内容？
- [ ] 图标与文字对齐是否用 `vertical-align` 或 flex `align-items`？

## MDN 参考

- [CSS 文本样式](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Text_styling)
- [`font`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font)
- [`font-family`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family)
- [`line-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height)
- [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align)
- [`white-space`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space)
- [`vertical-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align)
