# CSS 变换（Transform）

## 定义

**`transform`** 在**不触发重排（reflow）** 的前提下，对元素进行**二维或三维**的平移、旋转、缩放、 skew 等视觉变换。变换只影响**渲染**，默认不改变文档流占位（除非配合其他属性）。

## 核心概念

| 概念 | 说明 |
| --- | --- |
| **变换函数** | `translate()`、`rotate()`、`scale()`、`skew()` 等 |
| **transform-origin** | 变换原点，默认元素中心 `50% 50%` |
| **变换矩阵** | 浏览器将多函数复合为矩阵；**书写顺序从右到左应用**（先写的后作用） |
| **2D vs 3D** | 3D 需 `perspective` 与 `translateZ` 等才有纵深效果 |
| **transform vs 布局** | `top/left/width` 改布局；`transform` 改合成层上的绘制 |

## 2D 变换函数

| 函数 | 语法 | 说明 |
| --- | --- | --- |
| `translate()` | `translate(tx, ty?)` / `translateX()` / `translateY()` | 平移 |
| `rotate()` | `rotate(angle)` | 顺时针旋转 |
| `scale()` | `scale(sx, sy?)` / `scaleX()` / `scaleY()` | 缩放；负值可镜像 |
| `skew()` | `skew(ax, ay?)` / `skewX()` / `skewY()` | 倾斜 |

| 简写属性 | 说明 |
| --- | --- |
| `transform` | 空格分隔多个函数，如 `transform: translate(-50%, -50%) rotate(45deg)` |
| `transform-origin` | `center` \| `top left` \| `50% 100%` 等 |

## 3D 简述

| 属性 / 函数 | 说明 |
| --- | --- |
| `perspective` | 视距，越小透视越强；可设于父或 `transform: perspective(800px)` |
| `perspective-origin` | 观察者位置 |
| `translate3d()` / `translateZ()` | Z 轴位移 |
| `rotate3d()` / `rotateX()` / `rotateY()` | 3D 旋转 |
| `transform-style: preserve-3d` | 子元素保留 3D 空间（父需非 flat） |
| `backface-visibility: hidden` | 背面不可见，常用于翻转卡片 |

## 示例

```css
/* 绝对居中：50% 定位 + 反向 translate */
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 悬停微交互：只动合成层 */
.card {
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px) scale(1.02);
  transform-origin: center bottom; /* 从底部略抬起 */
}

/* 简单 3D 翻转 */
.flip {
  perspective: 1000px;
}

.flip__inner {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flip.is-flipped .flip__inner {
  transform: rotateY(180deg);
}

.flip__face {
  backface-visibility: hidden;
}
```

## transform vs 布局属性

| 方式 | 是否影响布局 | 是否触发重排 | 典型场景 |
| --- | --- | --- | --- |
| `width` / `height` / `margin` | 是 | 常是 | 结构尺寸 |
| `top` / `left`（定位） | 部分（absolute 脱离流） | 是 | 定位布局 |
| `transform` | 否（占位不变） | 否（通常仅合成） | 动画、微调视觉 |
| `opacity` | 否 | 否 | 淡入淡出 |

> 高性能动画优先 `transform` 与 `opacity`；避免动画 `width`/`top` 引起 layout thrashing。

## 常见陷阱

1. **`transform` 不撑开父级**：子元素 transform 放大可能视觉溢出但被裁切；注意 `overflow`。
2. **百分比 translate**：相对**元素自身**宽高，非父级。
3. **函数顺序敏感**：`rotate(45deg) translateX(100px)` 与 `translateX(100px) rotate(45deg)` 结果不同。
4. **3D 变「平面」**：父未 `preserve-3d` 或缺少 `perspective`，Z 轴效果不明显。
5. **`fixed` + transform 祖先**：fixed 元素会相对该祖先定位，非视口。

## 学习清单

- [ ] 会用 `translate` / `rotate` / `scale` 做常用效果
- [ ] 理解 `transform-origin` 对旋转、缩放的影响
- [ ] 知道 `transform` 不改变流式占位，与 `top/left` 区别
- [ ] 了解 `perspective` 与 `translateZ` 的基本 3D  setup
- [ ] 动画场景优先 transform + opacity
- [ ] 注意多函数书写顺序带来的复合结果

## MDN 参考

- [transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)
- [transform-origin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin)
- [translate()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/translate)
- [rotate()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotate)
- [perspective](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)
- [CSS 变换](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transforms)
