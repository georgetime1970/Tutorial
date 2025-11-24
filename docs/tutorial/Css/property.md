# CSS 常用属性

## 颜色的表示

### 颜色名

- 编写方式：直接使用颜色对应的英文单词
- 红色：`red`, 绿色：`green`, 蓝色：`blue`, 紫色：`purple`, 橙色：`orange`, 灰色：`gray`

[颜色名参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/named-color)

### rgb 或 rgba

| 字母 | 含义   |
| ---- | ------ |
| `r`  | 红色   |
| `g`  | 绿色   |
| `b`  | 蓝色   |
| `a`  | 透明度 |

```css
/* 使用 0~255 之间的数字表示一种颜色 */
color: rgb(255, 0, 0);/* 红色 */
color: rgb(0, 255, 0);/* 绿色 */
color: rgb(0, 0, 255);/* 蓝色 */
color: rgb(0, 0, 0);/* 黑色 */
color: rgb(255, 255, 255);/* 白色 */
/* 混合出任意一种颜色 */
color:rgb(138, 43, 226) /* 紫罗兰色 */
color:rgba(255, 0, 0, 0.5);/* 半透明的红色 */
/* 也可以使用百分比表示一种颜色（用的少） */
color: rgb(100%, 0%, 0%);/* 红色 */
color: rgba(100%, 0%, 0%,50%);/* 半透明的红色 */
```

### HEX 或 HEXA

- 格式为：`#rrggbb`

```css
color: #ff0000; /* 红色 */
color: #00ff00; /* 绿色 */
color: #0000ff; /* 蓝色 */
color: #000000; /* 黑色 */
color: #ffffff; /* 白色 */
/* 如果每种颜色的两位都是相同的，就可以简写*/
color: #ff9988; /* 可简为：#f98 */
/* 但要注意前三位简写了，那么透明度就也要简写 */
color: #ff998866; /* 可简为：#f986 */
```

### HSL 或 HSLA

- 格式为： `hsl(色相,饱和度,亮度)`
- 色相：取值范围是 0~360 度
- 饱和度：取值范围是 0%~100%（向色相中对应颜色中添加灰色， 0% 全灰， 100% 没有
  灰）
- 亮度：取值范围是 0%~100%（ 0% 亮度没了，所以就是黑色。 100% 亮度太强，所以就是
  白色了）

## 字体属性

| 属性名        | 说明           | 可选值                                             |
| ------------- | -------------- | -------------------------------------------------- |
| `font-size`   | 字体大小       | `数值px`                                           |
| `font-family` | 字体类型       | `"STCaiyun"` `"Microsoft YaHei"` `sans-serif`      |
| `font-style`  | 字体是否为斜体 | `normal` `italic` `oblique`                        |
| `font-weight` | 字体的粗细     | `数值` `lighter` `normal` `bold` `bolder`          |
| `font`        | 字体复合写法   | 上面可选值的组合,字体大小和字体类型必须在最后 2 位 |

### 字体大小

- 属性名: `font-size`
- 作用: 控制字体的大小。
- 语法: `font-size: 40px`
- 注意:
  > 1.  `Chrome` 浏览器支持的最小文字为 `12px` ，默认的文字大小为 `16px` ，并且 `0px` 会自动消失。
  > 2.  不同浏览器默认的字体大小可能不一致，所以最好给一个明确的值，不要用默认大小。
  > 3.  通常以给 `body` 设置 `font-size` 属性，这样 `body` 中的其他元素就都可以继承了。

### 字体风格

- 属性名: `font-style`
- 作用:控制字体是否为斜体。
- 常用值:
  1. `normal` ：正常（默认值）
  2. `italic`:斜体（使用字体自带的斜体效果）推荐
  3. `oblique`:斜体（强制倾斜产生的斜体效果）
- 注意:
  > `italic`会优先使用自带的斜体效果,如果没有会强制倾斜

### 字体族

- 属性名: `font-family`
- 作用: 控制字体类型。
- 语法: `font-family: "STCaiyun","Microsoft YaHei",sans-serif`
- 注意:
  > 1.  使用字体的英文名字兼容性会更好，具体的英文名可以自行查询，或在电脑的设置里去寻找。
  > 2.  如果字体名包含空格，必须使用引号包裹起来。
  > 3.  可以设置多个字体，按照从左到右的顺序逐个查找，找到就用，没有找到就使用后面的，且通常在最后写上 serif （衬线字体）或 sans-serif （非衬线字体）。
  > 4.  windows 系统中，默认的字体就是微软雅黑。

### 字体的粗细

- 属性名: `font-weight`
- 作用:控制字体的粗细。
- 语法: `font-weight: bold` `font-weight: 600`
- 常用值:
  1. `lighter`: 细
  2. `normal`: 正常
  3. `bold`: 粗
  4. `bolder`: 很粗 （多数字体不支持）
- 注意:
  > 1.  100~1000 且无单位，数值越大，字体越粗 （或一样粗，具体得看字体设计时的精确程度）。
  > 2.  100~300 等同于 lighter ， 400~500 等同于 normal ， 600 及以上等同于 bold 。

### 字体复合写法

- 属性名: `font` ，可以把上述字体样式合并成一个属性。
- 作用: 将上述所有字体相关的属性复合在一起编写。
- 语法: `font: 600 20px italic "Microsoft YaHei",sans-serif`
- 编写规则：
  1. 字体大小、字体族必须都写上。
  2. 字体族必须是最后一位、字体大小必须是倒数第二位。
  3. 各个属性间用空格隔开。
- 注意:
  > 实际开发中更推荐复合写法，但这也不是绝对的，比如只想设置字体大小，那就直接用 fontsize 属性。

## 文本属性

