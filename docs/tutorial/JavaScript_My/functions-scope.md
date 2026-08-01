# 函数与作用域

## 定义

**函数**是可复用的代码块，接收输入（参数）并可能返回结果；**作用域**决定变量在何处可见、何处可访问。函数是组织逻辑的基本单元，作用域规则影响变量生命周期与命名冲突。

## 概念要点

- **函数声明**会被提升（hoisting），可在声明前调用；**函数表达式**不会。
- **参数**是函数输入；**返回值**用 `return`，无 `return` 则返回 `undefined`。
- **默认参数**：调用时未传或传 `undefined` 时使用默认值。
- **剩余参数** `...rest`：将多余实参收集为数组。
- **箭头函数**：无自身 `this`，语法简洁；不适合作构造函数。
- **作用域层级**：全局 → 函数 → 块（`let`/`const`）；深闭包见 [作用域与闭包](./scope-closure)。

## 函数形式对比

| 形式          | 语法                       | 提升 | 典型用途                     |
| ------------- | -------------------------- | ---- | ---------------------------- |
| 函数声明      | `function fn() {}`         | ✅   | 通用命名函数                 |
| 函数表达式    | `const fn = function() {}` | ❌   | 条件定义、回调               |
| 箭头函数      | `const fn = () => {}`      | ❌   | 短回调、不绑定 this          |
| 立即执行 IIFE | `(function(){})()`         | —    | 旧式私有作用域（现多用模块） |

## 作用域速查

| 作用域 | 范围            | 关键字                               |
| ------ | --------------- | ------------------------------------ |
| 全局   | 整个脚本 / 模块 | `var`/`let`/`const` 在顶层           |
| 函数   | 函数体内        | `var`/`let`/`const` 在函数内         |
| 块     | `{}` 内         | 仅 `let`/`const`（`var` 无块作用域） |

## 示例

### 声明、参数与返回值

```javascript
// 函数声明 — 可提升
function add(a, b) {
  return a + b; // 返回两数之和
}

const result = add(2, 3); // 5

// 函数表达式
const greet = function (name) {
  return "你好，" + name;
};
```

### 默认参数与剩余参数

```javascript
function createUser(name, role = "guest") {
  // role 未传时使用 'guest'
  return { name, role };
}

createUser("小明"); // { name: '小明', role: 'guest' }

function sum(...numbers) {
  // ...numbers 将实参收集为数组
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3); // 6
```

### 箭头函数与块作用域

```javascript
const double = (x) => x * 2; // 单参数可省略括号

const evens = [1, 2, 3].filter((n) => n % 2 === 0); // [2]

if (true) {
  let blockVar = "只在块内"; // 块作用域
  // console.log(blockVar);    // 块外不可访问
}

// var 无块作用域 — 避免使用
if (true) {
  var leaked = "会泄漏到函数/全局";
}
```

### 函数声明提升（了解即可）

```javascript
sayHi(); // 'Hi!' — 声明会被提升

function sayHi() {
  console.log("Hi!");
}

// sayBye();                   // ReferenceError — 表达式未提升
const sayBye = function () {
  console.log("Bye!");
};
```

## 易错点与交叉引用

| 问题                  | 说明                                                                 |
| --------------------- | -------------------------------------------------------------------- |
| 声明前调用函数表达式  | 表达式未提升，会 ReferenceError                                      |
| 箭头函数作对象方法    | 无自身 `this`，行为与普通函数不同 → 见 [对象](./objects)             |
| 默认参数引用前序参数  | `function f(a, b = a)` 合法；`b = c` 且 `c` 在后则不行               |
| `return` 后代码不执行 | 可用于提前退出                                                       |
| 闭包与循环            | `var` + 循环 + 异步回调的经典坑 → 见 [作用域与闭包](./scope-closure) |
| 回调与高阶函数        | 数组 `map`/`filter` 见 [循环与数组](./loops-arrays)                  |

**相关章节**：[变量与类型](./variables-types) · [循环与数组](./loops-arrays) · [对象](./objects) · [作用域与闭包](./scope-closure)

## MDN 参考

- [函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)
- [函数定义](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions#%E5%87%BD%E6%95%B0%E5%AE%9A%E4%B9%89)
- [默认参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters)
- [剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- [箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [作用域](https://developer.mozilla.org/zh-CN/docs/Glossary/Scope)
