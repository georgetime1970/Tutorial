# SVG

## 定义

**SVG**（Scalable Vector Graphics）是基于 XML 的**矢量**图形格式，可内联在 HTML 中、通过 `<img>` 引用，或嵌入 `<object>`。与位图不同，SVG 由路径、形状、文本等数学描述组成，任意缩放不失真，且 DOM 中的内联 SVG 可用 **CSS** 与 **JavaScript** 直接操控。

## 核心概念

| 概念 | 说明 |
| ---- | ---- |
| **坐标系** | 默认左上角为原点，x 向右、y 向下；单位多为 px，也可用 `%` |
| **viewBox** | `min-x min-y width height`，定义「可见区域」与内部坐标映射 |
| **内联 vs 外部** | 内联可改样式/DOM；`<img src="*.svg">` 仅当静态图，CSS 难穿透 |
| **presentation attributes** | SVG 上的 `fill="red"` 等属性；CSS 同名属性优先级更高 |
| **currentColor** | 继承当前 `color`，便于图标随文字色变化 |

## 嵌入方式对比

| 方式 | 语法 | CSS 可控 | JS/DOM | 适用 |
| ---- | ---- | -------- | ------ | ---- |
| **内联 SVG** | HTML 中直接写 `<svg>...</svg>` | ✅ 完全 | ✅ | 图标、动画、主题色 |
| **`<img>`** | `<img src="icon.svg" alt="">` | ❌（文件内样式除外） | ❌ | 简单静态插图 |
| **`<object>`** | `<object data="chart.svg">` | 部分 | 独立文档 | 复杂交互、备用 HTML |
| **CSS background** | `background-image: url(...)` | ✅ 背景层 | ❌ | 装饰纹理、单色图标（mask） |
| **Data URI** | `url("data:image/svg+xml,...")` | 视嵌入方式 | 视嵌入方式 | 小图标减少请求 |

## 常用 SVG 元素

| 元素 | 主要属性 | 用途 |
| ---- | -------- | ---- |
| `<svg>` | `viewBox`, `width`, `height`, `xmlns` | 根容器 |
| `<path>` | `d`（M/L/C/Z 等命令）, `fill`, `stroke` | 任意形状 |
| `<circle>` | `cx`, `cy`, `r` | 圆 |
| `<rect>` | `x`, `y`, `width`, `height`, `rx` | 矩形/圆角矩形 |
| `<line>` | `x1`, `y1`, `x2`, `y2` | 直线 |
| `<polygon>` | `points` | 封闭多边形 |
| `<text>` | `x`, `y`, `font-size` | 文字（仍可选中） |
| `<g>` | `transform`, `id`, `class` | 分组，统一变换/样式 |
| `<use>` | `href="#id"` | 复用 `<defs>` 中定义 |

## `viewBox` 速查

| 写法 | 含义 |
| ---- | ---- |
| `viewBox="0 0 100 100"` | 从 (0,0) 起，逻辑宽 100、高 100 |
| 省略 `width`/`height` | 由 CSS 或父级决定显示尺寸；`viewBox` 负责比例 |
| `preserveAspectRatio="xMidYMid meet"` | 等比缩放完整显示（默认） |
| `preserveAspectRatio="none"` | 拉伸填满，可能变形 |

## 用 CSS 控制 SVG

内联 SVG 与 HTML 共用 CSS 选择器；外部 SVG 作为 `<img>` 时页面 CSS **无法**选中内部节点。

### 填充与描边

| 属性 | 说明 | 示例 |
| ---- | ---- | ---- |
| `fill` | 内部填充色；`none` 透明 | `fill: #3498db` |
| `fill-opacity` | 填充透明度 | `fill-opacity: 0.5` |
| `stroke` | 描边颜色 | `stroke: currentColor` |
| `stroke-width` | 描边宽度（用户单位） | `stroke-width: 2` |
| `stroke-linecap` | 线端：`butt` \| `round` \| `square` | 图标常用 `round` |
| `stroke-linejoin` | 拐角：`miter` \| `round` \| `bevel` | |
| `stroke-dasharray` | 虚线模式，如 `5 3` | 配合动画做「描边绘制」 |
| `stroke-dashoffset` | 虚线偏移 | 动画从 `总长` 到 `0` |
| `currentColor` | 使用元素继承的 `color` | 按钮图标随文字变色 |

