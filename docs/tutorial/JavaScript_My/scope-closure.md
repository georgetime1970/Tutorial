# 作用域与闭包

## 定义

**作用域（Scope）** 决定变量与函数在何处可见、何处可访问；**闭包（Closure）** 是函数与其词法环境（创建时能访问的外层变量）的组合，使内层函数在外层执行结束后仍能访问外层变量。

## 概念要点

- **作用域链**：查找变量时从当前作用域向外层逐级搜索，直到全局或报错。
- **块级作用域**：`let`/`const` 以 `{}` 为界；`var` 只有函数作用域，无块级边界。
- **变量提升（Hoisting）**：`var` 声明与函数声明会被「提升」到作用域顶部；`let`/`const` 也会提升但处于**暂时性死区（TDZ）**，声明前访问报错。
- **闭包**：内层函数「记住」定义时的外层变量，常用于私有状态、工厂函数、回调。
- **循环 + 闭包**：`var` 在循环中共享同一绑定；`let` 每次迭代新建绑定，或用 IIFE 隔离。
- **箭头函数**：不绑定自己的 `this`，词法捕获外层 `this` → 详见 [深浅拷贝 this 防抖](./advanced-patterns)。

## 作用域与声明对比

| 关键字     | 作用域         | 提升行为                           | 重复声明 | 推荐 |
| ---------- | -------------- | ---------------------------------- | -------- | ---- |
| `var`      | 函数           | 提升为 `undefined`，可先使用后声明 | 允许     | ❌   |
| `let`      | 块             | 提升但 TDZ，声明前不可访问         | 不允许   | ✅   |
| `const`    | 块             | 同 `let`，且必须初始化             | 不允许   | ✅   |
| 函数声明   | 函数           | 整体提升，可先调用                 | —        | 按需 |
| 函数表达式 | 取决于绑定方式 | `var fn = …` 仅变量名提升          | —        | 按需 |

### 暂时性死区（TDZ）

| 阶段       | `var`                       | `let` / `const`  |
| ---------- | --------------------------- | ---------------- |
| 声明前访问 | `undefined`（不报错）       | `ReferenceError` |
| 声明行     | 初始化为 `undefined` 或赋值 | 进入可用状态     |
| 块外访问   | 函数作用域内仍可见          | 块外不可见       |

## 闭包典型用途

| 场景            | 思路                       | 示例方向         |
| --------------- | -------------------------- | ---------------- |
| 私有变量        | 外层变量仅内层函数可读写   | 计数器、模块模式 |
| 函数工厂        | 外层参数固定，返回定制函数 | `makeAdder(n)`   |
| 回调 / 事件     | 回调需访问创建时的上下文   | 定时器、DOM 监听 |
| 柯里化 / 偏函数 | 分步传入参数               | 配置型 API       |

## 示例

### 作用域链与块级作用域

```javascript
const globalVar = "全局"; // 全局作用域

function outer() {
  const outerVar = "外层"; // 函数作用域

  if (true) {
    let blockVar = "块内"; // 块级作用域，块外不可见
    console.log(outerVar); // '外层' — 沿作用域链向上找到
  }
  // console.log(blockVar); // ❌ ReferenceError
}

outer();
```

### var 提升 vs let 的 TDZ

```javascript
console.log(a); // undefined — var 已提升但未赋值
var a = 1;

// console.log(b); // ❌ ReferenceError — TDZ
let b = 2;

function hoistDemo() {
  foo(); // ✅ 函数声明整体提升
  function foo() {
    return "ok";
  }
}
```

### 闭包：私有变量

```javascript
function createCounter() {
  let count = 0; // 私有，外部无法直接访问

  return {
    increment() {
      count += 1;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
// counter.count — undefined，无此公开属性
```

### 闭包：函数工厂

```javascript
function makeMultiplier(factor) {
  // factor 被内层函数「关闭」在闭包中
  return (value) => value * factor;
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);
double(5); // 10
triple(5); // 15
```

### 循环 + 闭包经典坑

```javascript
// ❌ var：循环结束后 i === 3，三个回调都打印 3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 100);
}

// ✅ let：每次迭代新绑定，分别打印 0、1、2
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 200);
}

// ✅ IIFE：用立即执行函数捕获当时的 k
for (var k = 0; k < 3; k++) {
  ((captured) => {
    setTimeout(() => console.log("IIFE", captured), 300);
  })(k);
}
```

## 易错点与交叉引用

| 问题                      | 说明                                                                 |
| ------------------------- | -------------------------------------------------------------------- |
| 循环里用 `var` 绑事件     | 所有回调共享同一变量 → 改用 `let` 或 IIFE                            |
| 误以为 `const` 对象不可改 | `const` 只锁绑定；对象属性仍可修改 → [变量与类型](./variables-types) |
| 闭包导致内存占用          | 内层函数仍引用大对象时会阻止回收；不需要时解除引用                   |
| 全局变量污染              | 少用隐式全局；模块 / IIFE / `const`/`let` 限定作用域                 |
| 箭头函数当闭包处理 `this` | 箭头函数无自己的 `this` → [advanced-patterns](./advanced-patterns)   |

**相关章节**：[函数与作用域](./functions-scope) · [对象](./objects) · [构造函数与原型](./prototype) · [深浅拷贝 this 防抖](./advanced-patterns)

## MDN 参考

- [闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
- [作用域](https://developer.mozilla.org/zh-CN/docs/Glossary/Scope)
- [let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
- [const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)
- [var](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var)
- [暂时性死区](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let#暂时性死区_tdz)
