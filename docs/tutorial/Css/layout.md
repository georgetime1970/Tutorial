# CSS 常用布局

## Flex 布局

### 容器属性

显示为 flex 的父元素

| 属性                                   | 正确取值示例                                                                                   | 作用说明                                   |
| -------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **display**                            | flex / inline-flex                                                                             | 开启 Flex 布局                             |
| **flex-direction**                     | row（默认） / row-reverse / column / column-reverse                                            | 主轴方向                                   |
| **flex-wrap**                          | nowrap（默认） / wrap / wrap-reverse                                                           | 是否换行                                   |
| **flex-flow**                          | `<flex-direction>` `<flex-wrap>`                                                               | flex-direction 和 flex-wrap 的简写         |
| **justify-content**                    | flex-start（默认） / flex-end / center / space-between / space-around / space-evenly           | 主轴对齐方式                               |
| **align-items**                        | stretch（默认） / flex-start / flex-end / center / baseline / first baseline / last baseline   | 交叉轴单行对齐方式                         |
| **align-content**                      | stretch（默认） / flex-start / flex-end / center / space-between / space-around / space-evenly | 交叉轴多行对齐方式（配合换行时生效）       |
| **gap** / **row-gap** / **column-gap** | 20px / 1.5rem / 8px 16px                                                                       | 项目之间的间距（已全面支持，不再是实验性） |
| **place-content**                      | `<align-content>` `<justify-content>`                                                          | align-content 和 justify-content 的简写    |

### 项目属性

子元素

| 属性            | 取值示例                                                           | 作用说明                                                              |
| --------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| **order**       | `<integer>`（默认 0 默认）                                         | 改变视觉顺序                                                          |
| **flex-grow**   | `<number>`（默认 0）                                               | 放大比例（剩余空间分配）                                              |
| **flex-shrink** | `<number>`（默认 1）                                               | 缩小比例（空间不足时）                                                |
| **flex-basis**  | `<length>` / auto（默认） / content（部分支持）                    | 初始主轴尺寸                                                          |
| **flex**        | none [ `<flex-grow>` `<flex-shrink>`? `<flex-basis>` ]             | flex-grow、flex-shrink、flex-basis 的简写，最常用 1 1 0%、0 0 auto 等 |
| **align-self**  | auto（默认） / flex-start / flex-end / center / baseline / stretch | 单个项目在交叉轴上的对齐方式，可覆盖 align-items                      |

### 新的属性

最新/正在普及的属性（Flexbox Level 2 + 现代扩展）

| 属性                                | 取值示例                                          | 作用说明                                                                    |
| ----------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------- |
| flex-direction（新值）              | row column row-dense column-dense（masonry-like） | 类似 Masonry 布局的密集打包模式，Chrome/Edge 124+、Safari 18+ 已支持        |
| aspect-ratio                        | 16 / 9、1 / 1                                     | 控制项目宽高比，会影响 flex-basis 计算，现代浏览器全支持                    |
| flex-grow / flex-shrink（支持小数） | 0.5、1.5 等                                       | 早就支持，但现在配合 gap + aspect-ratio 使用更强大                          |
| place-self                          | `<align-self>` `<justify-self>`                   | 同时设置 align-self 和 justify-self（后者在 Flex 中通常无效，但语法已存在） |

### 写法示例

```css
.container {
  display: flex;
  flex-direction: row; /* 或 column */
  flex-wrap: wrap; /* 或者直接用 flex-flow: row wrap; */
  justify-content: space-between;
  align-items: center;
  gap: 20px; /* 现代替代 margin 的最佳方式 */
}

/* 经典等分三列 */
.item {
  flex: 1; /* 等价于 flex: 1 1 0% */
}

/* 卡片不等分常用组合 */
.item-primary {
  flex: 2 1 300px;
}
.item-secondary {
  flex: 1 1 200px;
}
```

## Grid 布局

### 容器属性

在 .grid-container 上设置

