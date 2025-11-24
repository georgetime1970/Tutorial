# CSS 基础

## CSS 三大特性

1. 层叠性

- 概念：如果发生了样式冲突，那就会根据一定的规则（选择器优先级），进行样式的层叠（覆
  盖）

- 其实就是一层覆盖一层的意思,容易产生屎山代码

2. 继承性

- 概念：元素会自动拥有其父元素、或其祖先元素上所设置的某些样式
- 规则：优先继承离得近的
- 常见的可继承属性：: `text-??`, `font-??`, `line-??` , `color` ......

3. 优先级

- `!important` > 行内样式 > ID 选择器 > 类选择器 > 元素选择器 > `*` > 继承的样
  式
- 内部样式 = 外部样式

## 变量

| 项目                 | 语法                                                                                                       | 说明与示例                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **定义位置**         | 任意选择器内（最常用 :root）                                                                               | `:root { --main-color: #0066ff; }`<br>`.theme-dark { --bg-color: #000; }`              |
| **定义语法**         | `--变量名: 值;`                                                                                            | 变量名必须以两个短横线 `--` 开头，后面跟自定义名称（区分大小写）                       |
| **全局变量推荐写法** | `:root { --primary-color: #0066ff; }`                                                                      | 写在 :root 上相当于全局变量，所有元素都能访问                                          |
| **局部变量**         | 某个类或元素内定义                                                                                         | `.card { --card-radius: 12px; }` 只在 .card 及其子元素中生效                           |
| **使用方式 var()**   | `var(--变量名, 回退值)`                                                                                    | `color: var(--primary-color);`<br>`border-radius: var(--card-radius, 8px);` 回退值可选 |
| **多级回退**         | 可以连续写多个回退                                                                                         | `color: var(--text-color, var(--main-color, #333));`                                   |
| **在 calc() 中使用** | 完全支持                                                                                                   | `width: calc(100% - var(--gutter) * 2);`                                               |
| **继承性**           | 自动继承                                                                                                   | 子元素无需再次声明即可直接使用父级定义的变量                                           |
| **JavaScript 操作**  | `getComputedStyle(element).getPropertyValue('--my-var')`<br>`element.style.setProperty('--my-var', 'red')` | JS 可以读取、修改 CSS 变量，常用于主题切换、暗黑模式等                                 |
| **常见命名规范**     | `--theme-primary`, `--spacing-sm`, `--font-base` 等                                                        | 推荐使用有意义的层级式命名                                                             |
| **不支持的地方**     | 媒体查询条件、选择器名、@import 路径等                                                                     | 正确：`@media (min-width: var(--breakpoint-md))` ×<br>只能在属性值中使用               |
| **自定义属性作用域** | 层级继承 + 就近原则                                                                                        | 子元素会优先使用自己或更近父级定义的同名变量（可用于局部覆盖主题色）                   |

### 写法示例

```css
/* 全局主题变量 */
:root {
  --primary: #0066ff;
  --primary-dark: #0052cc;
  --text: #333;
  --bg: #fff;
  --radius: 8px;
  --spacing: 1rem;
}

/* 暗黑模式覆盖 */
[data-theme='dark'] {
  --text: #eee;
  --bg: #111;
}

/* 使用 */
body {
  color: var(--text);
  background: var(--bg);
  font-size: 16px;
}

.button {
  padding: calc(var(--spacing) / 2) var(--spacing);
  background: var(--primary);
  border-radius: var(--radius);
}

.button:hover {
  background: var(--primary-dark);
}
```

## 单位

