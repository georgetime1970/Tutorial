# 类实践

## 定义

**class** 是 ES6 引入的创建对象的语法糖，底层仍是原型继承。通过 `constructor` 初始化实例、在类体中定义方法/访问器，用 `extends` / `super` 实现子类继承。TypeScript 在 JS class 基础上增加**访问修饰符**、**readonly**、**implements** 等编译期类型能力。

## 概念要点

- **class 字段**：实例或静态属性可直接在类体声明（ES2022+）。
- **constructor**：实例化时执行，`super()` 在子类中必须先于 `this` 使用。
- **get / set**：属性访问器，控制读写逻辑。
- **static**：属于类本身，不在实例上。
- **extends / super**：子类继承父类；`super()` 调父构造，`super.method()` 调父方法。
- **原型本质**：`class` 等价于构造函数 + `prototype` → 详见 [构造函数与原型](./prototype)。
- **TypeScript**：修饰符与类型仅编译期存在，编译后擦除。

## JavaScript class 清单

| 语法               | 作用             | 示例                                     |
| ------------------ | ---------------- | ---------------------------------------- |
| 类字段             | 实例属性         | `name = '默认'`                          |
| `constructor()`    | 初始化           | `constructor(name) { this.name = name }` |
| 方法简写           | 实例方法         | `greet() { … }`                          |
| `get prop()`       | 读取访问器       | `get fullName() { … }`                   |
| `set prop(v)`      | 写入访问器       | `set age(v) { … }`                       |
| `static` 方法/字段 | 类级别           | `static create() { … }`                  |
| `#privateField`    | 真私有（ES2022） | `#count = 0`                             |
| `extends`          | 继承             | `class Dog extends Animal`               |
| `super()`          | 父类构造         | 子类 `constructor` 首行                  |
| `super.method()`   | 调用父类方法     | 重写时扩展父逻辑                         |

## 示例

### 基础 class

```javascript
class User {
  // 类字段：实例属性
  role = "guest";

  constructor(name) {
    this.name = name; // 构造器中初始化
  }

  greet() {
    return `你好，${this.name}`;
  }

  get displayName() {
    return this.name.toUpperCase();
  }

  static fromJSON(obj) {
    return new User(obj.name); // 静态工厂方法
  }
}

const u = new User("Alice");
u.greet(); // '你好，Alice'
u.displayName; // 'ALICE'
User.fromJSON({ name: "Bob" });
```

### extends 与 super

```javascript
class Animal {
  constructor(type) {
    this.type = type;
  }
  speak() {
    return `${this.type} 发出声音`;
  }
}

class Dog extends Animal {
  constructor(name) {
    super("犬"); // 必须先调用 super()
    this.name = name;
  }
  speak() {
    return `${super.speak()} — ${this.name} 汪汪！`;
  }
}

new Dog("旺财").speak();
```

### 私有字段

```javascript
class BankAccount {
  #balance = 0; // 真私有，类外不可访问

  deposit(amount) {
    this.#balance += amount;
  }
  getBalance() {
    return this.#balance;
  }
}
```

## TypeScript 类实践

TypeScript 类在 JS 语法上扩展类型与可见性，编译后为普通 JS class。

### 访问修饰符

| 修饰符      | 含义         | 类外 | 子类 |
| ----------- | ------------ | ---- | ---- |
| `public`    | 公开（默认） | ✅   | ✅   |
| `private`   | 仅本类       | ❌   | ❌   |
| `protected` | 本类 + 子类  | ❌   | ✅   |

```typescript
class Account {
  public id: string; // 公开：外部可读
  private pin: string; // 私有：仅类内部
  protected balance: number; // 保护：子类可访问

  constructor(id: string, pin: string) {
    this.id = id;
    this.pin = pin;
    this.balance = 0;
  }

  private verify(input: string): boolean {
    return input === this.pin;
  }
}
```

### readonly 与 implements

```typescript
class Point {
  readonly x: number; // 只能在声明或构造中赋值
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

// 接口描述「形状」，类 implements 承诺实现
interface Drawable {
  draw(): void;
}

class Circle implements Drawable {
  draw(): void {
    console.log("绘制圆");
  }
}
```

### 参数属性简写

在构造函数参数前加修饰符，自动声明并赋值实例属性：

```typescript
class Product {
  // 等价于声明 readonly id + constructor 里 this.id = id
  constructor(
    public readonly id: string,
    public name: string,
    private stock: number = 0,
  ) {}

  restock(qty: number): void {
    this.stock += qty; // private 仅类内
  }
}

const p = new Product("p1", "键盘");
console.log(p.name); // OK
// console.log(p.stock); // 编译错误：private
```

### TS 继承示例

```typescript
class Entity {
  protected createdAt = Date.now();
}

class Article extends Entity {
  constructor(
    public title: string,
    public content: string,
  ) {
    super();
  }
}
```

## 易错点与交叉引用

| 问题                   | 说明                                                               |
| ---------------------- | ------------------------------------------------------------------ |
| 子类忘记 `super()`     | 子类 `constructor` 访问 `this` 前必须 `super()`                    |
| 把 class 当纯对象      | 必须 `new ClassName()` 实例化（除非静态方法）                      |
| 方法作为回调丢 `this`  | 用箭头函数字段或 `bind` → [advanced-patterns](./advanced-patterns) |
| TS `private` vs JS `#` | TS 修饰符编译后消失；`#` 是运行时真私有                            |
| 过度使用继承           | 组合优于继承；小项目 `class` + 模块即可                            |
| 循环 import            | 模块间互引 → [模块化](./modules)                                   |

**相关章节**：[构造函数与原型](./prototype) · [对象](./objects) · [模块化](./modules) · [作用域与闭包](./scope-closure)

## MDN 参考

- [Classes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)
- [constructor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/constructor)
- [extends](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends)
- [static](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/static)
- [私有属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Private_properties)
- [TypeScript: Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