| 属性                      | 正确取值示例                                                     | 作用说明                                                |
| ------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
| **display**               | grid / inline-grid                                               | 开启 Grid 布局                                          |
| **grid-template-columns** | repeat(4, 1fr) 200px minmax(100px, 1fr)                          | 定义显式列轨道尺寸（只负责列）                          |
| **grid-template-rows**    | 100px 1fr auto                                                   | 定义显式行轨道尺寸（只负责行）                          |
| **grid-template-areas**   | "header header" "nav main" "footer footer"                       | 用名字定义网格区域                                      |
| **grid-template**         | "h h h" 80px "n m m" 1fr "f f f" 60px / 200px 1fr 100px          | rows + columns + areas 三合一简写                       |
| **grid-auto-columns**     | 150px / 1fr                                                      | 隐式创建的列的默认尺寸                                  |
| **grid-auto-rows**        | 100px / minmax(100px, auto)                                      | 隐式创建的行的默认尺寸                                  |
| **grid-auto-flow**        | row（默认） / column / dense / row dense                         | 自动放置方向与是否启用 dense 填缝算法                   |
| **grid**                  | 简写，可同时包含 template / auto-rows / auto-columns / auto-flow | 例如：grid: 100px 1fr / 200px 1fr                       |
| **gap**                   | 20px / 2rem 1.5rem                                               | row-gap + column-gap 网格间距（grid-gap 已废弃）        |
| **justify-items**         | start / end / center / stretch（默认）                           | 所有网格项在单元格内的水平对齐                          |
| **align-items**           | start / end / center / stretch（默认）                           | 所有网格项在单元格内的垂直对齐                          |
| **place-items**           | center / start end 等                                            | align-items justify-items 简写                          |
| **justify-content**       | start / center / space-between 等                                | 整个网格在主轴方向的整体对齐（网格总宽 < 容器宽时生效） |
| **align-content**         | start / center / space-between 等                                | 整个网格在交叉轴方向的整体对齐                          |
| **place-content**         | center / start end 等                                            | align-content justify-content 简写                      |

- `repeat()`: 接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值
- `repeat(auto-fill, 100px);`: 容器的大小不确定,不指定具体的次数,使用自动填充
- `repeat(auto-fill, 1fr 2fr);`: 自动填充,并且两列的宽度分别为 1fr 和 2fr，就表示后者是前者的两倍
- `repeat(auto-fill, minmax(10px, 100px))`: `minmax`表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值,可以使用`fr`

### 项目属性

在 grid 子元素上设置

| 属性                  | 取值示例                       | 作用说明                                                      |
| --------------------- | ------------------------------ | ------------------------------------------------------------- |
| **grid-column-start** | 1 / 3 / span 2 / auto          | 指定网格线起点（列）                                          |
| **grid-column-end**   | 4 / span 3                     | 指定网格线终点（列）                                          |
| **grid-row-start**    | 2 / span 1                     | 指定网格线起点（行）                                          |
| **grid-row-end**      | 5 / span 2                     | 指定网格线终点（行）                                          |
| **grid-column**       | 1 / 4 或 2 / span 3            | grid-column-start + end 简写                                  |
| **grid-row**          | 1 / 3 或 2 / span 2            | grid-row-start + end 简写                                     |
| **grid-area**         | 1 / 2 / 3 / 4 或 "header"      | 四个网格线位置简写，或直接使用 grid-template-areas 定义的名字 |
| **justify-self**      | start / end / center / stretch | 当前网格项在自己的单元格内水平对齐                            |
| **align-self**        | start / end / center / stretch | 当前网格项在自己的单元格内垂直对齐                            |
| **place-self**        | align-self justify-self 简写   | 常写 place-self: center                                       |
| **order**             | 1 / -1 / 5                     | 改变视觉顺序（和 flex 一样），默认 0                          |
| **z-index**           | 10                             | 在重叠网格项时控制层级                                        |

- `sapn 2`: 指 2 列或 2 行,比使用结束网格线更直观

### 新的属性

最新/正在普及的属性（CSS Grid Level 3 新特性，2025 年主流浏览器已基本支持）

