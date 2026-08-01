# CSS Flexbox 弹性布局

## 定义

**Flexbox（弹性盒）** 是一维布局模型：在**主轴**上分配空间、对齐与排序，在**交叉轴**上对齐。容器设 `display: flex` 或 `inline-flex` 后，直接子元素成为 **flex 项**。

## 核心概念

| 概念 | 说明 |
| --- | --- |
| **Flex 容器** | `display: flex` / `inline-flex` 的元素 |
| **Flex 项** | 容器的直接子元素（文本节点会被匿名包裹） |
| **主轴（main axis）** | 由 `flex-direction` 决定；项沿主轴排列 |
| **交叉轴（cross axis）** | 与主轴垂直 |
| **主轴起点/终点** | 排列与 `justify-content` 的参照方向 |
| **可用空间** | 容器尺寸减去项的 margin、border、padding 与 flex-basis 后的剩余空间，由 `flex-grow` 分配 |

## 容器属性

| 属性 | 常用值 | 说明 |
| --- | --- | --- |
| `display` | `flex` \| `inline-flex` | 块级 / 行内级 flex 容器 |
| `flex-direction` | `row` \| `row-reverse` \| `column` \| `column-reverse` | 主轴方向 |
| `flex-wrap` | `nowrap` \| `wrap` \| `wrap-reverse` | 是否换行 |
| `flex-flow` | `<direction> <wrap>` | `flex-direction` + `flex-wrap` 简写 |
| `justify-content` | `flex-start` \| `flex-end` \| `center` \| `space-between` \| `space-around` \| `space-evenly` | 主轴对齐 |
| `align-items` | `stretch` \| `flex-start` \| `flex-end` \| `center` \| `baseline` | 单行交叉轴对齐 |
| `align-content` | 同 justify 系列 + `stretch` | **多行**时交叉轴上各行分布 |
| `gap` | `<length>` \| `<percentage>` | 行/列间距；`row-gap` / `column-gap` 可单独设 |

## 项属性

| 属性 | 常用值 | 说明 |
| --- | --- | --- |
| `flex-grow` | `<number>`（默认 0） | 放大比例，分配剩余空间 |
| `flex-shrink` | `<number>`（默认 1） | 空间不足时缩小比例 |
| `flex-basis` | `auto` \| `<length>` \| `<percentage>` | 主轴初始尺寸 |
| `flex` | `none` \| `[grow shrink basis?]` | 简写；`flex: 1` ≈ `1 1 0%` |
| `order` | `<integer>`（默认 0） | 视觉顺序，不影响 DOM 与 Tab 顺序 |
| `align-self` | `auto` \| 同 align-items | 单项覆盖交叉轴对齐 |

## 实用示例：响应式工具栏

```css
.toolbar {
  display: flex;
  flex-wrap: wrap;           /* 窄屏换行 */
  align-items: center;
  justify-content: space-between;
  gap: 12px 16px;            /* 行间距 12px，列间距 16px */
  padding: 12px 16px;
}

.toolbar__brand {
  flex: 0 0 auto;            /* 不伸不缩，按内容宽 */
}

.toolbar__actions {
  display: flex;
  flex: 1 1 200px;           /* 可-grow，基准 200px */
  justify-content: flex-end;
  gap: 8px;
}

.toolbar__search {
  flex: 1 1 240px;           /* 中间搜索框占据剩余空间 */
  min-width: 120px;          /* 防止过窄 */
}

.toolbar__btn--primary {
  order: 1;                  /* 视觉上靠后，DOM 仍可先读次要按钮 */
}
```

```html
<header class="toolbar">
  <div class="toolbar__brand">Logo</div>
  <input class="toolbar__search" type="search" placeholder="搜索…" />
  <div class="toolbar__actions">
    <button>设置</button>
    <button class="toolbar__btn--primary">新建</button>
  </div>
</header>
```

## 常见陷阱

1. **`align-content` 无效**：只有 `flex-wrap: wrap` 且存在**多行**时才生效；单行用 `align-items`。
2. **`flex: 1` 与 `flex: auto`**：`flex: 1` 常等价 `1 1 0%`，项易均分；`flex: auto` 为 `1 1 auto`，更尊重内容宽度。
3. **最小尺寸默认 `auto`**：项默认 `min-width: auto`，可能拒绝缩小导致溢出；必要时设 `min-width: 0`。
4. **`order` 只改视觉**：无障碍阅读顺序仍按 DOM；勿用 order 做关键逻辑顺序。
5. **百分比 height**：flex 项百分比高度依赖父级明确高度链。

## 学习清单

- [ ] 区分主轴 / 交叉轴及 `flex-direction` 影响
- [ ] 会用 `justify-content` 与 `align-items` 做常见居中
- [ ] 理解 `flex-grow` / `flex-shrink` / `flex-basis` 与 `flex` 简写
- [ ] 知道 `align-content` 与 `align-items` 的适用场景
- [ ] 会用 `gap` 替代 margin  hack 做间距
- [ ] 能搭建一行工具栏 + 换行的响应式布局

## MDN 参考

- [Flexbox 基本概念](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)
- [display: flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)
- [flex-direction](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction)
- [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)
- [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items)
- [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)
