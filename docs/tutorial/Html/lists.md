# 列表

HTML 列表元素用于组织有序、无序或术语型内容；适用于导航菜单、步骤说明、FAQ、词汇表等结构化枚举场景。

## 核心概念

- **无序列表 `<ul>`**：条目顺序无关，默认圆点标记。
- **有序列表 `<ol>`**：条目有先后顺序，默认数字标记；可用 `start`、`reversed`、`type` 控制编号。
- **描述列表 `<dl>`**：术语（`<dt>`）+ 解释（`<dd>`）成对出现，适合词汇表与元数据。
- **列表项 `<li>`**：`<ul>` / `<ol>` 的直接子元素；可嵌套子列表。
- **嵌套规则**：子列表放在 `<li>` 内部，而非 `<ul>`/`<ol>` 之间。
- **语义 vs 样式**：列表标记外观由 CSS `list-style` 控制，不要用列表仅为了缩进。

## 元素速查

| 元素 | 作用 | 父元素 |
| ---- | ---- | ------ |
| `<ul>` | 无序列表 | — |
| `<ol>` | 有序列表 | — |
| `<li>` | 列表项 | `ul` 或 `ol` |
| `<dl>` | 描述/术语列表 | — |
| `<dt>` | 术语/名称 | `dl` |
| `<dd>` | 术语描述 | `dl`（跟在对应 `dt` 后） |

## ol 专用属性

| 属性 | 值 | 说明 |
| ---- | -- | ---- |
| `start` | 整数，如 `5` | 起始编号（默认 1） |
| `reversed` | 布尔属性 | 倒序编号 |
| `type` | `1`、`a`、`A`、`i`、`I` | 编号类型（HTML4 遗留，仍可用） |

| type 值 | 编号样式 |
| ------- | -------- |
| `1` | 1, 2, 3（默认） |
| `a` | a, b, c |
| `A` | A, B, C |
| `i` | i, ii, iii |
| `I` | I, II, III |

## 示例

### 无序与有序列表

```html
<!-- ul：顺序无关 -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- ol：有先后顺序 -->
<ol>
  <li>打开编辑器</li>
  <li>创建 index.html</li>
  <li>在浏览器中预览</li>
</ol>
```

### ol 编号控制

```html
<!-- start：从 5 开始编号 -->
<ol start="5">
  <li>第五步</li>
  <li>第六步</li>
</ol>

<!-- reversed：倒序 -->
<ol reversed>
  <li>最新版本 v3.0</li>
  <li>v2.0</li>
  <li>v1.0</li>
</ol>

<!-- type：字母编号 -->
<ol type="A">
  <li>选项 A</li>
  <li>选项 B</li>
</ol>
```

### 嵌套列表与描述列表

```html
<!-- 嵌套：子 ul/ol 必须放在 li 内 -->
<ul>
  <li>前端
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>后端
    <ol>
      <li>Node.js</li>
      <li>Python</li>
    </ol>
  </li>
</ul>

<!-- dl：术语 + 解释 -->
<dl>
  <dt>HTML</dt>
  <dd>超文本标记语言，描述网页结构。</dd>

  <dt>CSS</dt>
  <dd>层叠样式表，控制页面外观。</dd>

  <dt>API</dt>
  <dd>应用程序编程接口。</dd>
  <dd>也可指浏览器提供的 Web API。</dd> <!-- 一个 dt 可对应多个 dd -->
</dl>
```

## 常见陷阱与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 子列表放在 `ul` 外 | 破坏结构；应嵌套在父 `li` 内 |
| 用 `<br>` 模拟列表 | 丧失语义与无障碍支持；应用 `ul`/`ol` |
| 用列表做纯缩进 | 滥用语义；缩进用 CSS `padding`/`margin` |
| `ol` 的 `type` 与 CSS 冲突 | 现代项目更推荐 CSS `list-style-type` |
| 导航菜单 | 导航链接列表常包在 `<nav>` 内 → [语义化结构](./semantic) |
| 列表内链接 | → [链接](./links) |

**相关章节**：[语义化结构](./semantic) · [链接](./links) · [表格](./tables)

## MDN 参考

- [HTML 列表基础](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Lists)
- [&lt;ul&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul)
- [&lt;ol&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ol)
- [&lt;li&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/li)
- [&lt;dl&gt; / &lt;dt&gt; / &lt;dd&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dl)
