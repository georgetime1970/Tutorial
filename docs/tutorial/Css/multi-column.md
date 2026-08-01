# CSS 多列布局（Multi-column）

## 定义

**多列布局（CSS Multi-column Layout）** 像报纸一样，将块级容器内的**连续流式内容**自动分成多列并在列间平衡。适合长文、引言、图片混排，**不是**表格或 Grid 的替代品。

## 核心概念

| 概念 | 说明 |
| --- | --- |
| **多列容器** | 对块容器应用 column 相关属性 |
| **列盒（column box）** | 内容被拆入的虚拟列 |
| **列间隙（column gap）** | 列与列之间的空白 |
| **列分隔线（column rule）** | 列间的装饰线，不占布局空间 |
| **列跨度（column span）** | 某元素横跨全部列 |
| **碎片化（fragmentation）** | 内容在列/页间如何断开 |

## 属性表

| 属性 | 常用值 | 说明 |
| --- | --- | --- |
| `column-count` | `<integer>` \| `auto` | 列数；与 `column-width` 同时指定时取**能容纳更多列**的结果 |
| `column-width` | `<length>` \| `auto` | 理想列宽；空间够则增列 |
| `columns` | `<width> <count>?` | `column-width` + `column-count` 简写 |
| `column-gap` | `<length>` \| `normal` | 列间距（原 `column-gap`，现亦可用 `gap`） |
| `column-rule-width` | `<length>` | 分隔线粗细 |
| `column-rule-style` | `none` \| `solid` \| … | 分隔线样式 |
| `column-rule-color` | `<color>` | 分隔线颜色 |
| `column-rule` | 简写 | 上述三线合一 |
| `column-span` | `none` \| `all` | 元素是否横跨所有列 |
| `break-inside` | `auto` \| `avoid` \| `avoid-column` | 避免在列内断开（见碎片化） |

## 示例

```css
.article {
  columns: 320px 3;        /* 理想宽 320px，最多 3 列 */
  column-gap: 2rem;
  column-rule: 1px solid #ddd;
}

/* 标题独占整行，横跨所有列 */
.article__title {
  column-span: all;
  margin-bottom: 1rem;
}

/* 避免卡片在列中间被劈开 */
.article__figure {
  break-inside: avoid;     /* 等价 avoid-column 于多列上下文 */
  margin: 1rem 0;
}

.article__figure img {
  display: block;
  width: 100%;
  height: auto;
}
```

```html
<article class="article">
  <h2 class="article__title">章节标题</h2>
  <p>第一段正文会流入第一列…</p>
  <figure class="article__figure">
    <img src="photo.jpg" alt="插图" />
  </figure>
  <p>后续段落继续按列平衡…</p>
</article>
```

## 与 Grid / Flex 的区别

| 特性 | 多列 | Grid / Flex |
| --- | --- | --- |
| 内容流向 | 先填满一列再下一列 | 按网格或主轴显式放置 |
| 子项控制 | 弱，主要靠流 | 强，可精确对齐 |
| 典型场景 | 长文分栏 | 组件布局、仪表盘 |

## 常见陷阱

1. **`column-span: all` 仅块级有效**：且不是所有浏览器对嵌套场景一致；标题需块级显示。
2. **`break-inside: avoid` 非绝对**：极高元素仍可能被截断；大图片考虑单独 `column-span: all`。
3. **`columns` 与 `column-width` 冲突**：同时设 count 与 width 时浏览器在约束内折中，结果需实测。
4. **列内 margin 折叠异常**：多列上下文中 margin 行为与普通块流不同，优先用 padding/gap。
5. **不宜嵌套复杂组件**：表单、表格放进多列易难用；多列适合纯文本流。

## 学习清单

- [ ] 会用 `columns` 或 `column-count` / `column-width` 分栏
- [ ] 会设 `column-gap` 与 `column-rule`
- [ ] 会用 `column-span: all` 做跨列标题
- [ ] 会用 `break-inside: avoid` 保护图/卡片完整性
- [ ] 知道多列适合流式正文，不适合精细二维布局

## MDN 参考

- [多列布局基本概念](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_multicol_layout/Basic_concepts)
- [columns](https://developer.mozilla.org/zh-CN/docs/Web/CSS/columns)
- [column-gap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-gap)
- [column-rule](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-rule)
- [column-span](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-span)
- [break-inside](https://developer.mozilla.org/zh-CN/docs/Web/CSS/break-inside)
