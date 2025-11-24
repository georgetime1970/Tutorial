# 通用属性

## object-fit

- `object-fit` 属性指定元素的内容应该如何去适应指定容器的高度与宽度。
- `object-fit` 一般用于 img 和 video 标签，一般可以对这些元素进行保留原始比例的剪切、缩放或者直接进行拉伸等。

| 值             | 描述                                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| **fill**       | 默认，不保证保持原有的比例，内容拉伸填充整个内容容器。                                                      |
| **contain**    | 保持原有尺寸比例。内容被缩放。                                                                              |
| **cover**      | 保持原有尺寸比例。但部分内容可能被剪切。常用                                                                |
| **none**       | 保留原有元素内容的长度和宽度，也就是说内容不会被重置。                                                      |
| **scale-down** | 保持原有尺寸比例。内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。 |
| **initial**    | 设置为默认值，                                                                                              |
| **inherit**    | 从该元素的父元素继承属性。                                                                                  |

## object-position

- `object-position` 属性一般与 `object-fit` 一起使用，用来设置元素的位置。
- `object-position` 一般用于 img 和 video 标签

| 值       | 描述                                                                                       |
| -------- | ------------------------------------------------------------------------------------------ |
| position | 指定 image 或 video 在容器中的位置。第一个值为 x 坐标位置的值，第二个值为 y 坐标位置的值。 |
| initial  | 设置为默认值，                                                                             |
| inherit  | 从该元素的父元素继承属性。                                                                 |

```css
/* position 的表示的方式有： */
object-position: 50% 50%;
object-position: right top;
object-position: left bottom;
object-position: 250px 125px;
```

## clip-path