```html
<style>
  /* 图标继承按钮文字色；悬停改 fill */
  .icon-heart {
    color: #e74c3c;
    fill: currentColor;
    stroke: currentColor;
    stroke-width: 1.5;
    transition: fill 0.2s;
  }
  .btn:hover .icon-heart {
    fill: none; /* 悬停变空心 */
  }
</style>

<button class="btn">
  <svg class="icon-heart" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
  收藏
</button>
```

### 背景图与 mask

| 技术 | 用途 |
| ---- | ---- |
| `background-image: url("icon.svg")` | 装饰；改色需 SVG 内用 `currentColor` 或 CSS filter |
| `mask` / `-webkit-mask` | 用 SVG/PNG  alpha 形状裁剪元素，**背景色即图标色** |
| `mask-image: url("data:image/svg+xml,...")` | 内联 data URI，动态改色灵活 |

```css
/* 单色图标：用 mask + background-color，比 filter 更可控 */
.icon-arrow {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-color: currentColor;
  -webkit-mask: url("/icons/arrow.svg") center / contain no-repeat;
  mask: url("/icons/arrow.svg") center / contain no-repeat;
}
```

### 描边路径动画（stroke-dasharray / offset）

```html
<style>
  .draw-line {
    fill: none;
    stroke: #2ecc71;
    stroke-width: 3;
    stroke-linecap: round;
    /* pathLength="100" 可统一不同路径的动画计算 */
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: draw 2s ease forwards;
  }
  @keyframes draw {
    to { stroke-dashoffset: 0; }
  }
</style>

<svg viewBox="0 0 200 60" width="200" height="60" aria-label="勾号动画">
  <path class="draw-line" pathLength="100"
    d="M10 30 L40 50 L90 10" />
</svg>
```

### Data URI 注意点

| 要点 | 说明 |
| ---- | ---- |
| URL 编码 | `#` → `%23`，`"` → `%27` 或改用单引号包裹 |
| 体积 | 适合 <2KB 小图标；复杂 SVG 仍用外部文件 |
| 缓存 | data URI 无法单独缓存；重复图标用 sprite 或内联 `<symbol>` |
| 无障碍 | 装饰性：`aria-hidden="true"`；有意义：`<title>` 或旁文 |

```css
/* 编码后的简单圆点，用作列表 marker */
ul.custom {
  list-style: none;
  padding-left: 1.2em;
}
ul.custom li::before {
  content: "";
  display: inline-block;
  width: 0.5em;
  height: 0.5em;
  margin-right: 0.5em;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Ccircle cx='4' cy='4' r='4' fill='%233498db'/%3E%3C/svg%3E") center/contain no-repeat;
}
```

## 示例：内联图标 + `<use>` 复用

```html
<!-- defs 定义一次，页面多处 use；适合 sprite 模式 -->
<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
  <defs>
    <symbol id="icon-search" viewBox="0 0 24 24">
      <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="15" y1="15" x2="21" y2="21" stroke="currentColor" stroke-width="2"/>
    </symbol>
  </defs>
</svg>

<label>
  搜索
  <svg width="20" height="20" aria-hidden="true">
    <use href="#icon-search"/>
  </svg>
  <input type="search" name="q">
</label>
```

## 常见陷阱

| 问题 | 建议 |
| ---- | ---- |
| `<img src="*.svg">` 无法用 CSS 改内部 `fill` | 改内联 SVG，或用 CSS `mask` / filter |
| 忘记 `xmlns`（XHTML/独立文件） | 独立 `.svg` 文件根元素加 `xmlns="http://www.w3.org/2000/svg"` |
| `viewBox` 与 CSS 宽高比不一致 | 统一比例，或显式 `preserveAspectRatio` |
| 无障碍缺失 | 装饰 `aria-hidden="true"`；信息图加 `<title>`、`role="img"` + `aria-labelledby` |
| 超大内联 SVG 拖慢 HTML | 复杂插图用外部文件或 sprite |
| `stroke-dasharray` 动画不生效 | 确认 `fill:none`、路径长度；可用 `pathLength="100"` 归一化 |

## 延伸阅读（MDN）

- [SVG 教程](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)
- [`<svg>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/svg)
- [`<path>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/path)
- [SVG 作为 CSS 背景](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image)
- [CSS `mask`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask)
- [`stroke-dasharray`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)
