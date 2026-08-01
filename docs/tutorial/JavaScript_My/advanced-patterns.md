# 深浅拷贝、this 与防抖节流

## 定义

**浅拷贝**只复制第一层属性，嵌套对象仍共享引用；**深拷贝**递归复制全部层级。**`this`** 是函数执行时的上下文对象，绑定规则决定回调与事件处理中的指向。**防抖（debounce）** 与 **节流（throttle）** 是控制高频触发的两种经典模式。

## 概念要点

- **浅拷贝**：`{...obj}`、 `Object.assign({}, obj)`、`arr.slice()`、`Array.from(arr)`。
- **深拷贝**：`structuredClone(obj)`（现代浏览器）；`JSON.parse(JSON.stringify(obj))` 有局限。
- **`this` 绑定**：默认绑定、隐式绑定、显式绑定（`call`/`apply`/`bind`）、`new` 绑定；箭头函数**词法绑定**外层 `this` → 见 [作用域与闭包](./scope-closure)。
- **防抖**：连续触发时只执行**最后一次**（或第一次），适合搜索框、窗口 resize。
- **节流**：固定时间窗口内最多执行**一次**，适合滚动、mousemove、按钮连点。

## 拷贝方式对比

| 方式                            | 深度       | 适用           | 局限                                     |
| ------------------------------- | ---------- | -------------- | ---------------------------------------- |
| 展开 `{...o}` / `[...a]`        | 浅         | 扁平对象/数组  | 嵌套仍共享                               |
| `Object.assign({}, o)`          | 浅         | 合并多个源对象 | 同上                                     |
| `structuredClone(o)`            | 深         | 现代浏览器首选 | 不支持 DOM、函数、Symbol 等              |
| `JSON.parse(JSON.stringify(o))` | 深（有限） | 纯 JSON 数据   | 丢 `undefined`/函数/Symbol/Date/循环引用 |

### JSON 深拷贝局限清单

| 类型 / 情况              | 结果           |
| ------------------------ | -------------- |
| `undefined`、函数        | 被忽略或丢失   |
| `Date`                   | 变 ISO 字符串  |
| `Map` / `Set` / `RegExp` | 丢失或变空对象 |
| 循环引用                 | 抛错           |
| `NaN` / `Infinity`       | 变 `null`      |

## this 绑定规则

| 规则     | 触发方式                          | `this` 指向                         |
| -------- | --------------------------------- | ----------------------------------- |
| 默认     | 普通函数调用 `fn()`               | 非严格：`window`；严格：`undefined` |
| 隐式     | `obj.method()`                    | `obj`                               |
| 显式     | `fn.call(ctx)` / `apply` / `bind` | 指定的 `ctx`                        |
| `new`    | `new Fn()`                        | 新创建的实例                        |
| 箭头函数 | 任何调用                          | 定义处外层 `this`（不可改）         |

| 方法                 | 区别                   |
| -------------------- | ---------------------- |
| `call(ctx, a, b)`    | 立即调用，参数列表     |
| `apply(ctx, [a, b])` | 立即调用，参数数组     |
| `bind(ctx, a)`       | 返回新函数，不立即调用 |

## 示例

### 浅拷贝 vs 深拷贝

```javascript
const original = { a: 1, nested: { b: 2 } };

const shallow = { ...original };
shallow.nested.b = 99;
original.nested.b; // 99 — 嵌套仍共享

const deep = structuredClone(original);
deep.nested.b = 0;
original.nested.b; // 99 — 互不影响

// JSON 方式：仅适合纯数据
const jsonDeep = JSON.parse(JSON.stringify({ x: 1, y: [2, 3] }));
```

### this 与 bind

```javascript
const user = {
  name: "Alice",
  greet() {
    return `Hi, ${this.name}`;
  },
};

user.greet(); // 'Hi, Alice' — 隐式绑定

const fn = user.greet;
fn(); // 默认绑定，严格模式下 this 为 undefined

const bound = user.greet.bind(user);
setTimeout(bound, 100); // 回调中 this 仍为 user
```

### 箭头函数与 this

```javascript
const timer = {
  seconds: 0,
  start() {
    // 箭头函数捕获外层 start 的 this（即 timer）
    setInterval(() => {
      this.seconds += 1;
    }, 1000);
  },
};
```

### 防抖 debounce（最小实现）

```javascript
/**
 * 防抖：wait 毫秒内无新调用才执行 fn
 * @param {Function} fn - 目标函数
 * @param {number} wait - 等待毫秒数
 */
function debounce(fn, wait) {
  let timerId = null; // 定时器 ID
  return function (...args) {
    clearTimeout(timerId); // 重置计时
    timerId = setTimeout(() => {
      fn.apply(this, args); // 保留调用时的 this
    }, wait);
  };
}

// 场景：搜索框输入，停止输入 300ms 后再请求
const search = debounce((keyword) => {
  console.log("搜索:", keyword);
}, 300);
// input.addEventListener('input', (e) => search(e.target.value));
```

### 节流 throttle（最小实现）

```javascript
/**
 * 节流：wait 毫秒内最多执行一次 fn
 * @param {Function} fn - 目标函数
 * @param {number} wait - 时间窗口毫秒数
 */
function throttle(fn, wait) {
  let lastTime = 0; // 上次执行时间戳
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 场景：滚动加载，每 200ms 最多检查一次
const onScroll = throttle(() => {
  console.log("检查是否触底");
}, 200);
// window.addEventListener('scroll', onScroll);
```

## 易错点与交叉引用

| 问题                     | 说明                                                    |
| ------------------------ | ------------------------------------------------------- |
| 浅拷贝当深拷贝           | 嵌套对象仍联动修改                                      |
| `JSON` 深拷贝丢类型      | Date、Map、函数等需 `structuredClone` 或库              |
| 解构丢失 `this`          | `const { greet } = user` 再调用会丢隐式绑定 → 用 `bind` |
| 箭头函数当对象方法       | 无 own `this`，不适合需动态 `this` 的方法               |
| 防抖 vs 节流混用         | 要「最后一次」用 debounce；要「均匀采样」用 throttle    |
| `structuredClone` 兼容性 | 旧浏览器需 polyfill 或降级方案                          |

**相关章节**：[作用域与闭包](./scope-closure) · [事件监听](./events) · [内置构造与包装](./builtin-objects)

## MDN 参考

- [this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
- [Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [Function.prototype.apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [structuredClone()](https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone)
- [Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
