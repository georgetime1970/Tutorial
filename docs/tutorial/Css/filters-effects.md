# CSS 滤镜与视觉效果

## 定义

**滤镜（filter）** 对元素**本身**（含其内容）应用图形效果，如模糊、对比度、灰度。**`backdrop-filter`** 则对元素**背后、透过半透明区域**的内容生效，常用于毛玻璃。**混合模式（mix-blend-mode）** 控制元素与下方内容的像素混合方式。

## 核心概念

| 概念 | 说明 |
| --- | --- |
| **filter** | 作用于元素及子树绘制结果 |
| **backdrop-filter** | 作用于元素后方的 backdrop，常配合半透明背景 |
| **滤镜函数** | 链式组合：`filter: blur(2px) brightness(1.1)` |
| **堆叠与性能** | 大 blur 昂贵；会创建层；移动端谨慎 |
| **与 mask/opacity 区别** | filter 改像素；opacity 改整体 alpha |

## filter 常用函数

| 函数 | 语法示例 | 效果 |
| --- | --- | --- |
| `blur()` | `blur(4px)` | 高斯模糊 |
| `brightness()` | `brightness(1.2)` | 亮度；1 为原图 |
| `contrast()` | `contrast(1.5)` | 对比度 |
| `grayscale()` | `grayscale(100%)` | 灰度 |
| `sepia()` | `sepia(80%)` | 怀旧褐色 |
| `hue-rotate()` | `hue-rotate(90deg)` | 色相旋转 |
| `invert()` | `invert(100%)` | 反色 |
| `saturate()` | `saturate(200%)` | 饱和度 |
| `opacity()` | `opacity(50%)` | 透明度（与 opacity 属性类似） |
| `drop-shadow()` | `drop-shadow(2px 4px 6px #0008)` | 跟随**不透明形状**的阴影 |

> `box-shadow` 按盒矩形投影；`drop-shadow()` 跟随 PNG/SVG 透明轮廓。

## backdrop-filter 与 mix-blend-mode

| 属性 | 说明 | 典型场景 |
| --- | --- | --- |
| `backdrop-filter` | 背景模糊/调色 | 导航栏毛玻璃、模态遮罩 |
| `mix-blend-mode` | 与 backdrop 混合：`multiply` \| `screen` \| `overlay` 等 | 文字叠图、创意排版 |
| `background-blend-mode` | 同一元素多层 background 之间混合 | 纹理叠色 |

## 示例

```css
/* 图片悬停：轻微增强 */
.thumb img {
  transition: filter 0.25s ease;
}

.thumb:hover img {
  filter: brightness(1.05) contrast(1.1);
}

/* 禁用态：降饱和 */
.btn:disabled {
  filter: grayscale(60%) opacity(0.7);
  cursor: not-allowed;
}

/* 毛玻璃顶栏 */
.header {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%); /* Safari */
}

/* drop-shadow 贴图阴影 */
.icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
}

/* 混合模式：标题压图 */
.hero__title {
  mix-blend-mode: overlay;
  color: #fff;
}
```

## filter vs box-shadow vs opacity

| 需求 | 推荐 |
| --- | --- |
| 矩形卡片阴影 | `box-shadow` |
| 不规则图标阴影 | `filter: drop-shadow()` |
| 整元素半透明 | `opacity` 或 `filter: opacity()` |
| 背后内容模糊 | `backdrop-filter`（非 filter） |

## 常见陷阱

1. **`backdrop-filter` 无半透明背景**：看不出效果；需 rgba / hsla 背景。
2. **Safari 前缀**：部分版本仍需 `-webkit-backdrop-filter`。
3. **大半径 blur 性能差**：移动端减小半径或降级为纯色背景。
4. **filter 影响子元素**：整棵子树一起被滤镜；无法只滤父不滤子（需隔离层）。
5. **`overflow: hidden` 与 filter**：可能裁切 drop-shadow 外延；适当 padding 或改 box-shadow。
6. **无障碍对比度**：blur + 半透明降低可读性；检查 WCAG 对比。

## 学习清单

- [ ] 会用常见 `filter` 函数及链式组合
- [ ] 区分 `drop-shadow()` 与 `box-shadow`
- [ ] 会用 `backdrop-filter` 做毛玻璃并设半透明底
- [ ] 了解 `mix-blend-mode` 的基本创意用途
- [ ] 知道滤镜对性能与层叠的影响
- [ ] 在 `prefers-reduced-motion` 或低性能设备考虑降级

## MDN 参考

- [filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
- [滤镜函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function)
- [backdrop-filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter)
- [drop-shadow()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function/drop-shadow)
- [mix-blend-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode)
- [应用 CSS 滤镜](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_filter_effects/Using_filter_effects)
