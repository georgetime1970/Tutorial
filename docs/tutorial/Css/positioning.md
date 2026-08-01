# CSS 定位（Positioning）

## 定义

**定位**决定元素在文档中的**位置计算方式**。`position` 属性配合 `top` / `right` / `bottom` / `left` 与 `z-index`，控制元素是留在正常文档流中，还是相对某个参照物偏移、脱离流或固定在视口。

## 核心概念

| 概念 | 说明 |
| --- | --- |
| **正常文档流** | 块级自上而下、行内自左而右排列；未改 `position` 时元素按流布局 |
| **定位方案** | `static` / `relative` / `absolute` / `fixed` / `sticky` 五种 |
| **偏移属性** | `top` / `right` / `bottom` / `left` 仅在非 `static` 时生效 |
| **包含块（containing block）** | 决定百分比尺寸与定位偏移的参照矩形；多数情况下为**最近的块级祖先的内容区** |
| **层叠上下文（stacking context）** | 三维层级分组；同一上下文内才比较 `z-index` |
| **定位上下文** | `absolute` 相对**最近的非 static 祖先**；若无则相对初始包含块（通常 `<html>`） |

### 包含块速查

| 定位类型 | 包含块通常由谁决定 |
| --- | --- |
| `static` / `relative` / `sticky` | 最近的块级、表格单元格或 flex/grid 项祖先 |
| `absolute` | 最近的 `position` 不为 `static` 的祖先；若无，则为初始包含块 |
| `fixed` | 视口（viewport）；若有 `transform` / `filter` 等祖先，可能被「困」在该祖先内 |

## position 取值

| 值 | 是否脱离文档流 | 偏移参照 | 典型用途 |
| --- | --- | --- | --- |
| `static` | 否（默认） | 偏移无效 | 默认布局 |
| `relative` | 否（仍占位） | 自身原位置 | 微调、为子元素建立定位上下文 |
| `absolute` | 是 | 定位上下文包含块 | 角标、浮层、精确覆盖 |
| `fixed` | 是 | 视口（或变换祖先） | 固定导航、回到顶部 |
| `sticky` | 混合 | 滚动容器 + 阈值 | 表头吸顶、侧边栏 |

## 属性表

### 定位与偏移

| 属性 | 值 | 说明 |
| --- | --- | --- |
| `position` | `static` \| `relative` \| `absolute` \| `fixed` \| `sticky` | 定位方案 |
| `top` / `right` / `bottom` / `left` | `<length>` \| `<percentage>` \| `auto` | 相对包含块边缘偏移 |
| `inset` | 上述四边简写 | 例：`inset: 0` 四边贴齐 |
| `z-index` | `<integer>` \| `auto` | 层叠顺序；仅在同层叠上下文内比较 |

### 层叠相关（建立 stacking context 的常见触发）

| 条件 | 说明 |
| --- | --- |
| 根元素 | 页面根始终有层叠上下文 |
| `position` 非 static 且 `z-index` 非 auto | 经典触发 |
| `opacity` < 1 | 整元素及其子树形成新上下文 |
| `transform` / `filter` / `perspective` 等非 none | 现代布局中常见 |
| `isolation: isolate` | 显式创建独立上下文 |

## 示例

```css
/* 相对定位：保留占位，仅视觉偏移 */
.badge-wrapper {
  position: relative; /* 为角标建立定位上下文 */
}

.badge {
  position: absolute; /* 脱离流，相对 .badge-wrapper */
  top: -8px;
  right: -8px;
  z-index: 1; /* 需父级有层叠上下文才可靠比较 */
}

/* 固定导航 */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

/* 吸顶标题：需指定 top/bottom 之一 */
.section-title {
  position: sticky;
  top: 64px; /* 距滚动容器顶部 64px 时「粘住」 */
  background: #fff;
}
```

```html
<div class="badge-wrapper">
  消息
  <span class="badge">3</span>
</div>
```

## 常见陷阱

1. **`absolute` 找不到参照**：父元素未设 `position: relative`（或其它非 static），元素可能相对 `<html>` 定位。
2. **`z-index` 无效**：元素不在同一层叠上下文；或 `position: static` 时 `z-index` 不生效。
3. **`sticky` 不吸顶**：祖先有 `overflow: hidden/auto/scroll` 且非滚动容器；或未设 `top`/`bottom`；父级高度不足。
4. **`fixed` 随页面滚动**：祖先存在 `transform`、`filter`、`perspective` 等，fixed 相对该祖先而非视口。
5. **百分比偏移**：相对**包含块对应边**计算，与 margin 百分比参照不同。

## 学习清单

- [ ] 能说明五种 `position` 是否占位、参照谁
- [ ] 能解释「包含块」对 `absolute` 子元素的影响
- [ ] 会用 `relative` + `absolute` 做角标/浮层
- [ ] 理解 `sticky` 的滚动容器与 `top` 条件
- [ ] 能排查 `z-index` 被父级层叠上下文「截断」的问题
- [ ] 知道 `inset` 简写与四边偏移的等价关系

## MDN 参考

- [position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
- [top / right / bottom / left](https://developer.mozilla.org/zh-CN/docs/Web/CSS/top)
- [z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index)
- [理解 CSS 的 z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index)
- [包含块](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Containing_block)
- [position: sticky](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position#sticky)
