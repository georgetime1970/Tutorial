# 循环与数组

## 定义

**循环**重复执行代码块直到条件不满足；**数组（Array）** 是按索引排列的有序集合，是 JS 中最常用的数据结构之一，配合丰富的实例方法处理列表数据。

## 概念要点

- **`for`**：经典计数循环，适合已知次数或索引遍历。
- **`for...of`**：遍历可迭代对象的**值**（数组、字符串等），推荐用于数组。
- **`for...in`**：遍历对象的**可枚举键**；遍历数组会得到字符串索引，通常不推荐。
- **数组索引从 0 开始**；`length` 表示元素个数。
- **变异方法**（`push`、`splice` 等）会修改原数组；**非变异方法**（`slice`、`map` 等）返回新值。
- **高阶方法** `map`/`filter`/`reduce` 是函数式处理列表的核心（需先掌握 [函数与作用域](./functions-scope)）。

## 循环对比

| 循环                                   | 适用场景   | 注意                                      |
| -------------------------------------- | ---------- | ----------------------------------------- |
| `for (let i = 0; i < arr.length; i++)` | 需要索引   | 用 `let` 声明 `i`                         |
| `for (const item of arr)`              | 只要元素值 | ✅ 数组遍历首选                           |
| `for (const key in obj)`               | 对象键     | ❌ 不要用于数组                           |
| `arr.forEach(fn)`                      | 副作用遍历 | 不能 `break`；无返回值                    |
| `while` / `do...while`                 | 条件驱动   | 见 [运算符与语句](./operators-statements) |

## 数组方法清单

### 增删改

| 方法                                   | 作用          | 变异原数组 |
| -------------------------------------- | ------------- | ---------- |
| `push(...items)`                       | 末尾添加      | ✅         |
| `pop()`                                | 删除末尾      | ✅         |
| `unshift(...items)`                    | 开头添加      | ✅         |
| `shift()`                              | 删除开头      | ✅         |
| `splice(start, deleteCount, ...items)` | 任意位置删/插 | ✅         |
| `slice(start, end)`                    | 截取副本      | ❌         |

### 查找与判断

| 方法              | 作用               | 返回值             |
| ----------------- | ------------------ | ------------------ |
| `indexOf(value)`  | 首次索引           | 索引或 `-1`        |
| `includes(value)` | 是否包含           | 布尔               |
| `find(fn)`        | 首个满足条件的元素 | 元素或 `undefined` |
| `findIndex(fn)`   | 首个满足条件的索引 | 索引或 `-1`        |

### 迭代与变换

| 方法                     | 作用              | 返回值      |
| ------------------------ | ----------------- | ----------- |
| `forEach(fn)`            | 逐项执行          | `undefined` |
| `map(fn)`                | 映射为新数组      | 新数组      |
| `filter(fn)`             | 过滤              | 新数组      |
| `reduce(fn, init)`       | 累积为单值        | 任意类型    |
| `some(fn)` / `every(fn)` | 是否存在/全部满足 | 布尔        |

## 示例

### for 与 for...of

```javascript
const fruits = ["苹果", "香蕉", "橙子"];

// 经典 for：需要索引时
for (let i = 0; i < fruits.length; i++) {
  console.log(i, fruits[i]); // 0 苹果, 1 香蕉 ...
}

// for...of：只要值（推荐）
for (const fruit of fruits) {
  console.log(fruit);
}

// for...in 遍历数组 — 得到 '0','1','2' 字符串键，避免使用
```

### 增删与截取

```javascript
const nums = [1, 2, 3];
nums.push(4); // [1,2,3,4] — 末尾添加
nums.pop(); // 删除 4 → [1,2,3]
const copy = nums.slice(0, 2); // [1,2] — 不修改原数组
nums.splice(1, 1, 99); // [1,99,3] — 索引 1 删 1 个，插入 99
```

### map / filter / reduce

```javascript
const prices = [10, 20, 30];

const doubled = prices.map((p) => p * 2); // [20,40,60]
const big = prices.filter((p) => p >= 20); // [20,30]
const total = prices.reduce((sum, p) => sum + p, 0); // 60
```

## 多维数组简述

```javascript
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
];

matrix[1][2]; // 6 — 行索引 + 列索引
matrix.forEach((row) => {
  row.forEach((cell) => console.log(cell));
});
```

## 易错点与交叉引用

| 问题                  | 说明                                         |
| --------------------- | -------------------------------------------- |
| `for...in` 遍历数组   | 键是字符串且可能包含原型链属性               |
| `splice` vs `slice`   | `splice` 改原数组；`slice` 返回副本          |
| 稀疏数组              | 空槽与 `undefined` 元素在 `map` 中行为不同   |
| `map` 里忘记 `return` | 回调无返回值时得到 `undefined` 数组          |
| 修改循环中的原数组    | 边遍历边 `splice` 可能导致跳过元素           |
| 数组 vs 对象          | 数组是有序数字索引；对象见 [对象](./objects) |

**相关章节**：[变量与类型](./variables-types) · [运算符与语句](./operators-statements) · [函数与作用域](./functions-scope) · [Api 总览](./jsapi)

## MDN 参考

- [循环语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#%E5%BE%AA%E7%8E%AF%E8%AF%AD%E5%8F%A5)
- [for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)
- [for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)
- [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Array 方法概览](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E6%96%B9%E6%B3%95)