| 属性                      | 作用                             | 常用值示例                                                             | 备注                                               |
| ------------------------- | -------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------- |
| color                     | 文字颜色                         | red、#ff0000、rgb(255,0,0)、hsl(0,100%,50%)                            |                                                    |
| font-family               | 字体族                           | "Microsoft YaHei", Arial, sans-serif                                   | 多个用逗号分隔                                     |
| font-size                 | 字体大小                         | 16px、1rem、1.2em、100%、larger                                        |                                                    |
| font-weight               | 字体粗细                         | normal、bold、bolder、lighter、100~900                                 | 400=normal，700=bold                               |
| font-style                | 字体样式（斜体）                 | normal、italic、oblique                                                |                                                    |
| font-variant              | 小型大写字母                     | normal、small-caps                                                     |                                                    |
| font                      | 字体简写属性                     | italic bold 16px/1.5 "Microsoft YaHei", sans-serif                     | 顺序：style weight variant size/line-height family |
| line-height               | 行高                             | normal、1.5、30px、150%                                                | 推荐无单位数值（如 1.6）                           |
| letter-spacing            | 字符间距                         | normal、2px、0.1em                                                     | 负值可让字靠得更紧                                 |
| word-spacing              | 单词间距（针对空格）             | normal、5px                                                            |                                                    |
| text-align                | 文本水平对齐                     | left、right、center、justify、start、end                               | justify 两端对齐                                   |
| text-align-last           | 最后一行对齐方式（配合 justify） | left、right、center、justify、start、end                               | 常用于解决两端对齐最后一行左对齐问题               |
| text-indent               | 首行缩进                         | 2em、32px、-999px（隐藏文本常用）                                      |                                                    |
| text-decoration           | 文本装饰线                       | none、underline、overline、line-through、blink                         | 简写可组合如 underline overline                    |
| text-decoration-line      | 装饰线类型（CSS3 分开写）        | none、underline、overline、line-through                                |                                                    |
| text-decoration-color     | 装饰线颜色                       | red、currentColor                                                      |                                                    |
| text-decoration-style     | 装饰线样式                       | solid、double、dotted、dashed、wavy                                    |                                                    |
| text-decoration-thickness | 装饰线粗细                       | 2px、from-font、auto                                                   |                                                    |
| text-decoration           | 文本装饰简写（CSS3）             | underline red wavy                                                     | 顺序：line color style thickness                   |
| text-transform            | 文字大小写转换                   | none、capitalize、uppercase、lowercase                                 | capitalize 首字母大写                              |
| text-shadow               | 文字阴影                         | 2px 2px 4px rgba(0,0,0,0.5)、none                                      | 可多个阴影用逗号分隔                               |
| white-space               | 空白字符处理方式                 | normal、nowrap、pre、pre-wrap、pre-line、break-spaces                  | nowrap 常用于不换行                                |
| word-break                | 单词如何换行（中英文混合）       | normal、break-all、keep-all、break-word（已废弃）                      | break-all 常用于强制断词                           |
| word-wrap / overflow-wrap | 长单词是否允许换行               | normal、break-word、anywhere                                           | anywhere 是新推荐值                                |
| text-overflow             | 文字溢出时显示方式               | clip、ellipsis、"..."                                                  | 需配合 overflow:hidden 和 white-space:nowrap       |
| direction                 | 文字方向                         | ltr、rtl                                                               | 常配合 unicode-bidi 使用                           |
| unicode-bidi              | Unicode 双向算法控制             | normal、embed、bidi-override                                           |                                                    |
| vertical-align            | 行内元素垂直对齐                 | baseline、top、middle、bottom、text-top、text-bottom、sub、super、20px | 常用于图片与文字对齐                               |
| text-justify              | 两端对齐时的间距分配方式         | auto、inter-word、inter-character                                      | 主要影响中文两端对齐                               |
| hanging-punctuation       | 标点悬挂                         | none、first、last、force-end、allow-end                                | 让标点悬挂在行外，提升排版美观                     |
| line-clamp                | 多行文本截断显示省略号（WebKit） | 3、none                                                                | 非标准，但现代浏览器都支持，需配合 -webkit-box 等  |

### 文本颜色

- 属性名: `color`
- 作用: 控制文字的颜色
- 语法: `color: rgb(112,45,78)`
- 可选值:
  1. 颜色名
  2. rgb 或 rgba
  3. HEX 或 HEXA （十六进制）
  4. HSL 或 HSLA
- 注意:
  > 开发中常用的是： rgb/rgba 或 HEX/HEXA （十六进制）

### 文本间距

- 字母间距: `letter-spacing` 能识别中文
- 单词间距: `word-spacing` （通过空格识别词）
- 作用: 增加字母或单词间距
- 语法: `letter-spacing: 20px` `word-spacing: 20px`

### 文本修饰

- 属性名: `text-decoration`
- 作用: 控制文本的各种装饰线
- 语法: `text-decoration: underline dotted rgb(112,45,78)`
- 可选值:
  1. `none`: 无装饰线（常用）
  2. `underline`: 下划线（常用）
  3. `overline`: 上划线
  4. `line-through`: 删除线
- 附加值(控制线的样式)
  1. `dotted`: 虚线
  2. `wavy`: 波浪线
  3. 也可以指定颜色

### 文本缩进

- 属性名: `text-indent`
- 作用: 控制文本首字母的缩进
- 语法: `text-indent:40px`

### 行高

- 属性名: `line-height`
- 作用: 控制文本首字母的缩进
- 语法: `line-height:40px` `line-height:1.5` `line-height:150%`
- 技巧: 让`height`等于`line-height`,可以实现文字垂直居中

### 文本对齐-水平

