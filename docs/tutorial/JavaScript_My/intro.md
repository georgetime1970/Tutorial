# JavaScript 简介与引入

## 定义

**JavaScript（JS）** 是一种运行在浏览器（及 Node.js 等环境）中的脚本语言，用于为网页添加交互、动态更新内容与调用 Web API。在 Web 技术栈中，**HTML 负责结构，CSS 负责样式，JavaScript 负责行为**。

## 概念要点

- **解释型语言**：无需编译，由浏览器引擎（V8、SpiderMonkey 等）逐行执行。
- **单线程 + 事件循环**：主线程顺序执行代码，异步任务（定时器、网络请求）通过事件队列回调。
- **弱类型**：变量类型由赋值决定，运行时可变化（详见 [变量与类型](./variables-types)）。
- **与 DOM 协作**：通过 JS 读写 HTML 元素、监听用户操作（进阶见 [DOM 基础](./dom-basics)）。
- **同源策略**：脚本只能自由访问同域资源；跨域需 CORS 等机制。
- **ES 标准演进**：现代浏览器支持 ES6+（`let`、箭头函数、模块等）；旧语法见进阶章节。

## 引入方式速查

| 方式      | 写法                                   | 说明                                                         |
| --------- | -------------------------------------- | ------------------------------------------------------------ |
| 内联脚本  | `<script>代码</script>`                | 写在 HTML 内，难维护；小片段调试可用                         |
| 外部脚本  | `<script src="app.js"></script>`       | 推荐；可缓存、可复用                                         |
| `defer`   | `<script src="app.js" defer>`          | DOM 解析完再执行，**保持加载顺序**                           |
| `async`   | `<script src="app.js" async>`          | 下载完立即执行，**不保证顺序**                               |
| ES Module | `<script type="module" src="main.js">` | 默认 defer；支持 `import`/`export`（见 [模块化](./modules)） |
| 阻塞行为  | 无 defer/async 的 `<script>`           | 阻塞 HTML 解析；放 `</body>` 前或加 `defer`                  |

### defer vs async vs module

| 特性     | 普通 script | defer               | async        | type="module" |
| -------- | ----------- | ------------------- | ------------ | ------------- |
| 阻塞解析 | 是          | 否                  | 否           | 否            |
| 执行时机 | 立即        | DOMContentLoaded 前 | 下载完即执行 | DOM 解析后    |
| 执行顺序 | 文档顺序    | 保持顺序            | 不保证       | 保持顺序      |
| 严格模式 | 否          | 否                  | 否           | 自动严格模式  |

## 示例

### 外部脚本 + defer（推荐）

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>JS 示例</title>
    <link rel="stylesheet" href="style.css" />
    <!-- CSS 管样式 -->
  </head>
  <body>
    <button id="btn">点击我</button>
    <p id="msg"></p>
    <script src="app.js" defer></script>
    <!-- defer：不阻塞 DOM 解析 -->
  </body>
</html>
```

```javascript
// app.js — 操作 DOM，实现交互
const btn = document.getElementById("btn"); // 获取按钮元素
const msg = document.getElementById("msg"); // 获取段落元素

btn.addEventListener("click", () => {
  msg.textContent = "你好，JavaScript！"; // 更新页面文本
});
```

### 内联脚本（小片段可用）

```html
<script>
  // 内联：缺少 defer，若放 head 会阻塞渲染
  console.log("页面脚本已加载");
</script>
```

### ES Module 入口

```html
<script type="module" src="main.js"></script>
<!-- 模块脚本默认 defer，且处于严格模式 -->
```

```javascript
// main.js
import { greet } from "./utils.js"; // 模块导入
greet("世界");
```

## 易错点与交叉引用

| 问题                          | 说明                                         |
| ----------------------------- | -------------------------------------------- |
| script 放 `<head>` 且无 defer | 阻塞首屏渲染；加 `defer` 或移到 `</body>` 前 |
| 多个 async 脚本               | 执行顺序不可控，依赖关系会出错               |
| 混用 module 与普通 script     | module 有独立作用域，变量不自动挂到全局      |
| 把 JS 当 CSS/HTML             | JS 不能替代结构与样式；三者分工明确          |
| 忽略控制台报错                | 打开 DevTools → Console 是调试第一步         |

**相关章节**：[变量与类型](./variables-types) · [运算符与语句](./operators-statements) · [Api 总览](./jsapi) · [DOM 基础](./dom-basics)

**与 HTML/CSS 的关系**：HTML 提供元素骨架 → CSS 控制外观 → JS 读写 DOM、响应事件、请求数据。学习顺序建议：HTML/CSS 基础 → 本文 → [循环与数组](./loops-arrays) → [函数与作用域](./functions-scope)。

### 开发者工具

按 `F12` 打开浏览器 DevTools：**Console** 查看日志与报错，**Sources** 断点调试，**Network** 观察请求。入门阶段养成「改代码 → 看 Console」的习惯。

## MDN 参考

- [JavaScript 入门](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting)
- [什么是 JavaScript](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/What_is_JavaScript)
- [首次运行 JavaScript](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/A_first_splash)
- [&lt;script&gt; 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script)
- [JavaScript 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
