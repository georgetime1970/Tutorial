# 全局属性

全局属性（Global Attributes）是可写在**几乎所有 HTML 元素**上的属性，用于标识、样式、行为与无障碍；适用于任何需要统一钩子或跨元素能力的场景。

## 核心概念

- **全局性**：除少数元素（如 `<html>` 不支持 `hidden` 的某些组合）外，绝大多数元素均可使用。
- **id 唯一性**：同一文档中 `id` 必须唯一，且可作为锚点与 JS 选择器。
- **class 可复用**：同一 `class` 可出现在多个元素，CSS 与 JS 批量选中。
- **data-\***：自定义数据属性，供 JS 读取，不影响内置语义。
- **无障碍相关**：`role`、`tabindex`、`aria-*`（ARIA 属性亦全局可用）、`lang`、`dir`。
- **布尔属性**：存在即为 true（如 `hidden`、`contenteditable`），无需赋值。

## 全局属性速查表

| 属性 | 示例 | 作用 |
| ---- | ---- | ---- |
| `class` | `class="btn primary"` | 类名，空格分隔多个，CSS/JS 钩子 |
| `id` | `id="main-nav"` | 文档内唯一标识，锚点与脚本引用 |
| `style` | `style="color: red;"` | 内联 CSS（优先级高，慎用） |
| `title` | `title="更多信息"` | 悬停提示文本 |
| `lang` | `lang="zh-CN"` | 元素语言，影响发音与翻译 |
| `dir` | `dir="rtl"` / `ltr` | 文字方向（右到左/左到右） |
| `hidden` | `hidden` | 隐藏元素（不参与布局，类似 `display:none`） |
| `tabindex` | `tabindex="0"` / `-1` | 键盘 Tab 顺序：`0` 自然序，`-1` 可编程聚焦 |
| `contenteditable` | `contenteditable="true"` | 允许用户编辑内容 |
| `draggable` | `draggable="true"` | 元素可拖拽（需配合 drag 事件） |
| `inert` | `inert` | 禁用交互与焦点，用于模态背景 |
| `popover` | `popover="auto"` / `manual` | 声明弹出层，配合 `popovertarget` |
| `role` | `role="button"` | ARIA 角色，补充非原生控件的语义 |
| `data-*` | `data-id="42"` | 自定义数据，JS 用 `dataset.id` 读取 |
| `translate` | `translate="no"` | 是否参与机器翻译 |
| `spellcheck` | `spellcheck="true"` | 是否启用拼写检查 |
| `accesskey` | `accesskey="s"` | 快捷键（浏览器支持有限） |
| `inputmode` | `inputmode="numeric"` | 虚拟键盘类型提示 |
| `is` | `is="custom-btn"` | 自定义内置元素扩展 |

## 常用 ARIA 全局属性（补充）

| 属性 | 示例 | 作用 |
| ---- | ---- | ---- |
| `aria-label` | `aria-label="关闭"` | 无可见文字时的无障碍名称 |
| `aria-labelledby` | `aria-labelledby="title-id"` | 引用其他元素作为标签 |
| `aria-describedby` | `aria-describedby="hint-id"` | 引用描述文本 |
| `aria-hidden` | `aria-hidden="true"` | 对辅助技术隐藏（装饰性内容） |
| `aria-live` | `aria-live="polite"` | 动态区域更新通知方式 |

## 分组说明

| 类别 | 属性 | 典型用途 |
| ---- | ---- | -------- |
| 标识 | `id`、`class` | CSS 选择器、JS DOM 查询、锚点 |
| 表现 | `style`、`hidden`、`title` | 内联样式、可见性、tooltip |
| 国际化 | `lang`、`dir`、`translate` | 多语言与 RTL 布局 |
| 交互 | `tabindex`、`contenteditable`、`draggable`、`inert` | 焦点、编辑、拖放、禁用 |
| 数据 | `data-*` | 组件状态、配置项 |
| 无障碍 | `role`、`aria-*` | 屏幕阅读器语义 |
| 新特性 | `popover` | 原生弹出层 API |

## 示例

### id、class 与 data-*

```html
<article
  id="post-101"              <!-- id：文档内唯一 -->
  class="post featured"      <!-- class：可复用，空格分隔 -->
  data-author="张三"          <!-- data-*：自定义数据 -->
  data-published="2026-08-01"
>
  <h2 class="post-title">文章标题</h2>
</article>

<script>
  const el = document.getElementById('post-101');
  console.log(el.dataset.author);   // "张三"（camelCase：dataset.author）
  console.log(el.dataset.published); // "2026-08-01"
</script>
```

### tabindex 与 inert

```html
<!-- tabindex="0"：纳入 Tab 顺序 -->
<button tabindex="0">可 Tab 聚焦</button>

<!-- tabindex="-1"：仅 JS focus()，Tab 键跳过 -->
<div tabindex="-1" id="panel">面板区域</div>

<!-- inert：模态打开时禁用背景交互 -->
<div inert> <!-- 背景内容不可点击、不可聚焦 -->
  <p>被遮罩的内容</p>
</div>
```

### popover 与 contenteditable

```html
<button popovertarget="tip">显示提示</button> <!-- popovertarget：关联 popover 元素 -->
<div id="tip" popover="auto">这是原生弹出层</div>

<p contenteditable="true">点击即可编辑这段文字。</p> <!-- 用户可编辑 -->
```

## 常见陷阱与交叉引用

| 问题 | 说明 |
| ---- | ---- |
| 重复 `id` | CSS/JS 行为不可预期；HTML 校验失败 |
| 滥用内联 `style` | 难维护；应优先 class + 外部 CSS |
| `tabindex` > 0 | 破坏自然 Tab 顺序，避免使用正数 |
| `aria-hidden="true"` 内可聚焦元素 | 键盘用户仍能 Tab 进去，造成困惑 |
| `data-*` 大写 | 必须小写连字符：`data-user-id`，JS 读 `dataset.userId` |
| `role="button"` 无键盘支持 | 需自行处理 Enter/Space 与 `tabindex="0"` |
| 特殊字符在属性值中 | 需转义 → [字符实体](./entities) |

**相关章节**：[简介与文档结构](./intro) · [语义化结构](./semantic) · [字符实体](./entities)

## MDN 参考

- [全局属性概述](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)
- [class](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/class)
- [id](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/id)
- [data-* 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/data-*)
- [tabindex](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/tabindex)
- [inert](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/inert)
- [popover 全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/popover)
- [ARIA 状态与属性](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Attributes)