| 单位 | 描述                                                                                                                           |
| ---- | ------------------------------------------------------------------------------------------------------------------------------ |
| em   | 它是描述相对于应用在当前元素的字体尺寸，所以它也是相对长度单位。一般浏览器字体大小默认为 16px，则 2em == 32px；                |
| ex   | 依赖于英文字母小 x 的高度                                                                                                      |
| ch   | 数字 0 的宽度                                                                                                                  |
| rem  | rem 是根 em（root em）的缩写，rem 作用于非根元素时，相对于根元素字体大小；rem 作用于根元素字体大小时，相对于其出初始字体大小。 |
| vw   | Viewport Width，视窗宽度，1vw=视窗宽度的 1%                                                                                    |
| vh   | Viewport Height，视窗高度，1vh=视窗高度的 1%                                                                                   |
| vmin | vw 和 vh 中较小的那个。                                                                                                        |
| vmax | vw 和 vh 中较大的那个。                                                                                                        |
| %    | 百分比                                                                                                                         |

## 函数

| 函数                          | 描述                                                           |
| ----------------------------- | -------------------------------------------------------------- |
| `attr()`                      | 返回选择元素的属性值。                                         |
| `calc()`                      | 允许计算 CSS 的属性值，比如动态计算长度值。                    |
| `cubic-bezier()`              | 定义了一个贝塞尔曲线(Cubic Bezier)。                           |
| `conic-gradient()`            | 定义了一个圆锥渐变。                                           |
| `counter()`                   | 设置计数器。                                                   |
| `hsl()`                       | 使用色相、饱和度、亮度来定义颜色。                             |
| `hsla()`                      | 使用色相、饱和度、亮度、透明度来定义颜色。                     |
| `linear-gradient()`           | 创建一个线性渐变的图像                                         |
| `max()`                       | 从一个逗号分隔的表达式列表中选择最大的值作为属性的值。         |
| `min()`                       | 从一个逗号分隔的表达式列表中选择最小的值作为属性的值。         |
| `radial-gradient()`           | 用径向渐变创建图像。                                           |
| `repeating-linear-gradient()` | 用重复的线性渐变创建图像。                                     |
| `repeating-radial-gradient()` | 类似 radial-gradient()，用重复的径向渐变创建图像。             |
| `repeating-conic-gradient()`  | 重复的圆锥渐变。                                               |
| `rgb()`                       | 使用红(R)、绿(G)、蓝(B)三个颜色的叠加来生成各式各样的颜色。    |
| `rgba()`                      | 使用红(R)、绿(G)、蓝(B)、透明度(A)的叠加来生成各式各样的颜色。 |
| `var()`                       | 用于插入自定义的属性值。                                       |
| `repeat()`                    | 表示轨道列表的重复片段。                                       |
| `minmax()`                    | 定义了一个长宽范围的闭区间。                                   |

## 嵌套

### 基本语法

```css
.article {
  color: #333;
  padding: 20px;

  /* 嵌套子元素 */
  & h2 {
    /* 注意：必须有 & */
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  & p {
    line-height: 1.8;
  }

  /* 嵌套伪类、伪元素 */
  &:hover {
    background: #f0f0f0;
  }

  &::before {
    content: '★ ';
    color: gold;
  }
}
```

编译后变成：

```css
.article {
  color: #333;
  padding: 20px;
}
.article h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.article p {
  line-height: 1.8;
}
.article:hover {
  background: #f0f0f0;
}
.article::before {
  content: '★ ';
  color: gold;
}
```

### 关键规则

从 2024 年开始，浏览器支持“隐式父级引用”，可以像 Less 那样直接写：

```css
.article {
  padding: 20px;

  h2 {
    /* 相当于 .article h2 */
    font-size: 2rem;
  }

  .summary {
    color: gray;
  }

  @media (min-width: 768px) {
    padding: 40px; /* 直接嵌套 @media */

    h2 {
      font-size: 2.5rem;
    }
  }
}
```

**不能省略 `&` 的情况**

- 伪类、伪元素
- 父级前面要加东西（比如 .dark .article）
- 组合选择器开头是 `&`

```css
.article {
  &:hover {
  } /* 必须有 & */
  &::after {
  } /* 必须有 & */
  & + & {
  } /* 兄弟相邻必须有 & */
  .dark & {
  } /* 父级加类必须有 & */
}
```

