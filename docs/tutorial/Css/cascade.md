# 层叠、继承与优先级

## 定义

**层叠（Cascade）** 是 CSS 解决「多条规则同时作用于同一元素」时的决策机制：浏览器按来源、优先级（specificity）、重要性（importance）和出现顺序，选出最终生效的声明。

**继承（Inheritance）** 指某些属性值从父元素自动传递给子元素；不能继承的属性则使用初始值（initial value）或浏览器默认样式。

## 核心概念

### 1. 样式来源（Origin）

| 来源               | 说明                             | 典型场景                       |
| ------------------ | -------------------------------- | ------------------------------ |
| 用户代理样式（UA） | 浏览器默认样式                   | `h1` 默认字号、`a` 默认颜色    |
| 作者样式（Author） | 页面 CSS（`<link>` / `<style>`） | 站点主题、组件样式             |
| 用户样式（User）   | 用户自定义或辅助功能样式         | 浏览器「强制颜色」、自定义 CSS |

同优先级下，**作者样式通常覆盖 UA 样式**；用户为辅助功能设置的样式在部分场景具有更高优先级。

### 2. 继承 vs 非继承

| 类型         | 常见属性                                                                  | 行为                                           |
| ------------ | ------------------------------------------------------------------------- | ---------------------------------------------- |
| **可继承**   | `color`、`font-*`、`line-height`、`text-align`、`visibility`、`cursor` 等 | 子元素未单独声明时，沿用父元素计算值           |
| **不可继承** | `margin`、`padding`、`border`、`width`、`background`、`display` 等        | 子元素使用自身初始值，不受父元素该属性直接影响 |

> **注意**：`font-size` 可继承，但子元素若用 `em` 会基于**自身**继承到的 `font-size` 计算，容易与预期不符；布局尺寸更推荐 `rem`。

### 3. 优先级（Specificity）

优先级由选择器权重决定，**inline style > ID > class/属性/伪类 > 元素/伪元素**。

| 选择器示例 | 权重（A,B,C,D）              | 简记                               |
| ---------- | ---------------------------- | ---------------------------------- |
| `*`        | 0,0,0,0                      | 最低                               |
| `p`        | 0,0,0,1                      | 1 个类型                           |
| `.title`   | 0,0,1,0                      | 1 个类                             |
| `#main`    | 0,1,0,0                      | 1 个 ID                            |
| `style=""` | 1,0,0,0                      | 行内最高（除 `!important` 比较链） |
| `:not(.x)` | 不计 `:not` 本身，只计括号内 | 见 MDN 细则                        |

**比较规则**：从左到右比较 A→B→C→D；相等则看**源顺序**（后写的覆盖先写的）。

### 4. `!important`

在声明末尾加 `!important` 可提升该条声明在层叠中的权重。

```css
.button {
  color: blue; /* 普通声明 */
}

.button.primary {
  color: red !important; /* 同属性下优先于无 !important 的声明 */
}
```

**层叠顺序（简化）**：Origin 与 importance 组合后，再比 specificity，最后比 source order。详见 MDN「层叠」章节。

### 5. 源顺序（Source Order）

优先级相同时，**后加载 / 后书写** 的规则生效。

```css
/* 文件靠后的规则覆盖靠前的 */
.card {
  background: white;
}
.card {
  background: #f5f5f5;
} /* 生效 */
```

## 常用关键字

| 值        | 作用                                           |
| --------- | ---------------------------------------------- |
| `inherit` | 显式继承父元素该属性的**计算值**               |
| `initial` | 使用该属性的规范初始值（不一定等于浏览器默认） |
| `unset`   | 可继承属性等价 `inherit`，否则等价 `initial`   |
| `revert`  | 回退到 UA 或用户样式（依属性而定）             |

```css
blockquote {
  color: inherit; /* 强制与父元素文字色一致 */
  margin: unset; /* margin 不可继承 → 回到 initial */
}
```

## 常见可继承属性速查

| 类别 | 属性                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------- |
| 文本 | `color`、`text-align`、`text-indent`、`text-transform`、`letter-spacing`、`word-spacing`、`white-space` |
| 字体 | `font-family`、`font-size`、`font-weight`、`font-style`、`font-variant`、`line-height`                  |
| 列表 | `list-style`、`list-style-type`、`list-style-position`                                                  |
| 其他 | `visibility`、`cursor`、`direction`                                                                     |

## 示例

```html
<article class="post">
  <p>段落文字</p>
</article>
```

```css
.post {
  color: #333; /* 可继承 → p 也会是 #333 */
  font-size: 18px;
  padding: 16px; /* 不可继承 → 只作用于 article */
}

.post p {
  font-size: 1rem; /* 基于根元素，避免 em 嵌套放大 */
}

#sidebar .post p {
  color: #0066cc; /*  specificity 高于 .post p */
}
```

## 易错点

1. **误以为所有属性都会继承** — `border`、`background` 等不会；子元素「看起来一样」往往是 UA 默认或全局重置。
2. **滥用 ID 选择器** — 权重过高，后续难以覆盖；组件样式优先用 class。
3. **滥用 `!important`** — 破坏层叠可预测性；应优先调整选择器结构与顺序。
4. **忽略 `@layer` 与加载顺序** — 外链 CSS 在 HTML 中的顺序、以及 `@import` 会改变最终生效规则。
5. **`inherit` 与 `currentColor`** — `color: inherit` 继承父色；`border-color: currentColor` 使用当前 `color` 计算值，语义不同。

## 检查清单

- [ ] 能否说出 UA / 作者 / 用户 三类来源的大致优先级？
- [ ] 能否判断某属性是否继承（查 MDN 属性页「Inherited」字段）？
- [ ] 能否计算 `.nav li.active a` 与 `#nav a` 的 specificity？
- [ ] 修改样式无效时，是否先查 DevTools「Computed」里被哪条规则覆盖？
- [ ] 是否避免用 `!important` 解决优先级问题（除非覆盖第三方库）？

## MDN 参考

- [层叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Cascade)
- [继承](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Inheritance)
- [优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)
- [`!important`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/important)
- [`@layer`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@layer)