- 使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。可以指定一些特定形状。
- [在线生成](https://tools.jb51.net/static/api/css3path/index.html)

**基本形状函数**

| 类型        | 语法                                            | 说明                                 | 示例                                                                           |
| ----------- | ----------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| `inset()`   | `inset(top right bottom left round 圆角)`       | 矩形裁剪，类似 margin 写法，支持圆角 | `clip-path: inset(10% 5% 20% 8% round 10px);`                                  |
| `circle()`  | `circle(半径 at 中心点x 中心点y)`               | 圆形裁剪                             | `clip-path: circle(50% at 50% 50%);`<br>`clip-path: circle(100px at 30% 70%);` |
| `ellipse()` | `ellipse(横轴半径 纵轴半径 at 中心点x 中心点y)` | 椭圆裁剪                             | `clip-path: ellipse(100px 60px at 50% 50%);`                                   |
| `polygon()` | `polygon(x1 y1, x2 y2, x3 y3, ...)`             | 多边形裁剪，最强大灵活               | `clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);`（菱形）              |
| `path()`    | `path('SVG路径数据')`                           | 使用 SVG path 路径裁剪（兼容性较差） | `clip-path: path('M0.5,0 L1,1 L0,1 Z');`                                       |

**其他取值**

| 类型          | 语法                      | 说明                                      |
| ------------- | ------------------------- | ----------------------------------------- |
| `none`        | `clip-path: none;`        | 不裁剪（默认值）                          |
| `margin-box`  | `clip-path: margin-box;`  | 使用外边距盒作为裁剪区域                  |
| `border-box`  | `clip-path: border-box;`  | 使用边框盒（默认）                        |
| `padding-box` | `clip-path: padding-box;` | 使用内边距盒                              |
| `content-box` | `clip-path: content-box;` | 使用内容盒                                |
| `fill-box`    | `clip-path: fill-box;`    | 使用对象的填充区域（SVG 常用）            |
| `stroke-box`  | `clip-path: stroke-box;`  | 使用描边盒（SVG）                         |
| `view-box`    | `clip-path: view-box;`    | 使用最近的 SVG viewport 作为参考盒（SVG） |

**引用外部裁剪路径**

| 类型    | 语法                       | 说明                                              | 示例                                                                                     |
| ------- | -------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `url()` | `clip-path: url(#clipId);` | 引用 `<clipPath>` 元素中的路径（最常用在 SVG 中） | `<clipPath id="myClip"><polygon points="..."/></clipPath>`<br>`clip-path: url(#myClip);` |

**常用技巧速查**

| 效果                   | clip-path 代码                                                                                                | 备注               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------ |
| 圆形头像               | `clip-path: circle(50%);`                                                                                     | 中心点默认 50% 50% |
| 斜切角（热门卡片效果） | `clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);`         | 可调 20px 改角度   |
| 三角形（向下）         | `clip-path: polygon(50% 100%, 0 0, 100% 0);`                                                                  | -                  |
| 五角星                 | `clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);` | 经典写法           |
| 渐变动画常见波浪       | 通常配合 `path()` 或外部 SVG                                                                                  | -                  |

## border-radius

- 设置元素的外边框圆角。当使用一个半径时确定一个圆形，当使用两个半径时确定一个椭圆。这个(椭)圆与边框的交集形成圆角效果
- `border-radius: 1-4 length|% / 1-4 length|%;`
  每个半径的四个值的顺序是：左上角，右上角，右下角，左下角。如果省略左下角，右上角是相同的。如果省略右下角，左上角是相同的。如果省略右上角，左上角是相同的。

| 项目                   | 语法/取值                                                                                                            | 说明                                                             | 示例                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------- |
| **属性名**             | `border-radius`                                                                                                      | 简写属性，同时设置四个角的圆角                                   | `border-radius: 10px;`                                         |
| **单个值**             | `border-radius: 长度 \| 百分比;`                                                                                     | 四个角都使用相同圆角                                             | `border-radius: 20px;`                                         |
| **两个值**             | `border-radius: 值1 值2;`                                                                                            | 值 1 → 左上+右下，值 2 → 右上+左下（顺时针）                     | `border-radius: 10px 20px;`                                    |
| **三个值**             | `border-radius: 值1 值2 值3;`                                                                                        | 值 1 → 左上，值 2 → 右上+左下，值 3 → 右下                       | `border-radius: 10px 20px 30px;`                               |
| **四个值**             | `border-radius: 值1 值2 值3 值4;`                                                                                    | 依次为：左上 → 右上 → 右下 → 左下（顺时针）                      | `border-radius: 10px 20px 30px 40px;`                          |
| **斜杠分隔（椭圆角）** | `border-radius: 水平半径 / 垂直半径;`                                                                                | 斜杠前控制水平半径，斜杠后控制垂直半径，可形成椭圆角             | `border-radius: 50% / 20%;`                                    |
| **单独控制某个角**     | `border-top-left-radius`<br>`border-top-right-radius`<br>`border-bottom-right-radius`<br>`border-bottom-left-radius` | 分别控制四个角的圆角（也支持斜杠写椭圆）                         | `border-top-left-radius: 20px 10px;`                           |
| **逻辑属性（新标准）** | `border-start-start-radius`<br>`border-start-end-radius`<br>`border-end-start-radius`<br>`border-end-end-radius`     | 适配书写方向（LTR/RTL），推荐未来使用                            | `border-start-start-radius: 20px;`                             |
| **常用特殊效果**       | `border-radius: 50%;`                                                                                                | 变成圆形（正方形时）或胶囊形（长方形时）                         | `.circle { width: 100px; height: 100px; border-radius: 50%; }` |
| **超过 50%的情况**     | `border-radius: 999px` 或 `100%` 等超大值                                                                            | 当圆角超过元素宽高的一半时，会自动限制为最大可能圆角（不会变形） | 常用于做“超大圆角”胶囊按钮                                     |
| **继承性**             | no                                                                                                                   | 不继承                                                           | -                                                              |
| **初始值**             | 0                                                                                                                    | 无圆角                                                           | -                                                              |

**常见简写**

| 想要的效果           | 写法示例                                | 实际等价于四个角的顺序                          |
| -------------------- | --------------------------------------- | ----------------------------------------------- |
| 左上大，其余小       | `border-radius: 30px 10px 10px;`        | 30px 10px 10px 10px                             |
| 左上和右下大         | `border-radius: 30px 10px;`             | 30px 10px 30px 10px                             |
| 左上和右下大（椭圆） | `border-radius: 50px 20px / 30px 10px;` | 左上水平 50px 右上 20px 右下 50px 左下 20px / … |
| 只改一个角           | `border-top-left-radius: 20px;`         | 只影响左上角                                    |

## box-reflect

- `box-reflect` 是 WebKit 内核独有的非标准属性（目前只有 Chrome、Edge、Safari 支持，Firefox 不支持），用于为元素创建镜像反射效果，常用于制作炫酷的倒影。

| 属性名称   | `box-reflect`                                                                       |
| ---------- | ----------------------------------------------------------------------------------- |
| 取值       | `<direction> <offset>? <mask-box-image>?`                                           |
| 初始值     | none                                                                                |
| 适用元素   | 除 display 为 inline 的元素外所有元素（推荐用在块级或替换元素上）                   |
| 是否继承   | 否                                                                                  |
| 官方状态   | 非标准（仅 WebKit/Gecko 部分实现，W3C 无规范）                                      |
| 浏览器支持 | Chrome、Safari、Edge（-webkit- 前缀可省略现代浏览器已支持无前缀）<br>Firefox 不支持 |

**详细取值**

| 参数位置 | 参数名称       | 取值类型                             | 说明                                                     | 示例                            |
| -------- | -------------- | ------------------------------------ | -------------------------------------------------------- | ------------------------------- |
| 1        | direction      | `above` / `below` / `left` / `right` | 必填，倒影相对于原元素的方向（最常用 below）             | `below`                         |
| 2        | offset         | `<length>` / `<percentage>`          | 可选，倒影与原元素之间的间距（默认 0）                   | `10px`、`5%`                    |
| 3        | mask-box-image | 同 `mask-box-image` 的所有取值       | 可选，倒影的遮罩图像，支持线性渐变实现淡出效果（最常用） | `linear-gradient(...)`、`url()` |

**常用 mask-box-image 渐变写法（实现淡出倒影）**

| 效果描述                   | 代码示例（方向 below）                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------ |
| 完全实心倒影               | `box-reflect: below;`                                                                                  |
| 从上到下完全透明（无倒影） | `box-reflect: below 0px linear-gradient(transparent, transparent);`                                    |
| 常见淡出倒影（推荐）       | `box-reflect: below 2px linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%);`             |
| 更柔和的淡出               | `box-reflect: below 0px linear-gradient(180deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 100%);` |

**完整示例（最常用的倒影效果）**

```css
.reflect {
  -webkit-box-reflect: below 4px linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
}

/* 现代浏览器多数已支持无前缀（2025 年现状） */
.reflect {
  box-reflect: below 4px linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
}
```

`box-reflect` 最常用的写法就是 `box-reflect: below [间距] linear-gradient(...)`，通过渐变做透明度遮罩实现自然淡出的倒影效果。