### 嵌套 @规则

`@规则`不能嵌套在普通样式规则（如 `.class { }`）内。`@keyframes` 必须在根级别（style 标签的顶层）定义，或者嵌套在其他 `@规则`里

### 写法示例

```css
.card {
  max-width: 400px;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 12px;

  /* 普通后代（推荐省略 &） */
  h3 {
    font-size: 1.5rem;
  }
  p {
    line-height: 1.7;
  }

  /* 需要 & 的地方才写 */
  &:hover {
    border-color: #0066ff;
  }
  &::before {
    content: '';
    display: block;
  }
}

/* @规则目前大部分都只能写在根下 */
@media (min-width: 640px) {
  padding: 2rem;
  h3 {
    font-size: 1.8rem;
  }
}
```

## @规则

@规则（英文叫 **At-rule**）是 CSS 中以 `@` 符号开头的特殊指令，它不是普通的“选择器 + 声明块”，而是用来给浏览器下“命令”或者定义一些特殊规则。

简单说：  
**普通规则**：`.button { color: red; }` → 给元素设置样式  
**@规则**：`@xxx ...` → 告诉浏览器“请你按照某种条件或方式来处理后面的 CSS

### 常见@规则

2025 年最常用的一共就这 10 个

| @规则            | 作用                                                    | 例子                                                               |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| `@media`         | 媒体查询，根据屏幕大小、暗色模式等切换样式              | `@media (min-width: 768px) { … }`                                  |
| `@supports`      | 特性查询，检测浏览器是否支持某个 CSS 属性               | `@supports (display: grid) { … }`                                  |
| `@import`        | 在 CSS 文件开头引入其他 CSS 文件                        | `@import url("reset.css");`                                        |
| `@font-face`     | 引入自定义字体                                          | `@font-face { font-family: "MyFont"; src: url("my.woff2"); }`      |
| `@keyframes`     | 定义动画关键帧                                          | `@keyframes slide { from { transform: translateX(0); } to { … } }` |
| `@layer`         | 定义 Cascade Layers（层叠层），控制样式优先级           | `@layer base, components, utilities;`                              |
| `@container`     | 容器查询（Container Queries）查询，根据父容器大小写样式 | `@container (min-width: 400px) { … }`                              |
| `@property`      | 定义自定义属性（CSS Houdini）                           | `@property --my-color { syntax: "<color>"; initial-value: red; }`  |
| `@charset`       | 声明 CSS 文件的字符编码（基本没人用了）                 | `@charset "utf-8";`                                                |
| `@counter-style` | 自定义列表计数器样式（极少用）                          | `@counter-style emoji { system: cyclic; symbols: ★ ♥; }`           |

### 重点记住

1. `@media` → 响应式必备
2. `@supports` → 优雅降级必备
3. `@font-face` → 自定义字体
4. `@keyframes` → 动画
5. `@layer` → Tailwind、现代大型项目控制优先级
6. `@container` → 2024-2025 新热点，组件级响应式超级好用
7. `@import` → 一般不推荐（会阻塞渲染），但偶尔用

和 `@layer` 一起用很香
和 CSS 嵌套一起用特别爽的例子

```css
.card {
  padding: 1rem;
  background: white;

  /* 直接嵌套 @media */
  @media (min-width: 640px) {
    padding: 2rem;
  }

  /* 直接嵌套 @container（父容器大于400px时生效） */
  @container (min-width: 400px) {
    padding: 1.5rem;
  }

  /* 直接嵌套 @supports */
  @supports (display: grid) {
    display: grid;
    gap: 1rem;
  }
}
```

总结一句话：  
**@规则 = CSS 里的“指令/命令”**，最常用的就是 `@media`、`@supports`、`@font-face`、`@keyframes`、`@layer`、`@container` 这六个，基本覆盖了现代前端所有高级需求。
