# DOM 增删改

## 定义

除查询与改属性外，JavaScript 还可**动态创建、插入、替换、删除** DOM 节点，从而在不刷新页面的情况下更新界面。掌握 `createElement`、`append`、`remove` 等 API 是构建列表、弹窗、消息提示等交互的基础。

## 核心概念

- **节点创建**：`document.createElement(tag)` 创建元素；`document.createTextNode(text)` 创建纯文本节点。
- **插入**：现代 API 优先 `parent.append(child)`（可传多个节点或字符串）；旧 API `appendChild` 只接受一个节点。
- **位置控制**：`insertBefore(newNode, refNode)` 在参考节点**之前**插入；`refNode` 为 `null` 时等效追加到末尾。
- **删除**：`element.remove()` 现代写法；`parent.removeChild(child)` 需持有父引用。
- **替换**：`parent.replaceChild(newNode, oldNode)` 用新节点替换旧节点。
- **克隆**：`node.cloneNode(deep)`；`deep === true` 时递归克隆子树。
- **DocumentFragment**：轻量「离线容器」，批量插入时只触发**一次**重排，性能更好。

## DOM 操作方法速查

| API                                 | 作用               | 返回值 / 备注              |
| ----------------------------------- | ------------------ | -------------------------- |
| `document.createElement(tag)`       | 创建元素节点       | 如 `createElement('li')`   |
| `document.createTextNode(text)`     | 创建文本节点       | 避免多余 HTML 解析         |
| `parent.append(...nodes)`           | 末尾追加           | 可多个参数；可混字符串     |
| `parent.prepend(...nodes)`          | 开头插入           | 同上                       |
| `parent.appendChild(node)`          | 末尾追加一个子节点 | 若 node 已在树中则**移动** |
| `parent.insertBefore(new, ref)`     | 在 ref 前插入      | `ref` 为 `null` 则追加     |
| `element.remove()`                  | 从 DOM 移除自身    | 现代浏览器支持             |
| `parent.removeChild(child)`         | 父节点移除子节点   | 需父引用                   |
| `parent.replaceChild(new, old)`     | 替换子节点         | 返回被替换节点             |
| `node.cloneNode(deep)`              | 克隆节点           | `true` 含子孙              |
| `document.createDocumentFragment()` | 创建文档片段       | 批量操作性能优化           |

## 性能提示

| 场景             | 建议                                                        |
| ---------------- | ----------------------------------------------------------- |
| 循环插入 100+ 项 | 先拼到 `DocumentFragment`，再一次 `append` 到 DOM           |
| 频繁改 innerHTML | 会销毁旧节点与事件监听；优先 `createElement` + `append`     |
| 只改文本         | 改 `textContent` 或复用文本节点，不必重建元素               |
| 列表更新         | 区分「增量 append」与「全量 replace」；大数据量考虑虚拟列表 |

## 示例

### 创建并追加元素

```javascript
const listEl = document.querySelector("#list");

// createElement：创建 li 元素节点
const itemEl = document.createElement("li");
itemEl.textContent = "新条目"; // 设置纯文本内容

// append：追加到列表末尾（推荐）
listEl.append(itemEl);

// 一次追加多个
const item2 = document.createElement("li");
item2.textContent = "第二条";
listEl.append(itemEl, item2); // 若 itemEl 已插入则会被移动
```

### createTextNode 与 insertBefore

```javascript
const titleEl = document.querySelector("#title");
const refEl = document.querySelector("#first-item");

// createTextNode：纯文本，无 HTML 解析开销
const labelNode = document.createTextNode("置顶：");
titleEl.insertBefore(labelNode, titleEl.firstChild);

// insertBefore：在参考节点前插入
const bannerEl = document.createElement("div");
bannerEl.className = "banner";
bannerEl.textContent = "公告";
refEl.parentElement.insertBefore(bannerEl, refEl);
```

### 删除与替换

```javascript
const oldCardEl = document.querySelector(".card--expired");

// remove：元素自删（简洁）
oldCardEl.remove();

// removeChild：需通过父元素
const parentEl = document.querySelector("#container");
const childEl = document.querySelector(".item");
parentEl.removeChild(childEl);

// replaceChild：整体替换节点
const newCardEl = document.createElement("article");
newCardEl.className = "card";
newCardEl.textContent = "更新后的内容";
parentEl.replaceChild(newCardEl, childEl);
```

### cloneNode

```javascript
const templateEl = document.querySelector("#card-template");

// cloneNode(true)：深拷贝，含所有子节点
const copyEl = templateEl.cloneNode(true);
copyEl.id = ""; // 避免 id 重复
copyEl.querySelector(".title").textContent = "副本标题";
document.querySelector("#list").append(copyEl);
```

### DocumentFragment 批量插入

```javascript
const ulEl = document.querySelector("#big-list");

// DocumentFragment：离线容器，插入前不触发布局
const fragment = document.createDocumentFragment();

for (let i = 0; i < 500; i++) {
  const liEl = document.createElement("li");
  liEl.textContent = `项目 ${i + 1}`;
  fragment.append(liEl); // 在 fragment 内操作，不触发页面重排
}

// 一次插入 DOM，只引发一次 reflow
ulEl.append(fragment);
```

### 安全地构建复杂结构

```javascript
// 推荐：createElement 逐层构建（无 XSS 风险）
function createTodoItem(text) {
  const liEl = document.createElement("li");
  const spanEl = document.createElement("span");
  spanEl.textContent = text; // 用户文本走 textContent

  const delBtn = document.createElement("button");
  delBtn.className = "del";
  delBtn.textContent = "删除";

  liEl.append(spanEl, delBtn);
  return liEl;
}

document.querySelector("#todo-list").append(createTodoItem("买牛奶"));
```

## 易错点

| 问题                         | 说明                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| `appendChild` 移动节点       | 已在 DOM 中的节点再 `appendChild` 会从原位置**剪切**到新位置 |
| `innerHTML` 批量插入         | 方便但有 XSS 风险且丢失旧节点上的事件监听                    |
| 忘记 `cloneNode(true)`       | 浅克隆不含子节点，复制卡片模板时常踩坑                       |
| `insertBefore` 参考节点      | `ref` 必须是 `parent` 的子节点，否则报错                     |
| 循环中直接 `append` 大量节点 | 每次插入可能触发重排；用 `DocumentFragment`                  |
| 克隆带 `id` 的模板           | 一份文档内 `id` 应唯一；克隆后清掉或改写 `id`                |

**相关章节**：[DOM 基础](./dom-basics) · [事件流与委托](./event-flow)

## MDN 参考

- [创建与插入节点](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/DOM_scripting#%E5%88%9B%E5%BB%BA%E5%92%8C%E6%8F%92%E5%85%A5%E6%96%B0%E5%85%83%E7%B4%A0)
- [document.createElement()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement)
- [Node.append()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/append)
- [Node.remove()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/remove)
- [Node.cloneNode()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode)
- [DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)
