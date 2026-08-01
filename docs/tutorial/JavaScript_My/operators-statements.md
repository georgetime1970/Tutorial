# 运算符与语句

## 定义

**运算符**对值进行运算并产生结果；**语句**是执行某一操作的完整指令（如条件分支、循环）。掌握运算符优先级与严格相等，是写出可预测 JS 代码的基础。

## 概念要点

- **算术运算符**：`+` `-` `*` `/` `%` `**`（幂）；`+` 遇字符串会拼接。
- **比较运算符**：`>` `<` `>=` `<=`；相等用 `===` / `!==`（推荐），避免 `==` / `!=`。
- **逻辑运算符**：`&&`（与）、`||`（或）、`!`（非）；常用于条件短路。
- **赋值运算符**：`=`、`+=`、`-=`、`*=` 等复合赋值。
- **三元运算符**：`条件 ? 值A : 值B`，适合简单二选一。
- **控制流**：`if/else`、`switch` 做分支；`while`/`do...while` 做循环（`for` 详见 [循环与数组](./loops-arrays)）。

## 运算符清单

### 算术

| 运算符          | 含义       | 示例                                |
| --------------- | ---------- | ----------------------------------- |
| `+`             | 加 / 拼接  | `1 + 2` → `3`；`'a' + 'b'` → `'ab'` |
| `-` `*` `/` `%` | 减乘除取余 | `7 % 3` → `1`                       |
| `**`            | 幂         | `2 ** 3` → `8`                      |
| `++` `--`       | 自增自减   | `i++` 后置；`++i` 前置              |

### 比较与逻辑

| 运算符 | 含义                 | 推荐    |
| ------ | -------------------- | ------- |
| `===`  | 严格相等（类型+值）  | ✅      |
| `!==`  | 严格不等             | ✅      |
| `==`   | 宽松相等（隐式转换） | ❌ 避免 |
| `!=`   | 宽松不等             | ❌ 避免 |
| `&&`   | 逻辑与               | 短路    |
| `\|\|` | 逻辑或               | 短路    |
| `!`    | 逻辑非               |         |

### `==` vs `===` 典型差异

| 表达式              | `==`   | `===`   |
| ------------------- | ------ | ------- |
| `0 == false`        | `true` | `false` |
| `'' == false`       | `true` | `false` |
| `null == undefined` | `true` | `false` |
| `'5' == 5`          | `true` | `false` |

## 语句清单

| 语句                  | 用途              | 备注                              |
| --------------------- | ----------------- | --------------------------------- |
| `if / else if / else` | 条件分支          | 最常用                            |
| `switch`              | 多分支匹配        | 配合 `break` 防穿透               |
| `while`               | 先判断后执行      | 条件为 false 可能零次             |
| `do...while`          | 先执行后判断      | 至少执行一次                      |
| `for`                 | 计数循环          | 详见 [循环与数组](./loops-arrays) |
| `break`               | 跳出循环或 switch |                                   |
| `continue`            | 跳过本次循环迭代  |                                   |

## 示例

### if / else 与三元

```javascript
const score = 85;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 60) {
  grade = "B";
} else {
  grade = "C";
}

const status = score >= 60 ? "及格" : "不及格"; // 三元：简单二选一
```

### switch 多分支

```javascript
const day = 3;
let label;

switch (day) {
  case 1:
    label = "周一";
    break; // 必须 break，否则穿透到下一 case
  case 2:
    label = "周二";
    break;
  default:
    label = "其他";
}
```

### while 与严格相等

```javascript
let i = 0;
while (i < 3) {
  console.log(i); // 0, 1, 2
  i++;
}

// 始终用 === 比较
const value = "0";
if (value === 0) {
  // false — 类型不同
  console.log("不会执行");
}
```

## 易错点与交叉引用

| 问题                   | 说明                                                      |
| ---------------------- | --------------------------------------------------------- |
| 用 `==` 比较           | 隐式类型转换产生意外结果 → 始终用 `===`                   |
| `switch` 忘记 `break`  | 会「穿透」执行后续 case                                   |
| `'5' + 1` vs `'5' - 1` | 加号拼接、减号转数字 → 见 [变量与类型](./variables-types) |
| 逻辑与短路             | `a && b` 若 `a` 为假值直接返回 `a`，不执行 `b`            |
| 浮点精度               | `0.1 + 0.2 !== 0.3` → 金额计算用整数分或专用库            |
| 循环细节               | `for`、`for...of` 见 [循环与数组](./loops-arrays)         |

**相关章节**：[变量与类型](./variables-types) · [循环与数组](./loops-arrays) · [函数与作用域](./functions-scope) · [运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_precedence)

## MDN 参考

- [运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators)
- [相等比较与相同](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness)
- [条件语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#%E6%9D%A1%E4%BB%B6%E8%AF%AD%E5%8F%A5)
- [switch](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/switch)
- [while](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/while)
- [do...while](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/do...while)
