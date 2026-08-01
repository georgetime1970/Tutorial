# 值、单位与自定义属性

## 定义

CSS **值（value）** 是属性的具体设定；**单位（unit）** 表示长度的绝对或相对度量。现代 CSS 还提供 **自定义属性（Custom Properties，常称 CSS 变量）** 在运行时传递可继承、可级联的主题数据。

## 长度单位

### 绝对单位

| 单位                   | 说明                                     | 典型用途             |
| ---------------------- | ---------------------------------------- | -------------------- |
| `px`                   | 像素，屏幕上的 1 设备像素（或 CSS 像素） | 边框、阴影、固定图标 |
| `pt`、`cm`、`mm`、`in` | 物理/印刷单位                            | 打印样式             |

### 相对单位

| 单位                  | 相对基准                         | 说明                              |
| --------------------- | -------------------------------- | --------------------------------- |
| `%`                   | 父元素对应属性                   | 如 `width: 50%` 相对父 content 宽 |
| `em`                  | **当前元素** `font-size`         | 嵌套时复合放大                    |
| `rem`                 | **根元素** `html` 的 `font-size` | 全站统一缩放，推荐                |
| `vw` / `vh`           | 视口宽/高的 1%                   | `100vw` = 视口全宽                |
| `dvh` / `svh` / `lvh` | 动态/小/大视口高度               | 移动端地址栏伸缩时更稳定          |
| `ch`                  | 数字 `0` 字符宽度                | 等宽输入框、代码块宽度            |
| `ex`                  | 小写 `x` 高度                    | 较少用                            |

```css
html {
  font-size: 16px;
} /* rem 基准 */
body {
  font-size: 1rem;
} /* 16px */
.card-title {
  font-size: 1.25rem;
} /* 20px */
.hero {
  min-height: 100dvh;
} /* 移动端视口高度 */
.input-code {
  width: 40ch;
} /* 约 40 个字符宽 */
```

## 计算函数

| 函数                    | 作用             | 示例                                  |
| ----------------------- | ---------------- | ------------------------------------- |
| `calc()`                | 四则运算混合单位 | `width: calc(100% - 2rem)`            |
| `min()`                 | 取最小           | `width: min(100%, 720px)`             |
| `max()`                 | 取最大           | `font-size: max(1rem, 2.5vw)`         |
| `clamp(min, pref, max)` | 限制在区间内     | `font-size: clamp(1rem, 2vw, 1.5rem)` |

```css
.sidebar {
  width: clamp(240px, 30vw, 360px);
  padding: calc(1rem + 4px);
}

.container {
  max-width: min(100% - 32px, 1200px);
  margin-inline: auto;
}
```

**注意**：`calc()` 中 `+`、`-` 两侧建议加空格；`*`、`/` 操作数至少一侧为数字。

## CSS 自定义属性

### 定义与使用

| 语法                    | 说明                           |
| ----------------------- | ------------------------------ |
| `--name: value;`        | 声明变量（名必须以 `--` 开头） |
| `var(--name)`           | 读取变量                       |
| `var(--name, fallback)` | 未定义时使用回退值             |
| `:root`                 | 文档根，常放全局主题 token     |

```css
:root {
  --color-primary: #2563eb;
  --space-md: 1rem;
  --radius: 8px;
}

.button {
  background: var(--color-primary);
  padding: var(--space-md);
  border-radius: var(--radius);
}

.card {
  /* 局部覆盖，子元素可继承 */
  --color-primary: #059669;
}
```

### 与预处理器变量对比

| 特性        | CSS 变量                    | Sass/Less 变量 |
| ----------- | --------------------------- | -------------- |
| 运行时      | 浏览器实时计算              | 编译期替换     |
| 继承 / 级叠 | 支持                        | 不支持         |
| DOM 修改    | JS 可改 `style.setProperty` | 需重新编译     |

```javascript
// 运行时切换主题
document.documentElement.style.setProperty("--color-primary", "#dc2626");
```

## 变量不能做的事

1. **不能作为选择器名或属性名** — 只能用于属性值（及部分 `@property` 场景）。
2. **不能用于 `@media` 查询条件** — 媒体查询在变量解析前求值；需用原生 `env()` 或 JS。
3. **不能参与所有语法位置** — 如 `@import` URL、某些 at-rule 关键字。
4. **继承的是计算值链** — 子元素改 `--token` 只影响其 subtree，不是全局常量。
5. **无类型** — 全是字符串；写错单位要到使用时才暴露（可用 `@property` 约束）。

## 易错点

1. **`em` 嵌套放大** — 多层 `font-size: 1.2em` 指数增长；标题层级用 `rem`。
2. **`100vw` 横向滚动条** — 含滚动条宽度时可能略超 100%，配合 `overflow-x` 或 `100dvw` 注意兼容。
3. **`%` 高度依赖父高** — 父无高度则百分比无效。
4. **变量名大小写敏感** — `--Color` 与 `--color` 不同。
5. **`var()` 回退值不含逗号运算** — 复杂回退需嵌套 `var()`。

## 检查清单

- [ ] 能说明 `rem` 与 `em` 的基准差异？
- [ ] 会用 `clamp()` 做流式字号或宽度？
- [ ] 会在 `:root` 定义 token 并在组件内局部覆盖？
- [ ] 知道 CSS 变量与 Sass 变量的根本区别？
- [ ] 知道为何 `@media (min-width: var(--bp))` 无效？

## MDN 参考

- [CSS 值与单位](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Values_and_units)
- [`calc()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc)
- [`clamp()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clamp)
- [使用自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)
- [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)
- [`dvh`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length#dvh)
