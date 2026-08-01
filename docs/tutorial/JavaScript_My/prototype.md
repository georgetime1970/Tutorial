# 构造函数与原型

## 定义

JavaScript 通过**原型（prototype）**实现对象之间的继承与方法共享：每个函数有 `prototype` 属性，每个对象有内部原型链接（现代写法用 `Object.getPrototypeOf`），查找属性时沿这条**原型链**向上搜索。`new` 运算符用于创建实例并绑定原型。

## 概念要点

- **`new` 做了什么**（简化）：① 创建空对象 ② 将对象 `[[Prototype]]` 指向构造函数的 `prototype` ③ 以 `this` 绑定新对象执行构造函数 ④ 若构造函数未返回对象，则返回该新对象。
- **`prototype`**：函数上的对象，实例共享其上的方法与属性。
- **`__proto__`**：已废弃术语，指实例到构造函数的 `prototype` 的链接；请用 `Object.getPrototypeOf(obj)`。
- **`constructor`**：`prototype` 上的属性，默认指回构造函数本身。
- **原型链查找**：自身 → 原型 → 原型的原型 → … → `null`。
- **ES6 继承**：`class` / `extends` 是原型的语法糖 → 详见 [类实践](./classes)。
- **`Object.create(proto)`**：以指定对象为原型创建新对象；了解即可，日常更常用 `class` 或组合。

## 三者关系

| 名称                         | 谁拥有          | 含义                                  |
| ---------------------------- | --------------- | ------------------------------------- |
| `Fn.prototype`               | 函数 `Fn`       | 实例共享的原型对象                    |
| 实例 `obj`                   | `new Fn()` 创建 | 具体对象                              |
| `obj.constructor`            | 实例（通常）    | 指向 `Fn`（经 prototype.constructor） |
| `Object.getPrototypeOf(obj)` | 实例            | 等价于旧称 `obj.__proto__`            |

```
实例 obj  ──[[Prototype]]──▶  Fn.prototype  ──[[Prototype]]──▶  Object.prototype  ──▶  null
                ▲                      │
                └──── constructor ─────┘（默认指回 Fn）
```

## new 与属性查找

| 步骤         | 说明                                                      |
| ------------ | --------------------------------------------------------- |
| 1            | 创建新对象，`[[Prototype]]` = `Constructor.prototype`     |
| 2            | 执行 `Constructor.call(新对象, ...args)`                  |
| 3            | 若构造函数返回对象则用该对象，否则返回新对象              |
| 查找 `obj.x` | 先 `obj` 自身 → `Fn.prototype` → … 直到找到或 `undefined` |

## 示例

### 构造函数 + 原型方法

```javascript
function Person(name) {
  this.name = name; // 实例自有属性
}

// 方法放 prototype，所有实例共享一份
Person.prototype.greet = function () {
  return `你好，我是 ${this.name}`;
};

const alice = new Person("Alice");
const bob = new Person("Bob");

alice.greet(); // '你好，我是 Alice'
alice.greet === bob.greet; // true — 同一函数引用
```

### 原型链查找

```javascript
const arr = [1, 2, 3];
arr.push(4); // 自身无 push，沿链找到 Array.prototype.push

Object.getPrototypeOf(arr) === Array.prototype; // true
Object.getPrototypeOf(Array.prototype) === Object.prototype; // true
Object.getPrototypeOf(Object.prototype); // null
```

### 继承直觉（原型方式）

```javascript
function Animal(type) {
  this.type = type;
}
Animal.prototype.speak = function () {
  return `${this.type} 发出声音`;
};

function Dog(name) {
  Animal.call(this, "犬"); // 借用构造函数初始化实例属性
  this.name = name;
}

// 建立原型链：Dog.prototype → Animal.prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function () {
  return `${this.name} 汪汪！`;
};

const d = new Dog("旺财");
d.speak(); // '旺财 汪汪！'
```

> 现代项目请用 `class Dog extends Animal { … }`，见 [类实践](./classes)。

### Object.create 一句

```javascript
const proto = {
  greet() {
    return "hi";
  },
};
const obj = Object.create(proto); // obj 的原型是 proto
obj.greet(); // 'hi'
```

## 易错点与交叉引用

| 问题                                  | 说明                                            |
| ------------------------------------- | ----------------------------------------------- |
| 忘记 `new`                            | 普通调用时 `this` 可能指向全局（严格模式报错）  |
| 方法写在构造函数内                    | 每个实例一份函数，浪费内存 → 放 `prototype`     |
| 直接覆盖 `prototype` 丢 `constructor` | 覆盖后补 `Dog.prototype.constructor = Dog`      |
| 混淆 `__proto__` 与 `prototype`       | 前者是实例的链接，后者是函数的属性              |
| `instanceof`                          | 检测 `Constructor.prototype` 是否在实例原型链上 |
| 深度继承手写易错                      | 优先 `class extends` → [类实践](./classes)      |

**相关章节**：[对象](./objects) · [函数与作用域](./functions-scope) · [类实践](./classes) · [作用域与闭包](./scope-closure)

## MDN 参考

- [继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [new 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
- [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [Object.getPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
- [constructor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
- [instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
