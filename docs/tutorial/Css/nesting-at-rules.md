# CSS 嵌套与 @ 规则

## 定义

**CSS 嵌套**允许在规则块内写**子选择器**与**父引用 `&`**，结构更接近 HTML，减少重复前缀。**@ 规则**以 `@` 开头，用于导入、条件、层叠顺序、动画、字体等横切 concern。

## CSS 嵌套语法

| 写法 | 说明 |
| --- | --- |
| `父 { 子 { } }` | 等价 `.父 子`（后代） |
| `&` | 引用**当前选择器**；可拼接伪类、修饰符 |
| `& .child` | 显式后代 |
| `&.active` | 同级类组合：`.card.active` |
| `&:hover` | 伪类挂到父选择器 |
| `& > .direct` | 子代 |

```css
.card {
  padding: 1rem;
  border-radius: 8px;

  /* 等价 .card__title */
  .card__title {
    font-weight: 600;
  }

  /* 等价 .card:hover */
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* 等价 .card.is-featured */
  &.is-featured {
    border: 2px solid #2563eb;
  }
}
```

> 嵌套需现代浏览器或构建工具（PostCSS 等）支持；纯 CSS Nesting 已广泛可用。

## 常见 @ 规则清单

| @ 规则 | 用途 | 简短示例 |
| --- | --- | --- |
| `@import` | 导入其它样式表 | `@import url("theme.css") layer(theme);` |
| `@media` | 媒体/特性条件 | `@media (min-width: 768px) { .nav { display: flex; } }` |
| `@supports` | 特性检测 | `@supports (display: grid) { .layout { display: grid; } }` |
| `@layer` | 声明/归入层叠层 | `@layer reset, base, components;` |
| `@keyframes` | 动画关键帧 | `@keyframes fade { to { opacity: 0; } }` |
| `@font-face` | 自定义 Web 字体 | 见下 |
| `@container` | 容器查询 | `@container (min-width: 400px) { .card { flex-direction: row; } }` |

### @import

```css
/* 建议放文件最前；可指定 layer */
@import url("./variables.css") layer(tokens);
@import url("./print.css") print;
```

### @media（嵌套内）

```css
.sidebar {
  display: none;

  @media (min-width: 992px) {
    display: block;
    width: 240px;
  }
}
```

### @supports

```css
@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
  .glass {
    backdrop-filter: blur(10px);
  }
}

@supports not (display: grid) {
  .layout {
    display: flex; /* 降级 */
  }
}
```

### @layer

```css
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
}

@layer components {
  .btn { padding: 0.5rem 1rem; }
}

/* 未分层规则优先级高于 @layer 内同特异性规则 */
```

### @keyframes

```css
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.drawer {
  animation: slide-in 0.3s ease-out;
}
```

### @font-face

```css
@font-face {
  font-family: "App Sans";
  src:
    url("/fonts/app-sans.woff2") format("woff2"),
    url("/fonts/app-sans.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* 避免长时间 invisible text */
}

body {
  font-family: "App Sans", system-ui, sans-serif;
}
```

### @container

```css
.widget {
  container-type: inline-size;
}

@container (min-width: 320px) {
  .widget__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

## 嵌套 + @ 规则组合示例

```css
.alert {
  padding: 12px 16px;
  border-radius: 6px;

  &--error {
    background: #fef2f2;
    color: #991b1b;
  }

  @media (prefers-color-scheme: dark) {
    &--error {
      background: #450a0a;
      color: #fecaca;
    }
  }

  @supports (color: oklch(0.7 0.1 30)) {
    &--error {
      color: oklch(0.55 0.15 25);
    }
  }
}
```

## 常见陷阱

1. **嵌套过深**：特异性暴涨、难覆盖；一般 ≤ 3 层，组件内用 BEM + 浅嵌套。
2. **`&` 省略导致意外后代**：`.a { .b { } }` 是 `.a .b` 非 `.a.b`；并列类必须 `&.b`。
3. **`@import` 阻塞**：过多串行 import 延迟首屏； bundler 合并或 `<link>` 并行更优。
4. **`@layer` 顺序**：后声明的 layer 在同特异性下赢；未入 layer 的规则往往更强。
5. **`@supports` 不是 polyfill**：仅切换样式，不提供 API 垫片。
6. **`@font-face` 路径与 CORS**：跨域字体需正确 `Access-Control-Allow-Origin`。

## 学习清单

- [ ] 会用 `&` 写伪类、修饰符与 BEM 块元素
- [ ] 能写 `@media`、`@supports`、`@container` 条件块
- [ ] 会用 `@layer` 组织 reset / components 优先级
- [ ] 会定义 `@font-face` 与 `font-display`
- [ ] 会用 `@keyframes` 配合 `animation`
- [ ] 理解 `@import` 位置与 layer 参数
- [ ] 避免过深嵌套导致特异性问题

## MDN 参考

- [CSS 嵌套](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_nesting)
- [@import](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import)
- [@media](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media)
- [@supports](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports)
- [@layer](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@layer)
- [@keyframes](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)
- [@font-face](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)
- [@container](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@container)
