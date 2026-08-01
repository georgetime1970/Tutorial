# CSS 响应式设计

## 定义

**响应式 Web 设计（Responsive Web Design）** 让页面在不同视口、设备与容器尺寸下**可读、可用、布局合理**。核心手段：流式布局、弹性媒体、**媒体查询**与 increasingly **容器查询**，配合相对单位而非固定像素。

## 核心概念

| 概念 | 说明 |
| --- | --- |
| **移动优先（mobile-first）** | 默认小屏样式，用 `min-width` 媒体查询逐级增强 |
| **断点（breakpoint）** | 布局切换的宽度阈值；应基于**内容**而非设备型号 |
| **媒体查询（@media）** | 按视口、分辨率、方向等条件应用样式 |
| **容器查询（@container）** | 按**父容器**尺寸而非整个视口应用样式 |
| **流式单位** | `%`、`vw/vh`、`rem`、`clamp()` 等随环境缩放 |

## 媒体查询 @media

| 特性 | 语法示例 | 说明 |
| --- | --- | --- |
| 最小宽度 | `@media (min-width: 768px) { }` | 视口 ≥ 768px 生效 |
| 最大宽度 | `@media (max-width: 767px) { }` | 视口 ≤ 767px |
| 范围 | `@media (768px <= width <= 1024px) { }` | 现代范围语法 |
| 方向 | `@media (orientation: landscape) { }` | 横屏 / 竖屏 |
| 偏好 | `@media (prefers-reduced-motion: reduce) { }` | 无障碍：减少动效 |
| 逻辑组合 | `@media (min-width: 768px) and (prefers-color-scheme: dark)` | `and` / `not` / `,` |

### 常见断点模式（参考，非标准）

| 名称 | 大致范围 | 典型调整 |
| --- | --- | --- |
| 小屏 | `< 576px` | 单列、全宽按钮 |
| 中屏 | `576px – 768px` | 略增间距 |
| 平板 | `768px – 992px` | 双列、侧栏可折叠 |
| 桌面 | `≥ 992px` | 多列、固定侧栏 |
| 大屏 | `≥ 1200px` | 限制 `max-width` 居中 |

> 断点应来自设计/content 破裂点，上表仅为常见起点。

## 容器查询 @container 基础

| 步骤 | 代码 | 说明 |
| --- | --- | --- |
| 1. 声明容器 | `container-type: inline-size;` | 监听**行内尺寸**（宽度） |
| 2. 命名（可选） | `container-name: card;` | 多容器时区分 |
| 3. 查询 | `@container (min-width: 400px) { }` | 容器宽 ≥ 400px |
| 4. 命名查询 | `@container card (min-width: 400px) { }` | 指定容器 |

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: grid;
  gap: 12px;
}

/* 卡片容器够宽时改为横向布局 */
@container card (min-width: 480px) {
  .card {
    grid-template-columns: 120px 1fr;
  }
}
```

## 流式单位技巧

| 单位 / 函数 | 用途 |
| --- | --- |
| `rem` | 相对根字号，统一缩放 typography |
| `%` | 相对父元素对应维度 |
| `vw` / `vh` | 相对视口；注意移动端地址栏导致 vh 跳动，可用 `dvh` |
| `clamp(min, preferred, max)` | 流体字号/间距：`font-size: clamp(1rem, 2vw + 0.5rem, 1.25rem)` |
| `min()` / `max()` | 上限或下限约束宽度 |

## 移动优先示例

```css
/* 默认：小屏单列 */
.layout {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

.sidebar {
  order: 2; /* 小屏主内容优先 */
}

/* 平板及以上：双列 */
@media (min-width: 768px) {
  .layout {
    grid-template-columns: 240px 1fr;
    padding: 1.5rem;
  }

  .sidebar {
    order: 0;
  }
}

/* 减少动效偏好 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 常见陷阱

1. **设备宽度断点硬编码**：iPad Pro 与笔记本宽度重叠；按内容定断点。
2. **只测一种浏览器宽度**：地址栏、滚动条、分屏会改变可用宽度。
3. **容器查询忘记 `container-type`**：无类型则 `@container` 不生效。
4. **`100vw` 含滚动条**：可能水平溢出；常用 `width: 100%` 或 `100dvw`。
5. **媒体查询与容器查询混用职责不清**：页面级用 `@media`，组件级自适应用 `@container`。

## 学习清单

- [ ] 能写移动优先的 `min-width` 媒体查询
- [ ] 知道 `@media` 常见特性：width、orientation、prefers-reduced-motion
- [ ] 会为组件设 `container-type` 并写 `@container` 规则
- [ ] 会用 `clamp()` 做流体字号或间距
- [ ] 理解断点应基于内容而非设备列表
- [ ] 知道 `rem` 与 `%` 的参照差异

## MDN 参考

- [响应式设计](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)
- [@media](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media)
- [使用媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries/Using_media_queries)
- [CSS 容器查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_containment/Container_queries)
- [clamp()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clamp)
- [length 单位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length)