- 属性名: `text-align`
- 作用: ：控制文本的水平对齐方式
- 语法: `text-align: center`
- 可选值:
  1. left ：左对齐（默认值）
  2. right ：右对齐
  3. center ：居中对齐

### 文本对齐-垂直

- 属性名: `vertical-align`
- 作用: ：控制文字垂直对齐方式,默认基线对齐
- 语法: `vertical-align: middle`
- 可选值:
  1. baseline: 使元素的基线与父元素的基线对齐(默认值)
  2. top: 使元素的顶部与所在行的顶部对齐
  3. middle: 使元素中部对齐父元素 x 的中部
  4. bottom: 使元素的底部与其所在行的底部对齐
- 注意: `vertical-align` 不能控制块元素

## 列表属性

| 属性                | 取值示例                                                                       | 作用说明                                                           | 浏览器支持情况                                  | 是否为较新特性（Level 3/4） |
| ------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ----------------------------------------------- | --------------------------- |
| list-style-type     | disc, circle, square, decimal, lower-roman, none, `symbols(cyclic "★" "☆")` 等 | 设置列表项标记的类型（圆点、数字、罗马数字、自定义符号等）         | 所有现代浏览器                                  | 基础属性                    |
| list-style-image    | url('star.svg'), none                                                          | 用图片代替默认标记                                                 | 所有现代浏览器                                  | 基础属性                    |
| list-style-position | inside, outside                                                                | 标记相对于内容框的位置（在外还是缩进在内容内）                     | 所有现代浏览器                                  | 基础属性                    |
| list-style          | `<'list-style-type'>` `<'list-style-position'>` `<'list-style-image'>`         | 上面三个属性的简写,没有顺序要求                                    | 所有现代浏览器                                  | 基础属性                    |
| marker-side         | match-parent（草案）                                                           | 控制 `::marker` 在双向文本中的对齐方向（解决 RTL 语言问题）        | Chrome 118+, Safari 17+, Firefox 122+           | Level 3 新增                |
| system              | cyclic, symbolic, alphabetic, numeric, additive, fixed                         | 高级计数系统（用于 counter-style 规则）                            | 大部分现代浏览器                                | Level 3                     |
| symbols             | `symbols(cyclic "○" "●")`                                                      | 与 @counter-style 一起使用，定义自定义标记序列                     | 大部分现代浏览器                                | Level 3                     |
| additive-symbols    | 10 "X", 5 "V", 1 "I"                                                           | 定义加法计数系统（如罗马数字）                                     | 大部分现代浏览器                                | Level 3                     |
| suffix / prefix     | suffix: "．"                                                                   | 在自定义计数器样式中定义前后缀/前缀                                | 大部分现代浏览器                                | Level 3                     |
| counter-increment   | chapter 1, section                                                             | 自定义递增计数器（常配合 counter() 或 counters() 使用）            | 所有浏览器                                      | 基础属性                    |
| counter-reset       | chapter 0, section -1                                                          | 重置计数器                                                         | 所有浏览器                                      | 基础属性                    |
| counter-set         | section 5                                                                      | 直接设置计数器的值（不依赖递增）                                   | Chrome 87+, Safari 14+, Firefox 68+             | Level 3 新增                |
| content             | content: counter(chapter) ". "                                                 | 常用于 `::before` / `::after` / `::marker` 生成编号                | 所有浏览器                                      | 基础属性                    |
| `::marker`          | `::marker { color: red; font-size: 1.5em; }`                                   | 伪元素，直接样式化列表标记（推荐替代老旧的 list-style 样式化方式） | Chrome 86+, Safari 12.1+, Firefox 84+, Edge 86+ | Level 3 重点推广            |
| display             | list-item                                                                      | 让任意元素变成列表项（会自动生成 `::marker`）                      | 所有浏览器                                      | 基础属性                    |
| @counter-style      | `@counter-style circled-digits { system: cyclic; symbols: ①②③④⑤⑥⑦⑧⑨⑩;` }       | 自定义一套完整的自定义计数器样式规则（最强大的新特性）             | Chrome 91+, Safari 17+, Firefox 112+            | Level 3 核心新特性          |

### 写法示例

```css
/* 现代推荐写法：使用 ::marker 控制标记样式 */
li::marker {
  color: #e91e63;
  font-size: 1.2em;
  content: '★ '; /* 完全覆盖默认标记 */
}

/* 完全自定义编号样式（比如带圈数字） */
@counter-style circled {
  system: cyclic;
  symbols: ① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩;
  suffix: ' ';
}

ol.custom {
  list-style-type: circled;
}
```

### 总结

- 传统属性（list-style-type/image/position）仍然是主流。
- `::marker` 伪元素 + @counter-style 是目前最强大、最现代的列表样式化方式（2023–2025 年各大浏览器已基本全部支持）。
- counter-set、marker-side 等是 Level 3 中新增的较小但实用属性。

## 表格属性