| 属性                        | 取值示例                                        | 说明（Level 3 新增）                                                  |
| --------------------------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| masonry（子轨道布局）       | 目前仍为实验性，Chrome/Edge 已支持              | 类似 Pinterest 的瀑布流布局，未来可能通过 grid-template-rows: masonry |
| grid-template-masonry       | masonry                                         | 明确开启 masonry 模式（草案中）                                       |
| subgrid（子网格）           | grid-template-columns: subgrid                  | 子容器继承父容器的网格线，实现完美对齐                                |
| grid-template-rows: subgrid | subgrid                                         | 行同理                                                                |
| **grid-auto-flow: dense**   | row / column / dense / row dense / column dense | 指定在网格中被自动布局的元素怎样排列                                  |
| minmax() 新函数             | minmax(100px, max-content)                      | 已在 Level 2，Level 3 增加更多内容尺寸函数                            |
| masonry-auto-flow           | pack / next / ordered                           | 控制 masonry 中元素的放置顺序（实验性）                               |
| grid-column: auto / span    | 结合 subgrid 更强大                             | 已经很常用，但 subgrid 让它如虎添翼                                   |
| aspect-ratio                | 16 / 9、1 / 1                                   | 控制项目宽高比，会影响 flex-basis 计算，现代浏览器全支持              |

- 容器管「轨道」：template、auto、gap、content、items
- 项目管「位置」：grid-column/row/area、self、order

### 写法示例

```css
.container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  place-content: center; /* 整体居中 */
  place-items: center; /* 每个格子内容居中 */
}
```

### `repeat()` 函数

| 用法                       | 语法                                    | 含义                                                               | 示例                                            | 效果说明                                                  |
| -------------------------- | --------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------- | --------------------------------------------------------- |
| 固定次数重复               | `repeat(次数, 轨道尺寸)`                | 把相同的轨道尺寸重复指定次数                                       | `repeat(4, 100px)`                              | 生成 4 100px 100px 100px 100px 四个轨道                   |
| 固定次数重复多种尺寸       | `repeat(次数, 尺寸1 尺寸2 ...)`         | 一组尺寸重复指定次数                                               | `repeat(3, 1fr 2fr)`                            | 生成 1fr 2fr 1fr 2fr 1fr 2fr 共 6 个轨道                  |
| 自动填充                   | `repeat(auto-fill, 轨道尺寸)`           | 尽量塞满容器，能放多少轨道就放多少（轨道尺寸固定，多余空间留白）   | `repeat(auto-fill, 200px)`                      | 容器宽 750px → 生成 3 个 200px 轨道 + 150px 空白          |
| 自动填充（推荐用于响应式） | `repeat(auto-fill, minmax(200px, 1fr))` | 最经典的响应式写法，每个轨道最小 200px，剩余空间平分               | 常用于卡片网格布局                              |
| 自动适应                   | `repeat(auto-fit, 轨道尺寸)`            | 尽量塞满容器，但会把多余空间平分给已有轨道（轨道会拉伸，不会留白） | `repeat(auto-fit, minmax(200px, 1fr))`          | 容器宽 750px → 生成 3 个轨道，每个约 250px（拉伸填满）    |
| 结合命名线使用             | `repeat(3, [col-start] 1fr [col-end])`  | 可以给重复的轨道批量起名字                                         | `grid-template-columns: repeat(12, [col] 1fr);` | 生成 12 列网格，第 n 列可写 `grid-column: col 3 / col 7;` |

- `auto-fill` 与 `auto-fit` 区别:
  `auto-fill`：多轨道，保持卡片固定宽度，多余空间留白
  `auto-fit`：少轨道，卡片拉伸填满整行

#### 写法示例

```css
/* 1. 经典 12 列灵活网格（最常见） */
grid-template-columns: repeat(12, 1fr);

/* 2. 响应式卡片布局 （不留空白）*/
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

/* 3. 响应式卡片布局 （留空白）*/
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
```
