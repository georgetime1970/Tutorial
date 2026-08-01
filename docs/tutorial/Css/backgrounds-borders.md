# 背景与边框

## 定义

**背景（background）** 在 content/padding 区域（默认到 border 外缘）绘制颜色、图像或渐变。**边框（border）** 包围 padding，可设线型、宽度、颜色与圆角；**`box-shadow`** 可在盒外绘制阴影，不参与布局占位。

## 背景属性

| 属性                    | 说明                                         |
| ----------------------- | -------------------------------------------- |
| `background-color`      | 背景色                                       |
| `background-image`      | 图片或渐变 URL / 函数                        |
| `background-repeat`     | `repeat`、`no-repeat`、`repeat-x/y`          |
| `background-position`   | `center`、`top left`、`50% 50%`、`10px 20px` |
| `background-size`       | `cover`、`contain`、宽高或百分比             |
| `background-attachment` | `scroll`、`fixed`、`local`                   |
| `background-origin`     | `padding-box`、`border-box`、`content-box`   |
| `background-clip`       | 背景裁剪到哪个盒（如 `text` 文字裁剪）       |

### `background` 简写

```css
.hero {
  /* color image repeat attachment position/size origin clip */
  background: #1e293b url("/img/hero.jpg") no-repeat center/cover;
}

.card {
  background-color: #fff;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### 渐变简述

| 类型 | 语法                                     |
| ---- | ---------------------------------------- |
| 线性 | `linear-gradient(角度或方向, 色标...)`   |
| 径向 | `radial-gradient(circle at center, ...)` |
| 锥形 | `conic-gradient(from 0deg, red, blue)`   |

```css
.strip {
  background: linear-gradient(to right, #f00, #00f);
}

.spotlight {
  background: radial-gradient(circle at 30% 30%, #fff 0%, #333 70%);
}
```

## 边框属性

| 属性            | 说明                                   |
| --------------- | -------------------------------------- |
| `border-width`  | `thin`、`medium`、`thick` 或长度       |
| `border-style`  | `solid`、`dashed`、`dotted`、`none` 等 |
| `border-color`  | 颜色，可四边不同                       |
| `border-radius` | 圆角，如 `8px`、`50%`（正圆需等宽高）  |
| `border`        | 简写：`width style color`              |

```css
.box {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.pill {
  border-radius: 9999px; /* 胶囊形 */
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%; /* 圆形 */
  border: 2px solid #fff;
}
```

### 单边控制

`border-top`、`border-right-width` 等可单独设置；简写 `border` 会重置四边未写明的子属性。

## `box-shadow`（简述）

| 部分        | 说明               |
| ----------- | ------------------ |
| 偏移 x y    | 必填，阴影位移     |
| 模糊 blur   | 可选，越大越虚     |
| 扩展 spread | 可选，正数放大阴影 |
| 颜色        | 常带 alpha         |
| `inset`     | 内阴影             |

```css
.card {
  box-shadow:
    0 1px 3px rgb(0 0 0 / 0.12),
    0 4px 12px rgb(0 0 0 / 0.08);
}

.button:active {
  box-shadow: inset 0 2px 4px rgb(0 0 0 / 0.2);
}
```

阴影不占布局空间，可能被父级 `overflow: hidden` 裁切。

## 示例：卡片组件

```css
.card {
  background-color: #ffffff;
  background-clip: padding-box;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(15 23 42 / 0.06);
  overflow: hidden; /* 子元素背景不溢出圆角 */
}

.card-header {
  padding: 16px;
  background: linear-gradient(180deg, #f8fafc, #fff);
  border-bottom: 1px solid #e2e8f0;
}
```

## 易错点

1. **`background` 简写顺序** — 错序会导致 `background-size` 解析失败；`position/size` 写在一起如 `center/cover`。
2. **`border: none` vs `0`** — `none` 仍可能有样式表冲突；布局占位用 `border: 0` 或明确 width。
3. **圆角 + 旧浏览器** — 子元素直角背景会「溢出」圆角父盒，需 `overflow: hidden` 或子元素也设 radius。
4. **`cover` 裁切** — 背景图比例与容器不符时会被裁剪，重要内容勿靠边缘。
5. **多重阴影性能** — 大量 blur 阴影影响绘制，移动端宜节制。

## 检查清单

- [ ] 能写出 `background` 简写含 `center/cover`？
- [ ] 能区分 `background-origin` 与 `background-clip`？
- [ ] 会用 `border-radius: 50%` 做圆形头像？
- [ ] 知道 `box-shadow` 不占流式布局空间？
- [ ] 渐变作背景时是否有纯色回退？

## MDN 参考

- [CSS 背景与边框](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_backgrounds_and_borders)
- [`background`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background)
- [使用渐变](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_images/Using_gradients)
- [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border)
- [`border-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius)
- [`box-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow)