| 属性名称                               | 取值示例                                                                                                                                                                 | 作用对象                 | 说明（包括新特性）                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | ------------------------------------------------------- |
| `display`                              | `table`, `inline-table`, `table-row-group`, `table-header-group`, `table-footer-group`, `table-row`, `table-cell`, `table-column`, `table-column-group`, `table-caption` | 任何元素                 | 最基础的表格模型，推荐使用（比老的`<table>`标签更灵活） |
| `border-collapse`                      | `collapse`（默认分开） / `separate`                                                                                                                                      | table, inline-table      | 合并相邻边框（collapse 是现代主流）                     |
| `border-spacing`                       | `10px`, `10px 20px`                                                                                                                                                      | table, inline-table      | 当 border-collapse: separate 时，单元格之间的间距       |
| `caption-side`                         | `top`（默认） / `bottom` / `block-start` / `block-end`                                                                                                                   | table-caption            | CSS Logical Properties 支持逻辑方向（新）               |
| `empty-cells`                          | `show`（默认） / `hide`                                                                                                                                                  | table-cell               | 空单元格是否显示边框和背景                              |
| `table-layout`                         | `auto`（默认） / `fixed`                                                                                                                                                 | table, inline-table      | fixed 可大幅提升大表格渲染性能                          |
| `width` / `min-width` / `max-width`    | 任意长度值                                                                                                                                                               | table, table-cell 等     | 表格和单元格宽度控制                                    |
| `height` / `min-height` / `max-height` | 任意长度值                                                                                                                                                               | table-row, table-cell 等 | 高度控制（注意：table-row 高度常被内容撑开）            |
| `vertical-align`                       | `baseline`（默认） / `top` / `middle` / `bottom`                                                                                                                         | table-cell               | 单元格内内容垂直对齐                                    |
| `box-sizing`                           | `content-box` / `border-box`                                                                                                                                             | table-cell 等            | 强烈建议对 td/th 设置`border-box`，避免宽度计算失控     |

较新的/正在标准化的属性（2023-2025 新增或正式进入规范）

| 属性名称                              | 取值示例               | 作用对象      | 说明（最新特性）                                                      |
| ------------------------------------- | ---------------------- | ------------- | --------------------------------------------------------------------- |
| `border-block` / `border-inline`      | `1px solid`            | table, td 等  | 逻辑边框，适配垂直书写模式（中文竖排、日文等）                        |
| `caption-side: block-start/block-end` | —                      | table-caption | 逻辑属性，已被主流浏览器支持（Chrome 117+, Safari 17+, Firefox 128+） |
| `speak-as`（a11y 相关）               | `digits` / `spell-out` | table         | CSS Speech Module，控制屏幕阅读器如何读表格（实验性）                 |
| `contain-intrinsic-size`              | `1000px 400px`         | table         | 为大表格提供内在尺寸提示，提升滚动性能（Chrome 105+ 已支持）          |
| `content-visibility`                  | `auto` / `hidden`      | table         | 对超大表格性能优化神器（配合 contain-intrinsic-size 使用）            |

### 写法示例

```css
table {
  width: 100%;
  border-collapse: collapse; /* 必须 */
  table-layout: fixed; /* 大表格推荐 */
  content-visibility: auto; /* 超大表格性能优化 */
  contain-intrinsic-size: 1000px 500px;
}

th,
td {
  box-sizing: border-box; /* 防止宽度计算出错 */
  padding: 12px;
  text-align: start;
  vertical-align: middle;
}

/* 响应式：小屏幕时让表格横向滚动 */
.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

## 背景属性

| 属性                    | 作用说明                                             | 常用取值示例                                                                             | 是否为新特性（Level 4+） | 浏览器支持情况（2025 年） |
| ----------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------ | ------------------------- |
| `background`            | 所有背景属性的简写                                   | `background: #000 url(bg.png) repeat fixed center/cover;`                                | -                        | 全部支持                  |
| `background-color`      | 背景颜色                                             | `#fff`、`rgb(255,255,255)`、`hsl(0,0%,100%)`、`transparent`、`color-mix()`               | -                        | 全部支持                  |
| `background-image`      | 背景图片（支持多张）                                 | `url(img.jpg)`、`linear-gradient(red, blue)`、`image-set()`、`cross-fade()`、`element()` | 支持多张 + 新函数        | 全部支持                  |
| `background-position`   | 背景图片定位（支持多张）                             | `center`、`top 20% left 10px`、`0 0, 50% 50%`                                            | 支持多值                 | 全部支持                  |
| `background-size`       | 背景图片尺寸（支持多张）                             | `cover`、`contain`、`100px 200px`、`auto 50%`                                            | 支持多值                 | 全部支持                  |
| `background-repeat`     | 背景图片是否平铺                                     | `repeat`、`repeat-x`、`space`、`round`、`no-repeat`                                      | -                        | 全部支持                  |
| `background-origin`     | 背景图片的原点（从哪里开始绘制）                     | `padding-box`（默认）、`border-box`、`content-box`                                       | -                        | 全部支持                  |
| `background-clip`       | 背景绘制区域                                         | `border-box`（默认）、`padding-box`、`content-box`、`text`（文字裁剪背景）               | `text` 是 Level 4        | 全部主流浏览器支持        |
| `background-attachment` | 背景是否随内容滚动                                   | `scroll`（默认）、`fixed`、`local`                                                       | -                        | 全部支持                  |
| `background-blend-mode` | 当前背景层与下方所有内容（包括其他背景层）的混合模式 | `normal`、`multiply`、`screen`、`overlay`、`color`、`luminosity` 等                      | -                        | 全部支持                  |

特别说明最新的几个特性（2024-2025 年已落地或即将落地）

