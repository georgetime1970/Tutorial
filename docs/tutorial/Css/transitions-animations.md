# CSS 过渡与动画

## 定义

- **过渡（Transition）**：属性值**变化时**在两端状态间平滑插值，需触发（如 `:hover`、类名切换）。
- **动画（Animation）**：用 **`@keyframes`** 定义关键帧，由 **`animation-*`** 属性驱动，可循环、反向、暂停，无需持续的状态变化触发。

## 核心概念

| 概念 | Transition | Animation |
| --- | --- | --- |
| 定义方式 | 指定**哪些属性**过渡 | `@keyframes` 定义中间帧 |
| 触发 | 属性值改变 | 应用 `animation-name` 即运行 |
| 循环 | 无（一次） | `animation-iteration-count` |
| 复杂度 | 简单 A→B | 多关键帧、复杂时间轴 |
| 性能 | 宜 animate transform/opacity | 同上 |

## Transition 属性

| 属性 | 说明 | 示例 |
| --- | --- | --- |
| `transition-property` | 参与过渡的属性 | `opacity, transform` |
| `transition-duration` | 时长 | `0.3s` |
| `transition-timing-function` | 缓动曲线 | `ease`, `cubic-bezier()` |
| `transition-delay` | 延迟 | `0.1s` |
| `transition` | 简写 | `opacity 0.3s ease, transform 0.3s` |

### 常用 timing-function

| 值 | 说明 |
| --- | --- |
| `ease` | 慢—快—慢（默认） |
| `linear` | 匀速 |
| `ease-in` / `ease-out` / `ease-in-out` | 加速 / 减速 / 两端缓 |
| `cubic-bezier(x1,y1,x2,y2)` | 自定义贝塞尔 |
| `steps(n, start\|end)` | 分步，适合逐帧 |

## Animation 属性

| 属性 | 说明 |
| --- | --- |
| `@keyframes name { }` | 定义 0%–100% 或 `from`/`to` 关键帧 |
| `animation-name` | 绑定的 keyframes 名 |
| `animation-duration` | 一轮时长 |
| `animation-timing-function` | 帧间缓动 |
| `animation-delay` | 开始前延迟 |
| `animation-iteration-count` | 次数或 `infinite` |
| `animation-direction` | `normal` \| `reverse` \| `alternate` |
| `animation-fill-mode` | 前后是否保持关键帧样式：`none` \| `forwards` \| `backwards` \| `both` |
| `animation-play-state` | `running` \| `paused` |
| `animation` | 简写 |

## 示例

```css
/* 过渡：按钮悬停 */
.btn {
  background: #2563eb;
  transform: translateY(0);
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

/* 动画：加载指示 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* 入场：只保留结束状态 */
@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.toast {
  animation: fade-up 0.4s ease-out both; /* both = 结束后保持 100% 帧 */
}
```

## 何时用 Transition vs Animation

| 场景 | 推荐 |
| --- | --- |
| hover/focus 颜色、阴影、位移 | **Transition** |
| 模态淡入、一次入场 | 两者皆可；复杂用 **Animation** |
| 加载圈、骨架屏脉冲 | **Animation** + `infinite` |
| 需暂停、反向、多段节奏 | **Animation** |
| 仅响应用户触发的简单变化 | **Transition**（代码更少） |

## 常见陷阱

1. **`transition: all`**：意外过渡 layout 属性导致卡顿；显式列出属性。
2. **不可过渡属性**：如 `display`；可用 `opacity` + `visibility` 或 `grid-template-rows` 等技巧替代。
3. **animation 结束跳回**：未设 `fill-mode: forwards/both` 时回到元素原样式。
4. **无 prefers-reduced-motion**：应对 `@media (prefers-reduced-motion: reduce)` 关闭或缩短动效。
5. **同时改 layout 与 transform**：优先只动画 transform/opacity 保 60fps。

## 学习清单

- [ ] 会写 `transition` 四要素及简写
- [ ] 会用 `@keyframes` 与 `animation` 简写
- [ ] 理解 `animation-fill-mode` 与 `iteration-count`
- [ ] 能选择 transition 或 animation 的适用场景
- [ ] 知道应对 `prefers-reduced-motion`
- [ ] 优先对 transform/opacity 做动效

## MDN 参考

- [CSS 过渡](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)
- [transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)
- [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)
- [CSS 动画](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animations/Using_CSS_animations)
- [@keyframes](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)
- [animation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)
