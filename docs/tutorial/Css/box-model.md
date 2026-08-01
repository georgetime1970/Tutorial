# 盒模型（Box Model）

## 定义

每个 HTML 元素在布局中都被视为一个**矩形盒**，由 **content（内容）→ padding（内边距）→ border（边框）→ margin（外边距）** 由里到外组成。CSS 用盒模型决定元素占据的空间及与其他元素的间距。

## 核心概念

### 盒的四个区域

| 区域   | 属性                               | 说明                           |
| ------ | ---------------------------------- | ------------------------------ |
| 内容区 | `width` / `height`（默认指内容区） | 文本、图片等可见内容           |
| 内边距 | `padding-*`                        | 内容与边框之间的留白           |
| 边框   | `border-*`                         | 包围 padding 的线              |
| 外边距 | `margin-*`                         | 盒与相邻元素之间的间距（透明） |

### `box-sizing`

| 值                    | `width` 含义            | 总宽度计算               |
| --------------------- | ----------------------- | ------------------------ |
| `content-box`（默认） | 仅内容区                | width + padding + border |
| `border-box`          | 内容 + padding + border | 等于 width               |

```css
*,
*::before,
*::after {
  box-sizing: border-box; /* 布局更可预测，现代项目常用 */
}

.card {
  width: 300px;
  padding: 16px;
  border: 2px solid #ccc;
  /* border-box：总宽仍为 300px */
}
```

## 常用属性表

### 尺寸

| 属性                        | 常用值                           | 说明                       |
| --------------------------- | -------------------------------- | -------------------------- |
| `width` / `height`          | 长度、`auto`、`%`、`min-content` | 设定盒宽/高                |
| `min-width` / `max-width`   | 长度、`none`                     | 限制最小/最大宽            |
| `min-height` / `max-height` | 同上                             | 限制最小/最大高            |
| `aspect-ratio`              | `16/9`、`auto`                   | 宽高比（常与替换元素联用） |

### 内边距 / 外边距

| 属性                            | 简写                 | 说明                                        |
| ------------------------------- | -------------------- | ------------------------------------------- |
| `padding-top/right/bottom/left` | `padding: 10px 20px` | 四值：上 右 下 左（顺时针）                 |
| `margin-top/right/bottom/left`  | `margin: 0 auto`     | 水平居中块级：`margin: 0 auto` + 固定 width |

### 溢出

| 属性                        | 值        | 行为                     |
| --------------------------- | --------- | ------------------------ |
| `overflow`                  | `visible` | 默认，内容溢出仍可见     |
|                             | `hidden`  | 裁剪溢出                 |
|                             | `scroll`  | 始终显示滚动条（或预留） |
|                             | `auto`    | 需要时出现滚动条         |
| `overflow-x` / `overflow-y` | 同上      | 单轴控制                 |

## 外边距折叠（Margin Collapse）

**垂直方向**相邻块级盒的外边距可能合并为较大值，而非相加。

| 场景                                    | 结果                         |
| --------------------------------------- | ---------------------------- |
| 兄弟元素 `margin-bottom` + `margin-top` | 取较大值                     |
| 父元素与第一个/最后一个子元素           | 子 margin 可与父 margin 折叠 |
| 空块元素自身上下 margin                 | 可能折叠                     |

```css
section {
  margin-bottom: 30px;
}
section {
  margin-top: 20px;
} /* 相邻 section 间距 30px，非 50px */

/* 防止父顶与子 margin 折叠的常见做法 */
.parent {
  padding-top: 1px; /* 或 border-top / overflow: hidden / flex / grid */
}
```

**水平 margin 不折叠**；Flex/Grid 格式化上下文内垂直折叠行为通常不同。

## 示例

```html
<div class="box">内容</div>
```

```css
.box {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  padding: 12px 16px; /* 上下 12，左右 16 */
  border: 1px solid #333;
  margin: 24px auto; /* 上下 24，水平居中 */
  overflow: auto; /* 内容超出时出现滚动条 */
  background: #f0f0f0;
}
```

## 易错点

1. **默认 `content-box` 导致「加 padding 撑破宽度」** — 全局 `border-box` 或心算总宽。
2. **`width: 100%` + padding** — 在 `content-box` 下会溢出父容器。
3. **百分比 height** — 父元素无明确高度时，`height: 100%` 常无效。
4. **margin 折叠「消失」** — 子元素 `margin-top` 看起来加在父元素外，实为折叠。
5. **`overflow: hidden` 裁切副作用** — 会建立 BFC，可能影响子元素定位与阴影显示。

## 检查清单

- [ ] 能画出 content / padding / border / margin 四层结构？
- [ ] 能解释 `border-box` 与 `content-box` 下 `width: 200px` 的实际占位？
- [ ] 会用 `margin: 0 auto` 水平居中块级元素？
- [ ] 知道垂直 margin 折叠的两种典型场景？
- [ ] 内容溢出时能否选对 `overflow: auto` / `hidden`？

## MDN 参考

- [盒模型介绍](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Box_model)
- [`box-sizing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)
- [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) / [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height)
- [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow)
- [外边距折叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)
