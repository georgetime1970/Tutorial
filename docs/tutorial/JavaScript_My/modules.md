# 模块化

## 定义

**模块化**将代码拆成独立文件，每个文件有明确职责与导出接口，避免全局变量污染、命名冲突，并便于复用与维护。浏览器现代开发以 **ES Module（ESM）** 为主：使用 `import` / `export`，通过 `<script type="module">` 加载。

## 概念要点

- **为何模块化**：大型项目需要作用域隔离、依赖关系清晰、按需加载与 tree-shaking。
- **ESM**：静态结构，`import`/`export` 必须在顶层；编译时可分析依赖。
- **浏览器加载**：`type="module"` 脚本默认 **defer**（不阻塞解析、DOM 就绪后按顺序执行）。
- **严格模式**：模块代码自动处于严格模式。
- **CommonJS**：Node.js 传统方案（`require` / `module.exports`）；浏览器原生不支持，需打包工具。
- **单例**：同一模块多次 `import` 只执行一次，导出引用共享。

## ESM 导出 / 导入

| 语法                              | 含义                   | 示例                          |
| --------------------------------- | ---------------------- | ----------------------------- |
| `export const x`                  | 命名导出               | `export const PI = 3.14`      |
| `export function fn`              | 命名导出函数           | `export function add(a,b){}`  |
| `export { a, b }`                 | 批量命名导出           | 可先定义后导出                |
| `export default expr`             | 默认导出（每模块一个） | `export default class App {}` |
| `import { a, b } from './m.js'`   | 命名导入               | 名称须匹配                    |
| `import * as ns from './m.js'`    | 命名空间导入           | `ns.a`                        |
| `import def from './m.js'`        | 默认导入               | 名称可自定                    |
| `import def, { a } from './m.js'` | 混合导入               | 默认 + 命名                   |

### 浏览器 script 行为

| 特性           | 普通 script             | `type="module"`                   |
| -------------- | ----------------------- | --------------------------------- |
| 阻塞 HTML 解析 | 无 defer/async 时阻塞   | 否（等同 defer）                  |
| 执行时机       | 立即或 defer/async      | DOM 解析完成后                    |
| 执行顺序       | 文档顺序                | 文档顺序                          |
| 作用域         | 全局（`var` 挂 window） | 模块作用域                        |
| 严格模式       | 否                      | 自动开启                          |
| 跨域           | 一般同源                | 需 CORS（`crossorigin`）          |
| 文件扩展名     | `.js`                   | 建议 `.js`，路径需完整（含 `./`） |

## ESM vs CommonJS 对照

| 能力       | ESM                               | CommonJS                              |
| ---------- | --------------------------------- | ------------------------------------- |
| 语法       | `import` / `export`               | `require()` / `module.exports`        |
| 加载时机   | 编译时静态分析                    | 运行时动态 `require`                  |
| 浏览器原生 | ✅ `type="module"`                | ❌ 需打包                             |
| Node.js    | ✅（`"type":"module"` 或 `.mjs`） | ✅ 默认（`.cjs`）                     |
| 默认导出   | `export default`                  | `module.exports = …`                  |
| 命名导出   | `export { x }`                    | `module.exports.x = …` 或 `exports.x` |
| 动态导入   | `import('./m.js')`                | `require()` 本身可动态                |
| 循环依赖   | 支持（绑定提升）                  | 支持但易踩坑                          |

## 示例

### 命名导出与导入

```javascript
// utils.js
export const API_BASE = "https://api.example.com";

export function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
```

```javascript
// main.js
import { API_BASE, formatDate, clamp } from "./utils.js";

console.log(API_BASE);
console.log(formatDate(new Date()));
console.log(clamp(15, 0, 10)); // 10
```

### 默认导出

```javascript
// logger.js
export default function log(message) {
  console.log(`[LOG] ${message}`);
}
```

```javascript
// app.js
import log from "./logger.js"; // 名称可随意，通常与用途相关
log("应用已启动");
```

### HTML 中加载模块

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>ES Module 示例</title>
  </head>
  <body>
    <!-- type="module"：defer 行为，模块作用域，严格模式 -->
    <script type="module" src="./main.js"></script>
    <!-- 模块路径必须带 ./ 或 / 或完整 URL -->
  </body>
</html>
```

### 动态 import（按需加载）

```javascript
// 用户点击「设置」再加载重组件
async function openSettings() {
  const { SettingsPanel } = await import("./settings-panel.js");
  SettingsPanel.mount();
}
```

### CommonJS 对照（Node / 打包器语境）

```javascript
// math.cjs — CommonJS 写法
function add(a, b) {
  return a + b;
}
module.exports = { add };

// 或：const { add } = require('./math.cjs');
```

## 易错点与交叉引用

| 问题                   | 说明                                             |
| ---------------------- | ------------------------------------------------ |
| 省略 `./` 路径         | `import from 'utils.js'` 报错；必须 `./utils.js` |
| 命名导入名不匹配       | 须与导出名一致，或用 `as` 重命名                 |
| 默认导出与命名导出混用 | 一个模块仅一个 `default`                         |
| 在模块中用 `require`   | 纯 ESM 环境无 `require`；Node 需配置或 `.cjs`    |
| 循环依赖               | 尽量重构；ESM 中未初始化导出为 TDZ               |
| 模块与普通 script 混用 | 模块不自动暴露全局变量                           |

**相关章节**：[简介与引入](./intro) · [函数与作用域](./functions-scope) · [类实践](./classes)

## MDN 参考

- [JavaScript 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
- [import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
- [export](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)
- [import()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/import)
- [&lt;script&gt; type="module"](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script#type)
- [CommonJS](https://developer.mozilla.org/zh-CN/docs/Glossary/CommonJS)
