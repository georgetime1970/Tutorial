# CSS 选择器

## 定义

**选择器（Selector）** 用于匹配文档树中的元素，以便附加样式规则。选择器类型与组合方式共同决定**匹配范围**和**优先级权重**。

## 基本选择器

| 选择器 | 语法       | 说明                           | 权重    |
| ------ | ---------- | ------------------------------ | ------- |
| 通配   | `*`        | 匹配任意元素                   | 0,0,0,0 |
| 类型   | `div`、`p` | 匹配标签名                     | 0,0,0,1 |
| 类     | `.btn`     | 匹配 `class` 含该值的元素      | 0,0,1,0 |
| ID     | `#header`  | 匹配 `id` 属性（文档内应唯一） | 0,1,0,0 |

```css
* {
  box-sizing: border-box;
} /* 全局盒模型 */
p {
  line-height: 1.6;
} /* 所有段落 */
.btn {
  padding: 8px 16px;
} /* 所有带 btn 类的元素 */
#header {
  position: sticky;
} /* id 为 header 的元素 */
```

## 组合器（Combinators）

| 组合器   | 语法    | 匹配关系                  |
| -------- | ------- | ------------------------- |
| 后代     | `A B`   | A 内部任意层级的 B        |
| 子代     | `A > B` | A 的直接子元素 B          |
| 相邻兄弟 | `A + B` | 紧接在 A 后的第一个兄弟 B |
| 通用兄弟 | `A ~ B` | A 之后所有同级 B          |

```css
nav a {
  text-decoration: none;
} /* nav 内所有链接 */
ul > li {
  list-style: none;
} /* 仅直接 li 子项 */
h2 + p {
  margin-top: 0;
} /* 紧跟 h2 的第一段 */
h2 ~ p {
  color: #666;
} /* h2 后所有同级 p */
```

**并集**：`A, B` 同时匹配 A 与 B（各自独立计算优先级）。

## 属性选择器

| 语法             | 含义                        |
| ---------------- | --------------------------- |
| `[attr]`         | 存在 `attr` 属性            |
| `[attr="val"]`   | 属性值完全等于              |
| `[attr~="val"]`  | 空格分隔列表中含 `val`      |
| `[attr\|="val"]` | 等于 `val` 或以 `val-` 开头 |
| `[attr^="val"]`  | 以 `val` 开头               |
| `[attr$="val"]`  | 以 `val` 结尾               |
| `[attr*="val"]`  | 包含子串 `val`              |

```css
input[type="email"] {
  border-color: blue;
}
a[href^="https"]::after {
  content: " ↗";
} /* 外链提示 */
[class*="col-"] {
  float: left;
} /* 类名含 col- */
```

## 伪类（Pseudo-classes）

伪类表示元素的**状态或结构位置**，用单冒号 `:`。

### 动态伪类

| 伪类                        | 场景                    |
| --------------------------- | ----------------------- |
| `:link`                     | 未访问的超链接          |
| `:visited`                  | 已访问的超链接          |
| `:hover`                    | 指针悬停                |
| `:active`                   | 激活（如鼠标按下）      |
| `:focus` / `:focus-visible` | 获得焦点 / 键盘可见焦点 |

链接样式建议顺序 **LVHA**：`:link` → `:visited` → `:hover` → `:active`。

### 结构伪类

| 伪类                               | 说明                                 |
| ---------------------------------- | ------------------------------------ |
| `:first-child` / `:last-child`     | 父元素下第一个 / 最后一个子元素      |
| `:nth-child(n)`                    | 第 n 个子元素（支持 `2n+1`、`even`） |
| `:first-of-type` / `:last-of-type` | 同标签兄弟中第一个 / 最后一个        |
| `:nth-of-type(n)`                  | 同标签兄弟中第 n 个                  |
| `:only-child` / `:empty`           | 唯一子元素 / 无子节点（含文本）      |

```css
tr:nth-child(even) {
  background: #f9f9f9;
}
li:first-of-type {
  font-weight: bold;
}
p:empty {
  display: none;
}
```

