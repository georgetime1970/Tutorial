# 字符实体

字符实体（Character Reference）是在 HTML 中用 `&名称;` 或 `&#数字;` 表示特殊字符的方式；适用于在源码中显示 `<`、`&` 等保留字符，或输入键盘无法直接打出的符号。

## 核心概念

- **为什么需要**：HTML 中 `<`、`>`、`&` 等有语法含义，直接写入可能被解析为标签或实体起始。
- **两种写法**：
  - **命名实体**：`&lt;` → `<`，可读性好，常用实体应记住。
  - **数字实体**：`&#60;` 或 `&#x3C;`（十六进制），可表示任意 Unicode 码点。
- **UTF-8 优先**：文档声明 `<meta charset="UTF-8">` 后，中文、emoji 等可直接写字符，不必转义。
- **三种上下文**：内容文本、属性值、URL 中规则略有不同；属性值内 `"` 常用 `&quot;`。
- **连续空格**：HTML 默认折叠空白；需要不换行空格时用 `&nbsp;`（不宜滥用做布局）。

## 实体语法

| 形式 | 示例 | 结果 |
| ---- | ---- | ---- |
| 命名实体 | `&lt;` | `<` |
| 十进制数字 | `&#60;` | `<` |
| 十六进制 | `&#x3C;` 或 `&#x003C;` | `<` |

> 实体必须以分号 `;` 结尾（HTML5 对部分情况容错，但始终写分号是最佳实践）。

## 常用实体速查表

| 字符 | 命名实体 | 数字实体 | 说明 |
| ---- | -------- | -------- | ---- |
| `<` | `&lt;` | `&#60;` | 小于号，显示标签语法必用 |
| `>` | `&gt;` | `&#62;` | 大于号 |
| `&` | `&amp;` | `&#38;` | 和号，**必须最先**转义 |
| `"` | `&quot;` | `&#34;` | 双引号，属性值内常用 |
| `'` | `&apos;` | `&#39;` | 单引号（XML/XHTML 常用） |
| 空格（不换行） | `&nbsp;` | `&#160;` | 不换行空格 |
| `©` | `&copy;` | `&#169;` | 版权符号 |
| `®` | `&reg;` | `&#174;` | 注册商标 |
| `™` | `&trade;` | `&#8482;` | 商标 |
| `€` | `&euro;` | `&#8364;` | 欧元 |
| `¥` | `&yen;` | `&#165;` | 日元/人民币符号 |
| `£` | `&pound;` | `&#163;` | 英镑 |
| `¢` | `&cent;` | `&#162;` | 美分 |
| `§` | `&sect;` | `&#167;` | 章节号 |
| `°` | `&deg;` | `&#176;` | 度 |
| `±` | `&plusmn;` | `&#177;` | 正负号 |
| `×` | `&times;` | `&#215;` | 乘号 |
| `÷` | `&divide;` | `&#247;` | 除号 |
| `←` | `&larr;` | `&#8592;` | 左箭头 |
| `→` | `&rarr;` | `&#8594;` | 右箭头 |
| `…` | `&hellip;` | `&#8230;` | 省略号 |
| `—` | `&mdash;` | `&#8212;` | 长破折号 |
| `–` | `&ndash;` | `&#8211;` | 短破折号 |
| `·` | `&middot;` | `&#183;` | 间隔点 |
| `½` | `&frac12;` | `&#189;` | 二分之一 |
| `¼` | `&frac14;` | `&#188;` | 四分之一 |
| `¾` | `&frac34;` | `&#190;` | 四分之三 |

## 示例

### 在正文中显示 HTML 语法

```html
<p>
  段落标签写作 &lt;p&gt;内容&lt;/p&gt;。
  <!-- &lt; → <，&gt; → >，避免被浏览器当成真实标签 -->
</p>

<p>
  属性示例：&lt;a href=&quot;https://example.com&quot;&gt;链接&lt;/a&gt;
  <!-- 属性值内的双引号用 &quot; -->
</p>
```

### 版权与货币符号

```html
<footer>
  <p>&copy; 2026 示例公司 &mdash; 保留所有权利</p>
  <!-- &copy; → ©，&mdash; → —（长破折号） -->
  <p>价格：&yen;99.00（约 &euro;12.50）</p>
  <!-- &yen; → ¥，&euro; → € -->
</footer>
```

### nbsp 与数字实体

```html
<p>10&nbsp;kg</p> <!-- nbsp：数字与单位间不换行 -->
<p>版本&nbsp;2.0</p>

<p>
  Unicode 心形：&#x2764;&#xFE0F;
  <!-- 十六进制数字实体，可直接写 ❤️ 若 charset 为 UTF-8 -->
</p>

<!-- 错误示例：未转义 & -->
<p>Tom & Jerry</p>  <!-- 浏览器可能尝试解析 & Jerry 为实体 -->
<p>Tom &amp; Jerry</p> <!-- 正确：&amp; → & -->
```

## 常见陷阱与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 链式转义顺序 | 转义 `&` 必须最先，否则 `&amp;lt;` 会被二次解析 |
| 用 `&nbsp;` 做缩进 | 应使用 CSS `padding`/`text-indent` |
| 过度转义 UTF-8 中文 | UTF-8 下中文可直接写，无需 `&#xxxx;` |
| 在 `<script>`/`<style>` 内 | 规则不同；`<script>` 内 `</script>` 需特殊处理 |
| URL 中的 `&` | 查询参数用 `&` 分隔，在 HTML 属性中写 `&amp;` |
| 用户输入直接插入 HTML | 必须转义防 XSS；应用框架或 `textContent` |

**相关章节**：[简介与文档结构](./intro) · [文本内容](./text) · [链接](./links) · [全局属性](./global-attributes)

## MDN 参考

- [HTML 字符实体引用](https://developer.mozilla.org/zh-CN/docs/Glossary/Entity)
- [字符实体列表（命名）](https://developer.mozilla.org/zh-CN/docs/Glossary/Entity#实体字符表)
- [在 HTML 中使用特殊字符](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Advanced_text_features#html_字符实体)
- [&lt;meta charset&gt; 与 Unicode](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta#charset)
- [XML 实体参考（完整列表）](https://developer.mozilla.org/zh-CN/docs/Web/XML/Guides/Named_entities)