| 新特性                                                    | 说明                                       | 示例代码                                                                | 支持情况（2025.11）                       |
| --------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------- | ----------------------------------------- |
| `background-clip: text` + `-webkit-background-clip: text` | 背景只显示在文字上，常用于文字渐变镂空效果 | ```css                                                                  |
| 多背景图像的完整支持（已 10 多年）                        | 一条 background-image 可写多张，用逗号分隔 | `background-image: url(1.png), url(2.png), linear-gradient(...);`       | 全部支持                                  |
| `image()` 函数                                            | 可设置备选图片（类似 image-set）           | `background-image: image('cat.png' ltr, 'dog.png' rtl, 'default.png');` | Chrome/Edge/Safari 支持，Firefox 部分支持 |
| `cross-fade()`                                            | 两张图片之间渐变混合                       | `background: cross-fade(20% url(a.png), url(b.png));`                   | 基本全支持                                |
| `color-mix()` 用在背景色                                  | 动态混合两种颜色                           | `background-color: color-mix(in srgb, red 30%, blue);`                  | 全部主流浏览器支持（2024 年起）           |
| `element()` 函数（极新）                                  | 把页面某个元素当作背景图（类似截图）       | `background: element(#some-div);`                                       | 仅 Firefox 部分支持，实验性               |

### 写法示例

```css
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%), url('hero-bg.jpg') center/cover no-repeat;
  background-clip: padding-box; /* 或 text 用于文字效果 */
  background-blend-mode: multiply; /* 混合模式 */
}
```

## 滤镜属性

- `filter`: 作用与自身元素及其子元素
- `backdrop-filter`: 模糊的是元素后面的东西（常用于毛玻璃、磨砂背景）

| filter 函数     | 语法示例                                            | 功能说明                                                      | 常用取值范围                | 备注                   |
| --------------- | --------------------------------------------------- | ------------------------------------------------------------- | --------------------------- | ---------------------- |
| `blur()`        | `filter: blur(5px)`                                 | 高斯模糊，值越大越模糊                                        | 0 ~ 无上限（常用 1px~20px） | 只支持长度单位         |
| `brightness()`  | `filter: brightness(1.5)` 或 `brightness(150%)`     | 亮度调整，<1 变暗，=1 原图，>1 变亮                           | 0 ~ 无上限（常用 0~3）      | 支持百分比             |
| `contrast()`    | `filter: contrast(200%)`                            | 对比度调整，<100% 降低对比度，=100% 原图，>100% 增强对比度    | 0 ~ 无上限                  | 支持百分比             |
| `grayscale()`   | `filter: grayscale(100%)`                           | 灰度（黑白），0% 原图，100% 完全灰度                          | 0% ~ 100%                   | 支持百分比             |
| `sepia()`       | `filter: sepia(80%)`                                | 复古褐色（黄褐色调），0% 无效果，100% 完全褐色                | 0% ~ 100%                   | 支持百分比             |
| `saturate()`    | `filter: saturate(2)` 或 `saturate(200%)`           | 饱和度，<1 降低饱和度，=1 原图，>1 增强饱和度                 | 0 ~ 无上限（常用 0~5）      | 支持百分比             |
| `hue-rotate()`  | `filter: hue-rotate(90deg)`                         | 色相旋转，按色轮旋转角度                                      | 0deg ~ 360deg（可负数循环） | 必须带角度单位         |
| `invert()`      | `filter: invert(100%)`                              | 反色（底片效果），0% 原图，100% 完全反转                      | 0% ~ 100%                   | 支持百分比             |
| `opacity()`     | `filter: opacity(50%)`                              | 透明度（和 opacity 属性效果一样，但可与其他 filter 一起使用） | 0% ~ 100%                   | 支持百分比             |
| `drop-shadow()` | `filter: drop-shadow(4px 4px 10px rgba(0,0,0,0.5))` | 投影（唯一能跟随透明区域的阴影，优于 box-shadow）             | 同 box-shadow 参数          | 推荐用于有透明度的图片 |

### 写法示例

```css
filter: blur(5px) brightness(1.2) contrast(120%) grayscale(30%);
```

### 常用效果

| 想要的效果             | 推荐 filter 值                                       |
| ---------------------- | ---------------------------------------------------- |
| 黑白老照片             | `grayscale(100%) sepia(70%) brightness(1.1)`         |
| 变暗蒙版（常用遮罩层） | `brightness(0.4)` 或 `brightness(0.6) contrast(1.2)` |
| 高亮/发光感            | `brightness(1.3) contrast(1.3) saturate(1.4)`        |
| Instagram 风复古       | `sepia(50%) contrast(110%) brightness(110%)`         |
| 鼠标悬停增强           | `brightness(1.2) contrast(1.2) saturate(1.3)`        |
| 完全反色               | `invert(100%)`                                       |

这些就是目前所有标准的 CSS filter 函数（截至 2025 年没有新增）。直接复制上面的表格到笔记或项目文档里就能用了～如果需要 SVG filter 更复杂的效果可以另外再说！

## 过渡属性

| 属性                         | 含义                            | 可取值示例                                                                                               | 默认值       | 备注                                                             |
| ---------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------- |
| `transition-property`        | 指定应用过渡效果的 CSS 属性名称 | `width`,`height `, `background-color`, `transform`, `all`, `none`                                        | `all`        | 多个用逗号分隔，最常用 `all`                                     |
| `transition-duration`        | 过渡效果需要多久完成            | `0s`, `2s`, `500ms`, `1.5s`                                                                              | 0s           | 必须设置才有过渡效果，多个时按顺序对应 property                  |
| `transition-timing-function` | 过渡的运动曲线（速度变化方式）  | `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier(0.1,0.7,1.0,0.1)`, `steps(4, end)` | `ease`       | 常用 `ease-out` 更自然，也可自定义贝塞尔曲线                     |
| `transition-delay`           | 延迟多久后开始过渡              | `0s`, `0.3s`, `-1s`（负值表示从中间开始）                                                                | 0s           | 多个时按顺序对应                                                 |
| `transition`                 | 上面四个属性的简写              | `all 0.3s ease-out 0s`<br>`width 1s, height 2s`<br>`transform 0.4s cubic-bezier(.2,.8,.4,1) .1s`         | 见各属性默认 | 推荐日常使用简写形式，顺序：property → duration → timing → delay |

### 写法示例

```css
.btn {
  /* 最常用的写法 */
  transition: all 0.25s ease-out;

  /* 或者分开写更清晰 */
  /* transition-property: background-color, transform;
  transition-duration: 0.3s, 0.2s;
  transition-timing-function: ease-out, ease;
  transition-delay: 0s, 0.1s; */
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  /* 上面两个属性都会有 0.25s 的平滑过渡 */
}
```

### 常用效果

| 效果描述       | 推荐写法                                                      | 说明                                                 |
| -------------- | ------------------------------------------------------------- | ---------------------------------------------------- |
| 标准平滑       | `transition: all 0.25s ease-out;`                             | 最常用，速度感好                                     |
| 更明显一些     | `transition: all 0.3s ease-out;`                              | 经典 Material Design 感觉                            |
| 快速响应       | `transition: all 0.15s ease;`                                 | 按钮 hover 等用这个很灵敏                            |
| 丝滑高端感     | `transition: all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);`     | 类似 iOS/macOS 的弹性感（可取名 `0.22,0.61,0.36,1`） |
| 只过渡特定属性 | `transition: background-color 0.3s, transform 0.2s ease-out;` | 性能更好，避免不必要的 all 过渡                      |

## 变换属性

| 函数          | 语法示例                           | 功能说明                               | 常用参数说明                                                           | 是否支持多值叠加 |
| ------------- | ---------------------------------- | -------------------------------------- | ---------------------------------------------------------------------- | ---------------- |
| translate()   | `translate(100px, 50px)`           | 平移（移动）元素                       | 第一个值：X 轴（左右）<br>第二个值：Y 轴（上下）                       | 是               |
| translateX()  | `translateX(100px)`                | 仅在 X 轴平移                          | 正值向右，负值向左                                                     | 是               |
| translateY()  | `translateY(-50%)`                 | 仅在 Y 轴平移                          | 正值向下，负值向上                                                     | 是               |
| translateZ()  | `translateZ(100px)`                | 仅在 Z 轴平移（3D）                    | 通常配合 perspective 使用                                              | 是               |
| translate3d() | `translate3d(100px, 50px, -200px)` | 3D 平移                                | x, y, z 三个方向同时设置                                               | 是               |
| scale()       | `scale(1.5, 0.8)`                  | 缩放元素                               | 第一个值：X 轴缩放<br>第二个值：Y 轴缩放<br>1=原大小，>1 放大，<1 缩小 | 是               |
| scaleX()      | `scaleX(2)`                        | 仅 X 轴缩放                            | -                                                                      | 是               |
| scaleY()      | `scaleY(0.5)`                      | 仅 Y 轴缩放                            | -                                                                      | 是               |
| scaleZ()      | `scaleZ(3)`                        | 仅 Z 轴缩放（3D）                      | 通常配合 perspective 使用                                              | 是               |
| scale3d()     | `scale3d(1.5, 1.5, 2)`             | 3D 缩放                                | x, y, z 三个方向同时缩放                                               | 是               |
| rotate()      | `rotate(45deg)`                    | 2D 旋转（绕 Z 轴）                     | 正值顺时针，负值逆时针                                                 | 是               |
| rotateX()     | `rotateX(60deg)`                   | 绕 X 轴旋转（3D）                      | 元素像“抬头低头”一样翻转                                               | 是               |
| rotateY()     | `rotateY(180deg)`                  | 绕 Y 轴旋转（3D）                      | 元素像“左右翻转”一样（卡片翻面常用）                                   | 是               |
| rotateZ()     | `rotateZ(90deg)`                   | 绕 Z 轴旋转（等同于 rotate()）         | -                                                                      | 是               |
| rotate3d()    | `rotate3d(1, 1, 0, 45deg)`         | 自定义 3D 旋转轴                       | 前面三个数字是向量(x,y,z)，最后一个是角度                              | 是               |
| skew()        | `skew(30deg, 10deg)`               | 斜切（扭曲）                           | 第一个值：X 轴斜切<br>第二个值：Y 轴斜切                               | 是               |
| skewX()       | `skewX(30deg)`                     | 仅 X 轴斜切（水平拉伸）                | -                                                                      | 是               |
| skewY()       | `skewY(20deg)`                     | 仅 Y 轴斜切（垂直拉伸）                | -                                                                      | 是               |
| matrix()      | `matrix(1, -0.3, 0, 1, 0, 0)`      | 2D 变换矩阵（高级）                    | 6 个参数，等价于 translate + rotate + scale + skew 的组合              | 是               |
| matrix3d()    | `matrix3d(...)`                    | 3D 变换矩阵（16 个参数）               | 极少手动写，通常由工具生成                                             | 是               |
| perspective() | `perspective(800px)`               | 给子元素设置透视距离（通常写在父元素） | 作为 transform 的一个函数使用，值越小透视效果越夸张                    | 否（单独使用）   |

### 常用组合

```css
transform: translateX(100px) rotate(45deg) scale(1.2);
transform: translate(-50%, -50%) rotateY(180deg); /* 卡片翻面中心点常用 */
transform: translate3d(100px, 200px, 50px) scale3d(1.2, 1.2, 1.2);
```

### 其他属性

常与 transform 一起使用

| 属性                | 作用                           | 常见值                               |
| ------------------- | ------------------------------ | ------------------------------------ |
| transform-origin    | 变换原点（旋转、缩放的中心点） | center（默认）、top left、50% 50% 等 |
| transform-style     | 是否保留 3D 空间               | flat（默认）、preserve-3d            |
| perspective         | 父元素透视距离                 | 800px、1000px、none                  |
| perspective-origin  | 透视点位置                     | 50% 50%（默认）、top left 等         |
| backface-visibility | 背面是否可见（3D 翻转背后）    | visible（默认）、hidden              |

## 动画属性

### animation 属性

以下是 CSS 动画（CSS Animations）常用的所有核心属性总结，已整理成清晰的 Markdown 表格，方便复制到笔记或文档中使用：

| 属性                        | 作用                             | 常用值 / 示例                                                  | 默认值  | 备注                              |
| --------------------------- | -------------------------------- | -------------------------------------------------------------- | ------- | --------------------------------- |
| `animation-name`            | 指定@keyframes 动画的名称        | `move`, `fadeIn`, `myAnim`                                     | none    | 必须与 @keyframes 名称对应        |
| `animation-duration`        | 动画完成一个周期所需时间         | `2s`, `500ms`, `1.5s`                                          | 0s      | 必须设置，否则无动画              |
| `animation-timing-function` | 动画执行的速度曲线（缓动函数）   | `ease`, `linear`, `ease-in-out`, `cubic-bezier(0.42,0,0.58,1)` | ease    | 可使用 steps() 实现帧动画         |
| `animation-delay`           | 动画开始前的延迟时间             | `1s`, `-500ms`（负值表示从中间开始播放）                       | 0s      | 支持负值                          |
| `animation-iteration-count` | 动画播放次数                     | `1`, `5`, `infinite`                                           | 1       | infinite 表示无限循环             |
| `animation-direction`       | 动画循环时的播放方向             | `normal`, `reverse`, `alternate`, `alternate-reverse`          | normal  | alternate：奇数次正向，偶数次反向 |
| `animation-fill-mode`       | 动画执行前后元素的样式           | `none`, `forwards`, `backwards`, `both`                        | none    | forwards：结束时保持最后一帧样式  |
| `animation-play-state`      | 动画的播放状态（可通过 JS 控制） | `running`, `paused`                                            | running | 常用于 hover 暂停动画             |

简写属性（推荐使用）
| 简写属性 | 示例 | 等价于依次写以下属性 |
|--------------------|---------------------------------------------------|----------------------|
| `animation` | `animation: slideIn 2s ease-in-out 0.5s infinite alternate forwards;` | name duration timing-function delay iteration-count direction fill-mode |

- 常用顺序: name → duration → timing → delay → count → direction → fill-mode → play-state
- 设置一个时间表示 `duration`,2 个时间表示`duration`和`delay`,其他没有顺序要求

#### 写法示例

```css
/* 完整写法 */
.box {
  animation-name: bounce;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-delay: 0.2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: both;
}

/* 推荐简写（顺序固定！） */
.box {
  animation: bounce 1s ease-in-out 0.2s infinite alternate both;
}
```

### 关键帧

```css
@keyframes 动画名称 {
  /* 方式1：from → to（适合简单两端动画）*/
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100px);
    opacity: 0;
  }

  /* 方式2：百分比（推荐，更灵活）*/
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
```

#### 关键帧写法示例

```css
.button {
  animation: pulse 1.5s ease-in-out infinite both;
}

.card {
  animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.float-icon {
  animation: float 3s ease-in-out infinite;
}
```

#### 经典动画示例

```css
/* 1. 淡入 0.6s~1s 页面加载、弹窗出现*/
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* 2. 淡出 0.4s~0.8s 关闭弹窗、移除元素*/
@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}

/* 3. 从左侧滑入 0.5s 侧边栏、菜单展开*/
@keyframes slideInLeft {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

/* 4. 从右侧滑入 0.5s 通知、购物车面板*/
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

/* 5. 从下方滑入 0.6s Modal、Toast*/
@keyframes slideInUp {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

/* 6. 从上方滑入 0.5s 下拉菜单*/
@keyframes slideInDown {
  from { transform: translateY(-100%); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

/* 7. 弹跳进入 0.8s 按钮、图标强调*/
@keyframes bounceIn {
  0%   { opacity: 0; transform: scale(0.3); }
  50%  { opacity: 1; transform: scale(1.05); }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}

/* 8. 放大进入 0.5s 图片、卡片出现*/
@keyframes zoomIn {
  from { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); }
  50%  { opacity: 1; }
  to   { transform: scale3d(1, 1, 1); }
}

/* 9. 旋转进入 0.6s Loading、装饰*/
@keyframes rotateIn {
  from { opacity: 0; transform: rotate(-200deg); }
  to   { opacity: 1; transform: rotate(0); }
}

/* 10. 水平翻转进入 0.8s 卡片翻转 */
@keyframes flipInX {
  from { transform: perspective(400px) rotate3d(1, 0, 0, 90deg); opacity: 0; }
  40%  { transform: perspective(400px) rotate3d(1, 0,0, -20deg); }
  60%  { transform: perspective(400px) rotate3d(1, 0,0, 10deg); opacity: 1; }
  80%  { transform: perspective(400px) rotate3d(1, 0,0, -5deg); }
  to   { transform: perspective(400px); }
}

/* 11. 心跳 1.2s 图标强调、优惠标签*/
@keyframes heartbeat {
  0%   { transform: scale(1); }
  14%  { transform: scale(1.3); }
  28%  { transform: scale(1); }
  42%  { transform: scale(1.3); }
  70%  { transform: scale(1); }
  100% { transform: scale(1); }
}

/* 12. 脉冲光环（超常用） 1.5s infinite按钮悬停、呼吸灯*/
@keyframes pulse {
  0%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,107,107,0.7); }
  70%  { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(255,107,107,0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,107,107,0); }
}

/* 13. 左右抖动（表单错误必备） 0.8s 表单错误提示*/
@keyframes shake {
  0%,100% { transform: translateX(0); }
  10%,30%,50%,70%,90% { transform: translateX(-10px); }
  20%,40%,60%,80%   { transform: translateX(10px); }
}

/* 14. 钟摆摆动 1s 悬停提示*/
@keyframes swing {
  20%  { transform: rotate3d(0,0,1,15deg); }
  40%  { transform: rotate3d(0,0,1,-10deg); }
  60%  { transform: rotate3d(0,0,1,5deg); }
  80%  { transform: rotate3d(0,0,1,-5deg); }
  100% { transform: rotate3d(0,0,1,0deg); }
}

/* 15. 橡皮筋拉伸  1s 标题、按钮强调*/
@keyframes rubberBand {
  from { transform: scale3d(1, 1, 1); }
  30%  { transform: scale3d(1.25, 0.75, 1); }
  40%  { transform: scale3d(0.75, 1.25, 1); }
  50%  { transform: scale3d(1.15, 0.85, 1); }
  65%  { transform: scale3d(0.95, 1.05, 1); }
  75%  { transform: scale3d(1.05, 0.95, 1); }
  to   { transform: scale3d(1, 1, 1); }
}

/* 16. 庆祝成功（tada）1s 成功提示 */
@keyframes tada {
  0%   { transform: scale3d(1,1,1); }
  10%,20% { transform: scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg); }
  30%,50%,70%,90% { transform: scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg); }
  40%,60%,80% { transform: scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg); }
  100% { transform: scale3d(1,1,1); }
}

/* 17. 持续小弹跳 infinite 箭头提示向下 */
@keyframes bounce {
  0%,20%,53%,80%,100% { transform: translate3d(0,0,0); }
  40%,43% { transform: translate3d(0,-20px,0); }
  70%     { transform: translate3d(0,-10px,0); }
  90%     { transform: translate3d(0,-4px,0); }
}

/* 18. 闪烁 infinite 透明度闪烁 */
@keyframes flash {
  0%,50%,100% { opacity: 1; }
  25%,75%     { opacity: 0; }
}

/* 19. 背景渐变流动（2025 超火） 8s infinite 按钮、卡片背景 */
@keyframes gradientMove {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 20. 漂浮 3s infinite悬浮图标、卡片 */
@keyframes float {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-20px); }
  }
  100% { transform: translateY(0px); }
}
```

### 时间线

| 属性                    | 作用                                         | 可取值 / 常用写法                                                                    | 默认值              | 备注（2025）浏览器支持情况                      |
| ----------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------- | ----------------------------------------------- |
| `animation-timeline`    | 指定动画的时间轴（核心属性）                 | `auto`、`scroll()`、`view()`、`--custom-timeline`、多个值用逗号分隔                  | `auto`              | Chrome 115+、Safari 17.4+、Firefox 122+（部分） |
| `scroll()`              | 绑定到滚动条（滚动驱动动画）                 | `scroll(nearest block)`、`scroll(root inline)`、`scroll(scroller-nearest block)` 等  | -                   | 广泛支持                                        |
| `view()`                | 绑定到元素在视口中的显示进度（进入视口动画） | `view(block)`、`view(inline)`、`view(y 100px 50px)` 等                               | -                   | 广泛支持                                        |
| `animation-range`       | 控制动画在时间轴上的播放区间                 | `<start-length> <end-length>`<br>如：`0% 100%`、`cover 20% cover 80%`、`100px 500px` | `normal`（0%-100%） | Chrome 115+、Safari 17.4+                       |
| `animation-range-start` | 单独设置动画开始位置                         | `normal`、`cover 10%`、`entry 30%`、`200px` 等                                       | `normal`            | 同上                                            |
| `animation-range-end`   | 单独设置动画结束位置                         | 同上                                                                                 | `normal`            | 同上                                            |
| `timeline-scope`        | 定义可被命名的 timeline 作用域（新）         | `--my-timeline`、`--header, --footer`                                                | none                | Chrome 120+ 实验性                              |
| `scroll-timeline-name`  | 给 scroll() 时间轴命名（旧语法，已废弃）     | `--my-scroll`                                                                        | none                | 即将被移除，勿用                                |
| `scroll-timeline-axis`  | 指定滚动方向（旧语法，已废弃）               | `block`、`inline`、`y`、`x`                                                          | `block`             | 即将被移除，勿用                                |
| `view-timeline-name`    | 给 view() 时间轴命名                         | `--card-timeline`                                                                    | none                | 推荐新写法                                      |
| `view-timeline-inset`   | 调整 view() 触发区域（相当于 padding）       | `auto`、`100px`、`10% 20%`                                                           | `auto`              | 推荐新写法                                      |

#### 写法示例

```css
.card {
  opacity: 0;
  transform: translateY(100px);

  /* 滚动驱动动画：整个页面滚动时触发动画 */
  animation: fadeSlide 1.2s ease-out forwards;
  animation-timeline: scroll(root block); /* 跟随页面垂直滚动 */

  /* 视口进度动画：元素进入视口时触发动画（最常用！） */
  /* animation-timeline: view(); */

  /* 精细控制：只在元素 20% 进入视口 ~ 完全进入 80% 时播放 */
  animation-range: cover 20% cover 80%;
}

@keyframes fadeSlide {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### 常见组合

| 效果                   | 关键代码                                                                                                   | 说明                                   |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| 滚动淡入（经典）       | `animation: fade 1s forwards; animation-timeline: scroll();`                                               | 页面滚动到位置时淡入                   |
| 进入视口淡入放大       | `animation: show 1s forwards; animation-timeline: view(); animation-range: entry 0% cover 0%;`             | 元素一露头就立刻开始                   |
| 视口中部才开始动画     | `animation-timeline: view(); animation-range: 100px 300px;`                                                | 距离视口顶部 100px 开始，到 300px 结束 |
| 卡片逐个出现（超丝滑） | `animation: slideUp 0.8s forwards; animation-timeline: view(block); animation-range: cover 10% cover 90%;` | 每张卡片自己控制进度，错位感极强       |
| 进度条随页面滚动增长   | `animation: grow linear forwards; animation-timeline: scroll(root block);`                                 | 常用于“阅读进度条”                     |