### UI / 表单伪类

| 伪类                      | 说明                  |
| ------------------------- | --------------------- |
| `:checked`                | 选中的 radio/checkbox |
| `:disabled` / `:enabled`  | 禁用 / 可用表单控件   |
| `:required` / `:optional` | 必填 / 非必填         |
| `:invalid` / `:valid`     | 校验失败 / 通过       |

```css
input:invalid {
  border-color: red;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 逻辑类伪类

| 伪类           | 说明               | 优先级特点           |
| -------------- | ------------------ | -------------------- |
| `:not(选择器)` | 排除匹配项         | 权重来自括号内选择器 |
| `:is(A, B, C)` | 匹配任一           | 取列表中**最高**权重 |
| `:where(A, B)` | 同 `:is`           | 权重恒为 **0**       |
| `:has(选择器)` | 父元素：含匹配后代 | 相对较新，注意兼容性 |

```css
/* 除 .no-style 外所有 li */
li:not(.no-style) {
  padding: 4px 0;
}

/* 等价写法，:where 不增加权重 */
:where(h1, h2, h3) {
  margin-block: 1em;
}

/* 含图片的 figure 加边框 */
figure:has(img) {
  border: 1px solid #ddd;
}
```

## 伪元素（Pseudo-elements）

用双冒号 `::` 选中元素的**特定部分**（规范允许单冒号兼容旧写法）。

| 伪元素                            | 作用                    |
| --------------------------------- | ----------------------- |
| `::before` / `::after`            | 在内容前/后生成装饰性盒 |
| `::first-letter` / `::first-line` | 首字母 / 首行           |
| `::placeholder`                   | 输入框占位符            |
| `::selection`                     | 用户选中的文本          |
| `::marker`                        | 列表项标记              |

```css
.quote::before {
  content: "「";
} /* content 必填 */
.quote::after {
  content: "」";
}
::selection {
  background: #b3d4fc;
}
```

## 优先级权重计算清单

计算 `(A, B, C, D)`：

1. **A**：行内 `style` 属性中的声明 → 1，否则 0
2. **B**：ID 选择器个数
3. **C**：类、属性选择器、伪类个数（`:not()` 只计内部）
4. **D**：类型、伪元素个数

**练习**：

| 选择器                | 权重                     |
| --------------------- | ------------------------ |
| `p`                   | 0,0,0,1                  |
| `.nav li`             | 0,0,1,1                  |
| `#app .nav li.active` | 0,1,2,1                  |
| `button:hover`        | 0,0,1,1                  |
| `p::first-line`       | 0,0,0,2                  |
| `:where(.a, #b) p`    | 0,0,0,1（`:where` 归零） |

## 易错点

1. **`:nth-child` vs `:nth-of-type`** — 前者数所有子元素，后者只数同标签；混用导致「选错行」。
2. **`:empty` 含空白文本** — 元素内有空格文本节点则不算 empty。
3. **伪元素必须设 `content`** — `::before`/`::after` 无 `content` 不会生成盒。
4. **过度具体的选择器** — `#page div.item span` 难维护；用 BEM 等 class 策略更清晰。
5. **`:has()` 性能** — 复杂 `:has` 在大 DOM 上可能触发回流，宜限定范围。

## 检查清单

- [ ] 能区分后代 ` ` 与子代 `>`？
- [ ] 能写出 `[href^="mailto:"]` 匹配邮件链接？
- [ ] 表单 `:focus-visible` 与 `:focus` 差异是否了解？
- [ ] 能否手算 `#nav .item:hover` 的 specificity？
- [ ] 伪类与伪元素（单/双冒号）能否正确选用？

## MDN 参考

- [CSS 选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_selectors)
- [基本选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_selectors/Basic_selectors)
- [组合器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_selectors/Selectors_and_combinators)
- [属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)
- [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)
- [伪元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements)
- [`:is()` / `:where()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is)
- [`:has()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:has)
