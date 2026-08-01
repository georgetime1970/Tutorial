# 事件流与委托

## 定义

**事件流（Event Flow）** 描述事件从触发到被处理的传播路径：先**捕获**（从 `window` 到目标），再到达**目标**，再**冒泡**（从目标回到 `window`）。理解三阶段是掌握 `stopPropagation` 与**事件委托**的前提。

## 核心概念

- **三阶段**：① 捕获阶段（Capture）→ ② 目标阶段（Target）→ ③ 冒泡阶段（Bubble）。
- **默认监听阶段**：`addEventListener` 第三个参数默认为 `false`，即在**冒泡阶段**执行监听器。
- **捕获监听**：`addEventListener(type, fn, true)` 或 `{ capture: true }`，在事件**向下**传播时触发。
- **stopPropagation**：阻止事件继续向下一阶段传播；不影响同一阶段其他监听器。
- **事件委托（Event Delegation）**：把监听器绑在**父元素**上，利用冒泡统一处理子元素事件；通过 `event.target` 或 `closest` 判断实际点击项。
- **currentTarget vs target**：`target` 是触发源；`currentTarget` 是绑定监听器的那一层（委托时为父元素）。

## 传播阶段速查

| 阶段 | 方向    | 触发顺序               | 常用场景                     |
| ---- | ------- | ---------------------- | ---------------------------- |
| 捕获 | 外 → 内 | window → … → 父 → 目标 | 较少用；框架内部、拦截早期   |
| 目标 | —       | 到达触发元素本身       | 直接绑定在目标上             |
| 冒泡 | 内 → 外 | 目标 → 父 → … → window | **默认**；事件委托依赖此阶段 |

## API 速查

| API / 参数                          | 说明                                       |
| ----------------------------------- | ------------------------------------------ |
| `addEventListener(type, fn, false)` | 冒泡阶段监听（默认）                       |
| `addEventListener(type, fn, true)`  | 捕获阶段监听                               |
| `{ capture: true }`                 | 同上，推荐对象写法                         |
| `event.stopPropagation()`           | 阻止继续传播（捕获或冒泡）                 |
| `event.stopImmediatePropagation()`  | 阻止传播 + 阻止同元素同阶段其余监听器      |
| `event.target`                      | 实际触发事件的元素                         |
| `event.target.closest(sel)`         | 从 target 向上找匹配选择器的祖先（含自身） |

## 事件委托：优缺点

| 优点                         | 缺点                                                                |
| ---------------------------- | ------------------------------------------------------------------- |
| 动态新增的子元素无需重新绑定 | 需过滤 `target`，逻辑稍复杂                                         |
| 减少监听器数量，节省内存     | 并非所有事件都冒泡（如 `focus`、`blur`；可用 `focusin`/`focusout`） |
| 列表、表格等批量项统一管理   | 过度委托到 `document` 可能影响调试与性能                            |

**适用**：列表删除、Tab 切换、动态渲染的菜单项等「父容器稳定、子项常变」的场景。

## 示例

### 捕获与冒泡观察

```html
<div id="outer">
  <div id="inner">
    <button id="btn">点击</button>
  </div>
</div>
```

```javascript
const outerEl = document.querySelector("#outer");
const innerEl = document.querySelector("#inner");
const btnEl = document.querySelector("#btn");

// 捕获：从外向内，先执行 outer，再 inner
outerEl.addEventListener("click", () => console.log("outer 捕获"), { capture: true });
innerEl.addEventListener("click", () => console.log("inner 捕获"), { capture: true });

// 冒泡：从内向外，先 btn（目标），再 inner，再 outer
btnEl.addEventListener("click", () => console.log("btn 冒泡"));
innerEl.addEventListener("click", () => console.log("inner 冒泡"));
outerEl.addEventListener("click", () => console.log("outer 冒泡"));

// 点击 btn 输出顺序：outer 捕获 → inner 捕获 → btn 冒泡 → inner 冒泡 → outer 冒泡
```

### stopPropagation

```javascript
innerEl.addEventListener("click", (event) => {
  // stopPropagation：阻止事件继续冒泡到 outer
  event.stopPropagation();
  console.log("inner 处理完毕，outer 不会收到冒泡");
});
```

### 事件委托：列表删除

```html
<ul id="todo-list">
  <li><span>任务 A</span><button class="del">删除</button></li>
  <li><span>任务 B</span><button class="del">删除</button></li>
</ul>
```

```javascript
const listEl = document.querySelector("#todo-list");

// 只在父元素 ul 上绑一次 click
listEl.addEventListener("click", (event) => {
  // closest：从实际点击处向上找最近的 .del 按钮
  const delBtn = event.target.closest(".del");
  if (!delBtn) return; // 点的不是删除按钮，忽略

  const itemEl = delBtn.closest("li"); // 找到对应 li
  itemEl.remove();
});

// 后续动态追加的 li 无需再绑监听器
const newItem = document.createElement("li");
newItem.innerHTML = '<span>新任务</span><button class="del">删除</button>';
listEl.append(newItem);
```

### 委托 + 区分多种子元素

```html
<div id="toolbar">
  <button data-action="save">保存</button>
  <button data-action="reset">重置</button>
</div>
```

```javascript
const toolbarEl = document.querySelector("#toolbar");

toolbarEl.addEventListener("click", (event) => {
  const btnEl = event.target.closest("button[data-action]");
  if (!btnEl) return;

  const action = btnEl.dataset.action; // 读取 data-action
  if (action === "save") console.log("执行保存");
  if (action === "reset") console.log("执行重置");
});
```

## 易错点

| 问题                    | 说明                                                                |
| ----------------------- | ------------------------------------------------------------------- |
| 误以为只有冒泡          | 捕获阶段同样会触发监听器；`capture: true` 时顺序与冒泡相反          |
| `stopPropagation` 滥用  | 会打断其他组件的监听；仅在确需隔离时使用                            |
| 委托未过滤 target       | 点击空白区域也会进 handler；必须 `closest` 或 `matches` 判断        |
| `target` 可能是文本节点 | 旧浏览器中点击文字时 target 或为 `#text`；`closest` 更稳妥          |
| 不冒泡的事件            | `mouseenter`/`mouseleave` 不冒泡；委托需改用 `mouseover` 或单独绑定 |
| 捕获阶段阻止            | 在捕获中 `stopPropagation` 会阻止目标与冒泡阶段，影响范围大         |

**相关章节**：[事件监听](./events) · [DOM 增删改](./dom-methods)

## MDN 参考

- [事件流（捕获与冒泡）](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- [Event.stopPropagation()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation)
- [Event.target](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target)
- [Event.currentTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/currentTarget)
- [Element.closest()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest)
