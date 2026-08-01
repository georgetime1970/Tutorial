# 表格

`<table>` 及其子元素用于展示行列化的**表格数据**（非页面布局）；适用于数据报表、价格对比、赛程表等真正需要表格语义的场景。

## 核心概念

- **表格语义**：`<table>` 表示数据关系，不要用表格做整页布局（已过时且不利于响应式）。
- **结构分区**：`<thead>` 表头、`<tbody>` 表体、`<tfoot>` 表脚，帮助浏览器与屏幕阅读器理解。
- **单元格类型**：`<th>` 表头单元格（默认加粗居中）；`<td>` 数据单元格。
- **合并单元格**：`colspan` 跨列、`rowspan` 跨行。
- **scope 无障碍**：`<th scope="col|row">` 声明表头管辖的列或行。
- **caption**：表格标题，应作为 `<table>` 第一个子元素。

## 元素速查

| 元素 | 作用 |
| ---- | ---- |
| `<table>` | 表格容器 |
| `<caption>` | 表格标题/说明 |
| `<thead>` | 表头行组 |
| `<tbody>` | 主体行组（可多个） |
| `<tfoot>` | 表脚行组 |
| `<tr>` | 一行 |
| `<th>` | 表头单元格 |
| `<td>` | 数据单元格 |
| `<colgroup>` / `<col>` | 列组样式（可选） |

## 常用属性

| 属性 | 适用元素 | 说明 |
| ---- | -------- | ---- |
| `colspan` | `th`、`td` | 横跨列数，如 `colspan="2"` |
| `rowspan` | `th`、`td` | 横跨行数，如 `rowspan="3"` |
| `scope` | `th` | `col`（列头）、`row`（行头）、`colgroup`、`rowgroup` |
| `headers` | `td` | 关联复杂表头的 `th` id 列表 |
| `abbr` | `th` | 表头缩写（长标题时） |

## 示例

### 基本表格

```html
<table>
  <caption>2026 年第一季度销售数据</caption> <!-- 表格标题，放最前 -->
  <thead>
    <tr>
      <th scope="col">月份</th>   <!-- scope="col"：列标题 -->
      <th scope="col">产品 A</th>
      <th scope="col">产品 B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">一月</th>   <!-- scope="row"：行标题 -->
      <td>120</td>
      <td>85</td>
    </tr>
    <tr>
      <th scope="row">二月</th>
      <td>150</td>
      <td>92</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">合计</th>
      <td>270</td>
      <td>177</td>
    </tr>
  </tfoot>
</table>
```

### 合并单元格

```html
<table>
  <caption>课程表（合并示例）</caption>
  <tr>
    <th scope="col">时间</th>
    <th scope="col">周一</th>
    <th scope="col">周二</th>
  </tr>
  <tr>
    <th scope="row">上午</th>
    <td colspan="2">全员培训</td> <!-- colspan="2"：横跨 2 列 -->
  </tr>
  <tr>
    <th scope="row" rowspan="2">下午</th> <!-- rowspan="2"：横跨 2 行 -->
    <td>HTML</td>
    <td>CSS</td>
  </tr>
  <tr>
    <!-- 左上角单元格被 rowspan 占据，此行少一个 th -->
    <td>JavaScript</td>
    <td>复习</td>
  </tr>
</table>
```

### 简单两列表格

```html
<table>
  <tr>
    <th scope="row">姓名</th>
    <td>张三</td>
  </tr>
  <tr>
    <th scope="row">邮箱</th>
    <td>zhang@example.com</td>
  </tr>
</table>
```

## 常见陷阱与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 用 table 做页面布局 | 应使用 Flex/Grid；表格仅用于数据 |
| 缺少 `<th>` | 表头应用 `th` 而非全用 `td` |
| 复杂表头无 `scope`/`headers` | 屏幕阅读器难以关联单元格与标题 |
| 忘记 `<caption>` | 表格应有可访问的标题或 `aria-label` |
| 移动端横向溢出 | 外层包 `overflow-x: auto` 容器，或改卡片布局 |
| 描述型键值对 | 两列键值更适合 `<dl>` → [列表](./lists) |

**相关章节**：[列表](./lists) · [语义化结构](./semantic) · [全局属性](./global-attributes)

## MDN 参考

- [HTML 表格基础](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/HTML_table_basics)
- [表格无障碍](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Table_accessibility)
- [&lt;table&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table)
- [colspan / rowspan](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/td#colspan)
- [scope 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/th#scope)
- [&lt;caption&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/caption)
