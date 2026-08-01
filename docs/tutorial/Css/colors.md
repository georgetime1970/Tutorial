# 颜色（Colors）

## 定义

CSS **颜色值** 描述元素前景、背景、边框等的色彩。语法从命名色、十六进制到函数式 `rgb()`、`hsl()`、现代 **`color()`** 与 **`currentColor`**，并配合多条 **color-related 属性** 控制对比度与可访问性。

## 颜色表示法

| 方式           | 语法示例                              | 说明                                 |
| -------------- | ------------------------------------- | ------------------------------------ |
| 命名色         | `red`、`transparent`                  | 约 140+ 关键字；`transparent` 全透明 |
| 十六进制       | `#rgb`、`#rrggbb`、`#rrggbbaa`        | 短写可扩为 `#f00` → `#ff0000`        |
| RGB            | `rgb(255 0 0)` / `rgb(255 0 0 / 0.5)` | 空格分隔 + 可选 alpha（现代语法）    |
| RGBA           | `rgba(255, 0, 0, 0.5)`                | 旧逗号语法，仍广泛支持               |
| HSL            | `hsl(120 50% 50%)`                    | 色相 0–360，S/L 为百分比             |
| HSLA           | `hsla(120, 50%, 50%, 0.5)`            | 带 alpha 的 hsl                      |
| `color()`      | `color(display-p3 1 0 0)`             | 广色域 / 指定色彩空间                |
| `currentColor` | `border-color: currentColor`          | 使用当前元素的 `color` 计算值        |

```css
.badge {
  color: #fff;
  background: hsl(220 80% 50%);
  border: 1px solid rgb(0 0 0 / 0.1);
}

.link {
  color: dodgerblue;
  text-decoration-color: currentColor; /* 与文字同色 */
}

.wide-gamut {
  color: color(display-p3 0.9 0.2 0.1);
}
```

### HSL 直观调整

| 调整目标  | 改哪个分量                |
| --------- | ------------------------- |
| 换色相    | `h`                       |
| 更艳/更灰 | `s`                       |
| 更亮/更暗 | `l`                       |
| 透明度    | alpha 或 `hsl(... / 0.5)` |

## 颜色相关属性概览

| 属性                    | 作用                          |
| ----------------------- | ----------------------------- |
| `color`                 | 文字色；`currentColor` 的源头 |
| `background-color`      | 背景填充色                    |
| `border-color`          | 边框色（可四边拆分）          |
| `outline-color`         | 焦点轮廓色                    |
| `text-decoration-color` | 下划线等装饰色                |
| `caret-color`           | 输入光标颜色                  |
| `column-rule-color`     | 多列分隔线色                  |
| `fill` / `stroke`       | SVG 图形填充与描边            |

```css
input:focus {
  outline: 2px solid #2563eb;
  outline-color: hsl(220 90% 56%);
  caret-color: #2563eb;
}

a {
  color: #0066cc;
  text-decoration: underline;
  text-decoration-color: rgb(0 102 204 / 0.4);
}
```

## 对比度与可访问性

- 正文与背景建议满足 **WCAG AA**：普通文本对比度 ≥ 4.5:1，大字 ≥ 3:1。
- 不要仅靠颜色传达状态；配合图标、文字或 `border`。
- 系统 **强制颜色** / 高对比主题会覆盖部分 author 颜色，避免关键信息只写在 `background-color` 里。

```css
.error {
  color: #b91c1c;
  border-left: 4px solid #b91c1c; /* 非颜色渠道也表达错误 */
}
```

## 示例：主题 token

```css
:root {
  --text: hsl(220 15% 20%);
  --text-muted: hsl(220 10% 45%);
  --surface: #ffffff;
  --accent: hsl(250 84% 54%);
}

.dark {
  --text: hsl(220 15% 92%);
  --text-muted: hsl(220 10% 70%);
  --surface: hsl(220 20% 12%);
  --accent: hsl(250 80% 65%);
}

body {
  color: var(--text);
  background-color: var(--surface);
}
```

## 易错点

1. **`#rgba` 八位 hex 兼容性** — 老环境可能不支持 alpha 通道。
2. **HSL 亮度误解** — `l: 50%` 不等于「中等灰度」在所有色相下视觉一致。
3. **透明叠色** — 半透明背景叠在不同底色上颜色不同，勿硬编码「看起来」的色值。
4. **仅颜色区分链接** — 需下划线或足够对比的其他线索（尤其 `:visited`）。
5. **`color()` 广色域** — 无 P3 屏时浏览器会映射，设计稿需有 sRGB 回退。

## 检查清单

- [ ] 能写出 `#f00`、`rgb()`、`hsl()` 三种等价红色？
- [ ] 知道 `currentColor` 的典型用途？
- [ ] 能列出至少 4 个除 `color` 外的颜色属性？
- [ ] 调整主题色时优先改 HSL 的哪个分量？
- [ ] 是否用 DevTools 或工具检查对比度？

## MDN 参考

- [CSS 颜色值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value)
- [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color)
- [`hsl()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/hsl)
- [`rgb()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/rgb)
- [`color()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/color)
- [`currentColor`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value#currentcolor_关键字)
- [`transparent`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/named-color)
