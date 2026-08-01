# 替换元素与媒体呈现

## 定义

**替换元素（Replaced Element）** 的内容不由 CSS 直接生成，而由外部资源或内置默认替换（如 `<img>` 的图像、`<video>` 的帧、`<iframe>` 的文档）。尺寸常由 **`width`/`height`**、**`object-fit`**、**`aspect-ratio`** 与 **`clip-path`** 共同控制呈现方式。

## 常见替换元素

| 元素                    | 外部内容       | 默认 display（多数浏览器）         |
| ----------------------- | -------------- | ---------------------------------- |
| `<img>`                 | 图像文件       | `inline`（表现为 replaced inline） |
| `<video>` / `<audio>`   | 媒体流         | `inline`                           |
| `<iframe>`              | 嵌入文档       | `inline`                           |
| `<embed>` / `<object>`  | 插件或外部对象 | `inline`                           |
| `<input type="image">`  | 按钮图像       | `inline-block`                     |
| `<svg>`（作替换使用时） | 矢量图形       | `inline`                           |

非替换元素（如 `<div>`、`<span>`）内容来自子节点与 CSS 生成内容；替换元素有 **intrinsic（固有）宽高比** 与尺寸。

## `object-fit` 与 `object-position`

在设定 **`width`/`height`**（或容器约束）后，控制**替换内容**如何填入盒内。

| `object-fit` | 行为                         |
| ------------ | ---------------------------- |
| `fill`       | 拉伸填满（可能变形）         |
| `contain`    | 完整显示，留空白             |
| `cover`      | 覆盖整个盒，可能裁切         |
| `none`       | 原始尺寸，不缩放             |
| `scale-down` | `none` 与 `contain` 中较小者 |

| `object-position`     | 说明         |
| --------------------- | ------------ |
| `center`（默认）      | 对齐中心     |
| `top left`、`50% 20%` | 裁切时的锚点 |

```css
.thumb {
  width: 200px;
  height: 150px;
  object-fit: cover; /* 类似 background-size: cover */
  object-position: center top; /* 裁切时保留顶部 */
}

.logo {
  width: 120px;
  height: 40px;
  object-fit: contain; /* 完整显示 logo */
}
```

## `aspect-ratio`

在只设宽或只设高时维持宽高比，减少布局偏移（CLS）。

| 写法                   | 说明               |
| ---------------------- | ------------------ |
| `aspect-ratio: 16 / 9` | 宽:高              |
| `aspect-ratio: 1`      | 正方形             |
| `auto`                 | 由其他尺寸规则决定 |

```css
.video-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}

.video-wrap iframe,
.video-wrap video {
  width: 100%;
  height: 100%;
  border: 0;
}
```

与 `width`/`height`/`min-height` 冲突时，浏览器按规范优先级解析；嵌入响应式布局时常配合 `max-width: 100%`。

## `clip-path` 常见形状

裁剪元素的**可见区域**（含替换内容），不改变布局盒（仍占原空间，除非配合其他属性）。

| 函数        | 示例                                  |
| ----------- | ------------------------------------- |
| `inset()`   | `inset(10% 20% 10% 20% round 8px)`    |
| `circle()`  | `circle(50% at 50% 50%)`              |
| `ellipse()` | `ellipse(40% 50% at 50% 50%)`         |
| `polygon()` | `polygon(50% 0%, 100% 100%, 0% 100%)` |

```css
.avatar-img {
  width: 96px;
  height: 96px;
  object-fit: cover;
  clip-path: circle(50% at 50% 50%); /* 圆形裁剪 */
}

.banner {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); /* 斜切底边 */
}
```

SVG 路径也可作 `clip-path: url(#clipId)`；动画 `clip-path` 需注意性能。

## 示例：响应式图片

```html
<figure class="media">
  <img src="photo.jpg" alt="描述" width="800" height="600" />
</figure>
```

```css
.media {
  max-width: 640px;
  margin-inline: auto;
}

.media img {
  display: block; /* 去除 inline 底部空隙 */
  width: 100%;
  height: auto; /* 保持固有宽高比 */
  aspect-ratio: 4 / 3; /* HTML width/height 可防 CLS */
  object-fit: cover;
  border-radius: 8px;
}
```

HTML **`width`/`height` 属性** 提供宽高比提示，CSS 加载前即可预留空间。

## 易错点

1. **`img` 默认 inline 底缝** — 设 `display: block` 或 `vertical-align: bottom` 消除行高空隙。
2. **只设 `height: auto` 不设宽度** — 大图可能撑破容器；加 `max-width: 100%`。
3. **`object-fit` 无明确盒尺寸无效** — 需给替换元素或容器明确宽高。
4. **`clip-path` 不缩小布局** — 裁切部分仍占位；要改占位需改 width/height 或 `overflow`。
5. **`iframe` 无障碍** — 需 `title`；固定 `aspect-ratio` 避免加载后跳动。

## 检查清单

- [ ] 能说出 img/video/iframe 属于替换元素？
- [ ] 缩略图裁切会用 `object-fit: cover` + `object-position`？
- [ ] 响应式图片是否 `max-width: 100%` + `height: auto`？
- [ ] 是否用 HTML `width`/`height` 或 `aspect-ratio` 防 CLS？
- [ ] 圆形头像能否用 `border-radius: 50%` 或 `clip-path: circle()`？

## MDN 参考

- [替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)
- [`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)
- [`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position)
- [`aspect-ratio`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/aspect-ratio)
- [`clip-path`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)
- [响应式图像](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/HTML_images#响应式图像)
