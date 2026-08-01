# 事件监听

## 定义

**事件（Event）** 是浏览器在用户操作或页面生命周期中发出的通知。**事件监听**指用 JavaScript 注册回调函数，在特定事件发生时执行逻辑。几乎所有 DOM 节点都继承 `EventTarget` 接口，支持 `addEventListener` / `removeEventListener`。

## 核心概念

- **EventTarget**：事件目标对象；`document`、`window`、任意元素均可监听事件。
- **事件类型（type）**：字符串标识，如 `'click'`、`'input'`；同一元素可注册多个不同类型或同类型多个监听器。
- **监听器（listener）**：事件触发时调用的函数；接收一个 **Event 对象** 作为参数。
- **注册与移除**：`addEventListener(type, listener)` 添加；`removeEventListener` 移除时需传入**同一函数引用**。
- **默认行为**：部分事件有浏览器内置行为（如链接跳转、表单提交）；可用 `preventDefault()` 阻止。
- **加载时机**：`DOMContentLoaded` 在 DOM 树构建完成时触发（不等待图片）；`load` 在页面及子资源全部加载后触发。

## 常用事件类型清单

| 事件 type                   | 触发时机                           | 典型用途                              |
| --------------------------- | ---------------------------------- | ------------------------------------- |
| `click`                     | 鼠标主键点击（或等价激活）         | 按钮、卡片点击                        |
| `input`                     | 输入框、textarea 等内容变化        | 实时搜索、字数统计                    |
| `change`                    | 值**确认变更**后（失焦或选择完成） | select、checkbox、文件选择            |
| `submit`                    | 表单提交                           | 校验后 AJAX 提交、阻止跳转            |
| `keydown`                   | 键盘按下                           | 快捷键、Enter 提交                    |
| `keyup`                     | 键盘抬起                           | 较少单独使用                          |
| `focus` / `blur`            | 元素获得 / 失去焦点                | 输入框高亮、校验提示                  |
| `mouseenter` / `mouseleave` | 指针进入 / 离开元素                | 悬停菜单（不冒泡）                    |
| `DOMContentLoaded`          | HTML 解析完成                      | 初始化 DOM 操作（`document` 上监听）  |
| `load`                      | 页面及资源加载完毕                 | 依赖图片尺寸的布局（`window` 上监听） |
| `resize`                    | 窗口尺寸变化                       | 响应式重算（`window` 上监听）         |
| `scroll`                    | 元素或窗口滚动                     | 懒加载、返回顶部（注意节流）          |

**input vs change**：`<input type="text">` 每敲一个字触发 `input`；失焦且值变化时才触发 `change`。`<select>` 选择后立即触发 `change`。

## Event 对象常用属性

| 属性 / 方法                 | 说明                                                |
| --------------------------- | --------------------------------------------------- |
| `event.type`                | 事件类型字符串，如 `'click'`                        |
| `event.target`              | **实际触发**事件的元素（委托时关键）                |
| `event.currentTarget`       | **当前监听器绑定**的元素（`this` 同义）             |
| `event.preventDefault()`    | 阻止默认行为（如表单跳转、链接导航）                |
| `event.stopPropagation()`   | 阻止事件继续传播（见 [事件流与委托](./event-flow)） |
| `event.key`                 | 按键标识，如 `'Enter'`、`'Escape'`（键盘事件）      |
| `event.clientX` / `clientY` | 指针相对视口的坐标（鼠标事件）                      |

## 注册与移除监听器

| API                                                          | 说明                             |
| ------------------------------------------------------------ | -------------------------------- |
| `target.addEventListener(type, listener)`                    | 添加监听器；默认在冒泡阶段触发   |
| `target.addEventListener(type, listener, { capture: true })` | 在捕获阶段触发                   |
| `target.addEventListener(type, listener, { once: true })`    | 只触发一次后自动移除             |
| `target.removeEventListener(type, listener)`                 | 移除监听器；**必须同一函数引用** |

## 示例

### 基础点击与输入

```html
<button id="btn">点我</button>
<input id="search" type="text" placeholder="搜索" />
<p id="count">0</p>
```

```javascript
const btnEl = document.querySelector("#btn");
const searchInput = document.querySelector("#search");
const countEl = document.querySelector("#count");

// click：按钮点击
btnEl.addEventListener("click", (event) => {
  console.log(event.type); // "click"
  countEl.textContent = String(Number(countEl.textContent) + 1);
});

// input：每次输入即时响应
searchInput.addEventListener("input", (event) => {
  const inputEl = event.target; // 触发事件的元素（此处即 input）
  console.log("当前输入:", inputEl.value);
});
```

### 表单 submit 与 preventDefault

```html
<form id="login-form">
  <input name="email" type="email" required />
  <button type="submit">登录</button>
</form>
```

```javascript
const formEl = document.querySelector("#login-form");

formEl.addEventListener("submit", (event) => {
  // preventDefault：阻止浏览器默认的页面跳转/刷新
  event.preventDefault();

  const formData = new FormData(formEl);
  const email = formData.get("email");
  console.log("提交邮箱:", email);
  // 此处可 fetch 发送请求
});
```

### 键盘与页面加载

```javascript
// keydown：监听 Enter 键
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log("按下 Enter");
  }
});

// DOMContentLoaded：DOM 就绪后初始化（脚本在 head 且带 defer 时常用）
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM 已就绪，可以安全 querySelector");
});

// load：全部资源加载完（含图片）
window.addEventListener("load", () => {
  console.log("页面资源加载完毕");
});
```

### 移除监听器

```javascript
function handleClick(event) {
  console.log("clicked", event.currentTarget);
}

btnEl.addEventListener("click", handleClick);

// 移除时必须传入同一函数引用；匿名箭头函数无法被 remove
btnEl.removeEventListener("click", handleClick);
```

## 易错点

| 问题                     | 说明                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| 匿名函数无法移除         | `removeEventListener` 需要与 `add` 时**相同引用**；具名函数或变量保存回调                      |
| `click` 与移动端         | 移动端还有 `touchstart` 等；纯 `click` 有约 300ms 延迟（现代浏览器已优化，复杂手势需额外处理） |
| 重复绑定                 | 同一逻辑多次 `addEventListener` 会重复执行；初始化时注意只绑一次                               |
| 忘记 `preventDefault`    | 表单 `submit`、`<a href="#">` 会导致页面刷新或跳转                                             |
| `input` 与 `change` 混用 | 需要实时响应用 `input`；仅在「确认选择」时用 `change`                                          |
| 在 DOM 未就绪时绑定      | 元素为 `null` 时会报错；用 `DOMContentLoaded` 或脚本放 `body` 底部                             |

**相关章节**：[DOM 基础](./dom-basics) · [事件流与委托](./event-flow)

## MDN 参考

- [事件介绍](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/Events)
- [EventTarget.addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
- [Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)
- [Event.preventDefault()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)
- [DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/DOMContentLoaded_event)
- [Form submit 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement/submit_event)
