# DOM 基础

## 定义

**DOM（Document Object Model，文档对象模型）** 是浏览器将 HTML 解析后生成的**树形对象结构**。JavaScript 通过 DOM API 读取、修改页面内容与结构，是实现交互页面的基础。

## 核心概念

- **节点树**：文档从 `document` 根节点向下分支；每个 HTML 标签对应一个**元素节点**，文本对应**文本节点**。
- **document**：全局入口对象，代表整份 HTML 文档；常用 `document.querySelector` 查找元素。
- **元素引用**：`querySelector` 返回**第一个**匹配元素或 `null`；`querySelectorAll` 返回**静态 NodeList**（类数组，可 `forEach`）。
- **Live vs Static**：`getElementsByClassName` 等返回的 HTMLCollection 是**活的**（DOM 变化会同步）；`querySelectorAll` 结果是**快照**。
- **内容 vs 结构**：改文本用 `textContent`；改 HTML 结构用 `innerHTML`（有 XSS 风险）。
- **属性 vs 特性**：`element.id` 是 JS 属性；`getAttribute('data-id')` 读 HTML 特性；`dataset` 专门访问 `data-*`。

## 选择器 API 速查

| API                                    | 返回值            | 说明                               |
| -------------------------------------- | ----------------- | ---------------------------------- |
| `document.querySelector(sel)`          | `Element \| null` | **首选**；CSS 选择器语法，取第一个 |
| `document.querySelectorAll(sel)`       | `NodeList`        | **首选**；取全部匹配，静态列表     |
| `document.getElementById(id)`          | `Element \| null` | 按 `id` 查找；等价于 `#id`         |
| `document.getElementsByClassName(cls)` | `HTMLCollection`  | 按 class；Live 集合                |
| `document.getElementsByTagName(tag)`   | `HTMLCollection`  | 按标签名；Live 集合                |
| `element.closest(sel)`                 | `Element \| null` | 从当前元素**向上**找最近匹配祖先   |
| `element.matches(sel)`                 | `boolean`         | 当前元素是否匹配选择器             |

**推荐**：日常优先 `querySelector` / `querySelectorAll`，语法与 CSS 一致、表达力强。

## 内容与属性速查

| API / 属性                | 作用              | 备注                                     |
| ------------------------- | ----------------- | ---------------------------------------- |
| `textContent`             | 读/写纯文本       | 含隐藏元素文本；不解析 HTML              |
| `innerHTML`               | 读/写 HTML 字符串 | **勿插入不可信内容**（XSS）              |
| `innerText`               | 读/写「可见」文本 | 受 CSS 影响，较少用于写入                |
| `element.value`           | 表单控件的值      | `input`、`select`、`textarea`            |
| `element.classList`       | 增删改查 class    | `add` / `remove` / `toggle` / `contains` |
| `element.style`           | 行内样式          | 属性名用 camelCase，如 `backgroundColor` |
| `element.dataset`         | 读 `data-*` 属性  | `data-user-id` → `dataset.userId`        |
| `getAttribute(name)`      | 读 HTML 特性      | 始终返回字符串或 `null`                  |
| `setAttribute(name, val)` | 写 HTML 特性      | 布尔属性注意行为差异                     |

### classList 常用方法

| 方法                           | 说明                     |
| ------------------------------ | ------------------------ |
| `classList.add('active')`      | 添加类名（已存在则忽略） |
| `classList.remove('active')`   | 移除类名                 |
| `classList.toggle('active')`   | 有则删、无则加           |
| `classList.contains('active')` | 是否包含该类             |

## 示例

### 查找与修改文本

```html
<h1 id="title">原标题</h1>
<p class="desc">说明文字</p>
<input id="name" value="张三" />
```

```javascript
// querySelector：CSS 选择器查找第一个元素
const titleEl = document.querySelector("#title");

// textContent：安全地替换纯文本（不解析 HTML 标签）
titleEl.textContent = "新标题";

// querySelectorAll：查找所有匹配元素
document.querySelectorAll(".desc").forEach((descEl) => {
  descEl.textContent = "已更新";
});

// 表单 value：读写输入框当前值
const nameInput = document.querySelector("#name");
console.log(nameInput.value); // 读取用户输入或初始 value
nameInput.value = "李四";
```

### classList、style、dataset

```html
<button id="btn" class="btn" data-action="save">保存</button>
```

```javascript
const btnEl = document.querySelector("#btn");

// classList：切换视觉状态，比手动拼 className 字符串更清晰
btnEl.classList.add("btn--primary");
btnEl.classList.toggle("is-loading");

// style：适合少量动态样式；大量样式应交给 CSS class
btnEl.style.backgroundColor = "#2563eb";

// dataset：读取自定义 data-* 属性（camelCase）
const action = btnEl.dataset.action; // "save"
btnEl.dataset.action = "submit"; // 写入 data-action
```

### innerHTML 与安全提示

```javascript
const userInput = '<img src=x onerror="alert(1)">'; // 模拟恶意输入

// ❌ 危险：不可信字符串写入 innerHTML 会执行脚本（XSS）
// containerEl.innerHTML = userInput;

// ✅ 安全：纯文本展示用 textContent
const containerEl = document.querySelector("#msg");
containerEl.textContent = userInput; // 作为文本显示，不执行脚本
```

## 易错点

| 问题                              | 说明                                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| `querySelector` 未判空            | 找不到时返回 `null`，直接访问属性会报错；先 `if (el)` 或使用可选链                        |
| 混淆 `innerHTML` 与 `textContent` | 用户输入、接口数据展示应用 `textContent`；`innerHTML` 仅用于可信 HTML                     |
| `getElementsBy*` 的 Live 集合     | 循环中若增删节点，集合长度会变，可能导致漏项或死循环                                      |
| `className` vs `classList`        | 改 class 优先 `classList`，避免覆盖其他类名                                               |
| `style` 属性名                    | CSS 连字符需转 camelCase：`font-size` → `fontSize`                                        |
| 脚本执行时机                      | DOM 未解析完时 `querySelector` 可能为 `null`；脚本放 `body` 末尾或监听 `DOMContentLoaded` |

**相关章节**：[事件监听](./events) · [DOM 增删改](./dom-methods) · [事件流与委托](./event-flow)

## MDN 参考

- [DOM 介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction)
- [document.querySelector()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector)
- [document.querySelectorAll()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll)
- [Element.textContent](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent)
- [Element.innerHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)
- [Element.classList](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)
- [HTMLElement.dataset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset)
