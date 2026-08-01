# CSS Grid 网格布局

## 定义

**Grid（网格布局）** 是**二维**布局：同时定义行与列，将子元素放入网格线围成的**单元格**或**区域**。适合页面骨架、仪表盘、卡片矩阵等。

## 核心概念

| 概念 | 说明 |
| --- | --- |
| **Grid 容器** | `display: grid` / `inline-grid` |
| **Grid 项** | 直接子元素 |
| **网格线（grid line）** | 划分行列的线，从 1 开始编号 |
| **网格轨道（track）** | 两相邻网格线之间的行或列 |
| **网格单元格（cell）** | 一行一列交叉的单格 |
| **网格区域（area）** | 由多条线围成的矩形，可用命名 |
| **显式网格 / 隐式网格** | 模板定义 vs 自动生成的额外轨道 |

## 容器属性

| 属性 | 常用值 | 说明 |
| --- | --- | --- |
| `display` | `grid` \| `inline-grid` | 块级 / 行内级网格 |
| `grid-template-columns` | `none` \| `<track-list>` | 列轨道尺寸 |
| `grid-template-rows` | `none` \| `<track-list>` | 行轨道尺寸 |
| `grid-template-areas` | 字符串矩阵 | 命名区域布局 |
| `gap` | `<length>` | `row-gap` + `column-gap` |
| `justify-items` | `start` \| `end` \| `center` \| `stretch` | 单元格内水平对齐 |
| `align-items` | 同上 | 单元格内垂直对齐 |
| `place-items` | `<align> <justify>?` | 对齐简写 |
| `justify-content` | 同 flex | 网格整体在容器内水平分布 |
| `align-content` | 同 flex | 网格整体在容器内垂直分布 |
| `place-content` | 简写 | content 对齐 |

### 轨道尺寸常用函数

| 函数 / 单位 | 说明 | 示例 |
| --- | --- | --- |
| `fr` | 剩余空间份数 | `1fr 2fr` |
| `repeat()` | 重复模式 | `repeat(3, 1fr)` |
| `minmax(min, max)` | 最小最大约束 | `minmax(200px, 1fr)` |
| `%` / `px` / `auto` | 固定或内容驱动 | `120px auto 1fr` |

## 项属性

| 属性 | 说明 |
| --- | --- |
| `grid-column-start` / `grid-column-end` | 列起止线 |
| `grid-row-start` / `grid-row-end` | 行起止线 |
| `grid-column` | 简写，如 `1 / 3` 或 `span 2` |
| `grid-row` | 行方向简写 |
| `grid-area` | 区域名或 `row-start / col-start / row-end / col-end` |
| `justify-self` / `align-self` | 单项在单元格内对齐 |

## 示例

```css
.page {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr); /* 侧栏 + 主区；minmax 防溢出 */
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 16px;
  min-height: 100vh;
}

.page__header { grid-area: header; }
.page__sidebar { grid-area: sidebar; }
.page__main { grid-area: main; min-width: 0; } /* 允许主区收缩 */
.page__footer { grid-area: footer; }

/* 卡片跨两列 */
.card--wide {
  grid-column: span 2; /* 占 2 列宽 */
}

/* 不用 areas 时直接用线号 */
.hero {
  grid-column: 1 / -1; /* 从第 1 条线到最后一条 */
  grid-row: 1;
}
```

## grid-template-areas 简述

用**相同名字**的相邻单元格合并为区域；`.` 表示空单元格。适合语义化页面分区，改字符串即可重排布局。

```css
.layout {
  grid-template-areas:
    "nav nav"
    "aside content";
}
.nav    { grid-area: nav; }
.aside  { grid-area: aside; }
.content { grid-area: content; }
```

## 常见陷阱

1. **子元素默认 `stretch`**：内容可能撑破单元格；长文本列加 `min-width: 0`。
2. **`fr` 与 `minmax`**：纯 `1fr` 可缩到 0；需下限用 `minmax(200px, 1fr)`。
3. **`grid-column: 1 / 3` 占 2 列**：线号「结束线」不包含该线，别与 `span` 混淆。
4. **隐式行高默认 auto**：未定义行由内容撑开；可用 `grid-auto-rows` 统一。
5. **areas 名称必须矩形**：L 形区域非法，需拆项或改模板。

## 学习清单

- [ ] 会用 `grid-template-columns/rows` + `gap` 建基础网格
- [ ] 理解 `fr`、`repeat()`、`minmax()` 的用法
- [ ] 会用 `grid-column` / `grid-row` 与 `span` 跨格
- [ ] 能写简单的 `grid-template-areas` 页面骨架
- [ ] 区分 `place-items`（单元格内）与 `place-content`（网格整体）
- [ ] 知道 Grid 与 Flex 选型：二维用 Grid，一维条带用 Flex

## MDN 参考

- [Grid 布局基本概念](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout)
- [grid-template-columns](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-columns)
- [grid-template-areas](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas)
- [repeat()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeat)
- [minmax()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/minmax)
- [grid-column](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-column)
