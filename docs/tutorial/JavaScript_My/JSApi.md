## 全局函数 & 对象

### 全局值(Value Properties)

| 名称         | 类型      | 说明                                            |
| ------------ | --------- | ----------------------------------------------- |
| `globalThis` | object    | 统一全局对象(浏览器/Node/Worker)                |
| `Infinity`   | number    | 正无穷大(`Number.POSITIVE_INFINITY` 的全局暴露) |
| `NaN`        | number    | 非数字(Not-a-Number)常量                        |
| `undefined`  | undefined | 未定义值(全局属性，勿作为变量名使用)            |

### 全局关键字 (KeyWords Properties)

| 流程控制（Control Flow） | 说明                         |
| ------------------------ | ---------------------------- |
| `if`                     | 条件判断，决定是否执行代码   |
| `else`                   | `if` 条件不成立时执行        |
| `switch`                 | 多分支条件判断（基于值匹配） |
| `case`                   | `switch` 中的具体匹配分支    |
| `default`                | `switch` 的兜底分支          |
| `for`                    | 常规循环（已知循环次数）     |
| `while`                  | 条件为真时循环               |
| `do`                     | 至少执行一次的循环           |
| `break`                  | 立即跳出循环或 `switch`      |
| `continue`               | 跳过当前循环，进入下一次     |

| 异常处理（Error Handling） | 说明                 |
| -------------------------- | -------------------- |
| `try`                      | 包裹可能出错的代码   |
| `catch`                    | 捕获并处理异常       |
| `finally`                  | 无论是否出错都会执行 |
| `throw`                    | 主动抛出一个错误     |

| 变量与作用域（Variables & Scope） | 说明                                     |
| --------------------------------- | ---------------------------------------- |
| `var`                             | 旧式变量声明（函数作用域，存在变量提升） |
| `let`                             | 块级作用域变量（现代 JS 推荐）           |
| `const`                           | 声明常量（不可重新赋值）                 |

| 值与基础类型（Primitive Values） | 说明                       |
| -------------------------------- | -------------------------- |
| `true`                           | 布尔值：真                 |
| `false`                          | 布尔值：假                 |
| `null`                           | 空对象引用（人为设置的空） |

| 函数与执行控制（Functions） | 说明                                 |
| --------------------------- | ------------------------------------ |
| `function`                  | 声明函数                             |
| `return`                    | 返回结果并结束函数执行               |
| `this`                      | 当前执行上下文对象（由调用方式决定） |

| 面向对象 / 类（OOP & Class） | 说明                       |
| ---------------------------- | -------------------------- |
| `class`                      | 定义类（ES6 语法糖）       |
| `extends`                    | 类继承                     |
| `super`                      | 调用父类构造器或方法       |
| `new`                        | 创建实例对象               |
| `instanceof`                 | 判断实例是否属于某构造函数 |
| `static`                     | 定义类的静态属性或方法     |
| `get`                        | 定义属性读取器             |
| `set`                        | 定义属性设置器             |

| 模块化（ES Module） | 说明         |
| ------------------- | ------------ |
| `import`            | 引入模块内容 |
| `export`            | 导出模块内容 |

| 异步与并发（Async / Await） | 说明                         |
| --------------------------- | ---------------------------- |
| `async`                     | 声明异步函数（返回 Promise） |
| `await`                     | 等待 Promise 执行完成        |

| 迭代与生成器（Iteration） | 说明                           |
| ------------------------- | ------------------------------ |
| `of`                      | 用于 `for...of` 遍历可迭代对象 |
| `yield`                   | 生成器中暂停执行并返回值       |

| 类型判断与运算（Type & Operator） | 说明                       |
| --------------------------------- | -------------------------- |
| `typeof`                          | 判断变量类型（返回字符串） |
| `in`                              | 判断属性是否存在于对象中   |
| `delete`                          | 删除对象的属性             |
| `void`                            | 表达式返回 `undefined`     |

| 调试与特殊语法（Misc） | 说明                                 |
| ---------------------- | ------------------------------------ |
| `debugger`             | 触发断点调试                         |
| `with` ⚠️              | 修改作用域链（已废弃，严格模式禁用） |

| 保留关键字（Reserved Words） | 说明                             |
| ---------------------------- | -------------------------------- |
| `enum`                       | 未来保留（常见于 TypeScript）    |
| `implements`                 | 接口实现（TS 用）                |
| `interface`                  | 接口声明（TS 用）                |
| `public`                     | 访问修饰符（TS 用）              |
| `private`                    | 私有成员（TS 用）                |
| `protected`                  | 受保护成员（TS 用）              |
| `package`                    | 保留字                           |
| `await*`                     | 非模块 / 非 async 环境中是保留字 |

### 全局函数(Function Properties)

| 名称                      | 返回值     | 简介                                   |
| ------------------------- | ---------- | -------------------------------------- |
| `eval(code \| string)`    | any        | 执行一段字符串代码(高风险，尽量避免)   |
| `isFinite(testValue)`     | boolean    | 判断是否有限数(会做类型转换)           |
| `isNaN(testValue)`        | boolean    | 判断是否 NaN(会做类型转换)             |
| `parseFloat(string)`      | number/NaN | 字符串解析成浮点数                     |
| `parseInt(str, radix?)`   | number/NaN | 字符串解析成整数(建议显式 radix)       |
| `encodeURI(URI)`          | string     | 编码整段 URI                           |
| `encodeURIComponent(URI)` | string     | 编码 URI 组件(更常用)                  |
| `decodeURI(URI)`          | string     | 解码整段 URI(不会解码保留字符)         |
| `decodeURIComponent(URI)` | string     | 解码 URI 组件                          |
| `structuredClone(value)`  | object     | 深度结构化克隆(支持循环、Map、Date 等) |

### 全局构造器/对象(Constructor/Other Properties)

| 名称                         | 类型     | 简介                                 |
| ---------------------------- | -------- | ------------------------------------ |
| Object                       | function | 普通对象的构造器/工具集入口          |
| Function                     | function | 函数构造器(动态创建函数)             |
| Array                        | function | 数组构造器/工具集入口                |
| Boolean                      | function | 布尔包装对象构造器                   |
| String                       | function | 字符串包装对象构造器/工具集入口      |
| Number                       | function | 数字包装对象构造器/工具集入口        |
| Math                         | object   | 数学工具对象(全静态)                 |
| Date                         | function | 日期时间构造器                       |
| JSON                         | object   | JSON 解析/序列化工具                 |
| Map                          | function | 键值对集合(可迭代、键可为任意值)     |
| Set                          | function | 值集合(去重、可迭代)                 |
| Symbol                       | function | Symbol 原始值工厂函数                |
| Promise                      | function | 异步结果容器                         |
| RegExp                       | function | 正则构造器                           |
| Error                        | function | 通用错误构造器                       |
| AggregateError               | function | 聚合错误(常见 Promise.any 全失败)    |
| EvalError                    | function | 历史错误类型(很少用)                 |
| RangeError                   | function | 越界/范围错误                        |
| ReferenceError               | function | 引用未定义变量等错误                 |
| SyntaxError                  | function | 语法错误                             |
| TypeError                    | function | 类型错误                             |
| URIError                     | function | URI 编解码错误                       |
| BigInt                       | function | BigInt 原始值工厂函数                |
| ArrayBuffer                  | function | 原始二进制缓冲区                     |
| SharedArrayBuffer            | function | 可共享二进制缓冲区(受安全策略影响)   |
| DataView                     | function | 以多类型/端序读写 buffer             |
| Int8Array 等 TypedArray      | function | 类型化数组视图(多种数值类型)         |
| BigInt64Array/BigUint64Array | function | BigInt 类型化数组视图                |
| Atomics                      | object   | 原子操作工具(配合 SharedArrayBuffer) |
| WeakMap                      | function | 弱引用键集合(键必须是对象、不可枚举) |
| WeakSet                      | function | 弱引用值集合(值必须是对象、不可枚举) |
| WeakRef                      | function | 弱引用包装(deref 可能为空)           |
| FinalizationRegistry         | function | 对象回收后回调注册(时序不保证)       |
| GeneratorFunction            | function | 生成器函数构造器对象                 |
| AsyncGeneratorFunction       | function | 异步生成器函数构造器对象             |
| AsyncFunction                | function | async 函数构造器对象                 |
| Reflect                      | object   | 反射工具集(与 Proxy 配套)            |
| Proxy                        | function | 代理对象(拦截底层操作)               |
| Intl                         | object   | 国际化命名空间(ECMA-402)             |

## Object

**静态方法/属性**

| API                                                  | 类型     | 返回值  | 说明                                   |
| ---------------------------------------------------- | -------- | ------- | -------------------------------------- |
| Object.keys()                                        | function | Array   | 返回可枚举自身字符串键数组             |
| Object.values()                                      | function |         | 返回可枚举自身值数组                   |
| `Object.entries(obj)`                                | function | Array   | 返回 [key,value] 数组                  |
| Object.fromEntries()                                 | function |         | [key,value] 数组 → 对象                |
| `Object.assign(target, ...sources)`                  | function | object  | 浅拷贝合并对象                         |
| `Object.create(proto, propertiesObject?)`            | function | object  | 指定原型创建对象,可带属性描述符        |
| `Object.defineProperty(obj, prop, {descriptor})`     | function | object  | 定义/修改单个属性描述符                |
| `Object.defineProperties(obj, {prop1:{descriptor}})` | function | object  | 批量定义属性描述符                     |
| Object.getOwnPropertyDescriptor()                    | function |         | 获取单个属性描述符                     |
| Object.getOwnPropertyDescriptors()                   | function |         | 获取所有自身属性描述符                 |
| Object.getOwnPropertyNames()                         | function |         | 所有自身属性名(含不可枚举)             |
| Object.getOwnPropertySymbols()                       | function |         | 所有自身 Symbol 属性                   |
| Object.preventExtensions()                           | function |         | 禁止添加新属性                         |
| Object.isExtensible()                                | function |         | 判断对象是否可扩展                     |
| Object.seal()                                        | function |         | 浅密封(不可配置+不可扩展)              |
| Object.isSealed()                                    | function | Boolean | 判断对象是否已密封                     |
| `Object.freeze(obj)`                                 | function |         | 浅冻结                                 |
| Object.isFrozen()                                    | function | Boolean | 判断对象是否已冻结                     |
| Object.hasOwn()                                      | function |         | 判断是否有自身属性(推荐)               |
| Object.setPrototypeOf()                              | function |         | 设置原型(谨慎使用)                     |
| Object.getPrototypeOf()                              | function |         | 获取原型                               |
| Object.is                                            | function | Boolean | SameValue 比较(区分 `+0/-0`，`NaN` 等) |

**实例方法**

| API/属性                          | 类型     | 返回值 | 简介                               |
| --------------------------------- | -------- | ------ | ---------------------------------- |
| constructor                       | property |        | 指向构造函数(可被改写，不要强依赖) |
| hasOwnProperty                    | function |        | 自有属性判断(可能被覆盖)           |
| isPrototypeOf                     | function |        | 判断当前对象是否出现在对方原型链上 |
| propertyIsEnumerable              | function |        | 判断属性是否可枚举                 |
| toString                          | function |        | 返回 `"[object Type]"` 形式字符串  |
| toLocaleString                    | function |        | 本地化字符串表现                   |
| valueOf                           | function |        | 返回原始值(对象通常返回自身)       |
| **proto**                         | accessor |        | 历史遗留的原型访问器(不推荐)       |
| **defineGetter**/**defineSetter** | function |        | 历史 getter/setter API(不推荐)     |
| **lookupGetter**/**lookupSetter** | function |        | 历史查询 getter/setter(不推荐)     |

## Function

**静态属性**

| API             | 说明                   | 备注 |
| --------------- | ---------------------- | ---- |
| Function.length | 期望参数个数(固定参数) |      |

**实例属性/方法**

| API        | 说明                       | 备注 |
| ---------- | -------------------------- | ---- |
| length     | 形参数量(不含 rest 参数)   |      |
| name       | 函数名称(匿名函数可能为空) |      |
| call()     | 指定 this 调用             |      |
| apply()    | 指定 this + 参数数组调用   |      |
| bind()     | 绑定 this 并返回新函数     |      |
| toString() | 返回函数源码字符串         |      |

## Array

**静态方法**

| API             | 说明                     | 备注 |
| --------------- | ------------------------ | ---- |
| Array.isArray() | 判断是否为真数组         |      |
| Array.from()    | 类数组/可迭代对象 → 数组 |      |
| Array.of()      | 根据参数创建数组         |      |

**实例属性/方法(按是否修改原数组分类)**

**修改原数组的方法**

| API                 | 说明                     | 备注 |
| ------------------- | ------------------------ | ---- |
| push() / pop()      | 末尾添加/删除            |      |
| unshift() / shift() | 头部添加/删除            |      |
| splice()            | 删除/插入/替换           |      |
| sort()              | 排序(默认 Unicode)       |      |
| reverse()           | 反转数组                 |      |
| copyWithin()        | 原地复制一段复制到另一段 |      |

**不修改原数组的方法(返回新数组)**

| API                | 说明                       | 备注          |
| ------------------ | -------------------------- | ------------- |
| concat()           | 拼接                       |               |
| slice()            | 切片                       |               |
| map()              | 映射                       |               |
| filter()           | 过滤                       |               |
| flat() / flatMap() | 扁平化                     |               |
| toReversed()       | 返回反转后的新数组         | ES2023 新特性 |
| toSorted()         | 返回排序后的新数组         | ES2023 新特性 |
| toSpliced()        | 返回 splice 后的新数组     | ES2023 新特性 |
| with(index, value) | 返回替换指定索引后的新数组 | ES2023 新特性 |

**查找/判断/遍历**

| API                          | 说明                          | 备注          |
| ---------------------------- | ----------------------------- | ------------- |
| at(index)                    | 支持负数索引取值              | ES2022 新特性 |
| includes()                   | 是否包含某值                  |               |
| indexOf() / lastIndexOf()    | 查找索引(===)                 |               |
| find() / findIndex()         | 查找第一个满足条件的元素/索引 |               |
| findLast() / findLastIndex() | 从后往前查找                  | ES2023 新特性 |
| some() / every()             | 部分/全部满足条件             |               |
| forEach()                    | 遍历(无返回值)                |               |
| reduce() / reduceRight()     | 归并/累加                     |               |
| join()                       | 连接成字符串                  |               |
| toString()                   | 相当于 join(',')              |               |

## String

**静态方法**(无常用)

**实例属性/方法**

| API                              | 说明                          | 备注          |
| -------------------------------- | ----------------------------- | ------------- |
| length                           | 字符串长度                    |               |
| at(index)                        | 支持负索引                    | ES2022 新特性 |
| charAt() / charCodeAt()          | 获取字符 / Unicode            |               |
| indexOf() / lastIndexOf()        | 查找位置                      |               |
| includes()                       | 是否包含                      |               |
| startsWith() / endsWith()        | 判断开头/结尾                 |               |
| slice() / substring()            | 截取(substr 已废弃)           |               |
| trim() / trimStart() / trimEnd() | 去空格                        |               |
| padStart() / padEnd()            | 填充到指定长度                | ES2017        |
| repeat(count)                    | 重复 n 次                     |               |
| replace() / replaceAll()         | 替换(replaceAll 为 ES2021)    |               |
| split()                          | 按分隔符拆数组                |               |
| toLowerCase() / toUpperCase()    | 大小写转换                    |               |
| localeCompare()                  | 本地化比较                    |               |
| match() / matchAll()             | 正则匹配(matchAll 返回迭代器) | ES2020        |
| search()                         | 返回正则匹配位置              |               |
| normalize()                      | Unicode 标准化                |               |

## Number

**静态属性/方法**

| API                              | 说明         | 备注 |
| -------------------------------- | ------------ | ---- |
| Number.EPSILON                   | 最小精度差   | ES6  |
| Number.MAX_SAFE_INTEGER          | 最大安全整数 | ES6  |
| Number.MIN_SAFE_INTEGER          | 最小安全整数 | ES6  |
| Number.isNaN()                   | 真 NaN 判断  | ES6  |
| Number.isFinite()                | 真有限数判断 | ES6  |
| Number.isInteger()               | 是否整数     | ES6  |
| Number.isSafeInteger()           | 是否安全整数 | ES6  |
| Number.parseInt() / parseFloat() | 字符串转数字 | ES6  |

**实例方法**

| API              | 说明                  |
| ---------------- | --------------------- |
| toFixed(n)       | 保留 n 位小数(字符串) |
| toPrecision(n)   | 有效数字位数          |
| toExponential(n) | 科学计数法            |
| toString(radix)  | 转为指定进制字符串    |
| valueOf()        | 返回原始数值          |

## Math(全静态)

| API                                       | 说明                   | 备注 |
| ----------------------------------------- | ---------------------- | ---- |
| Math.PI / Math.E                          | 圆周率 / 自然对数底数  |      |
| Math.abs()                                | 绝对值                 |      |
| Math.floor() / ceil() / round() / trunc() | 各种舍入               |      |
| Math.max() / min()                        | 最值                   |      |
| Math.pow() / sqrt() / cbrt()              | 幂 / 平方根 / 立方根   |      |
| Math.random()                             | [0,1) 随机数           |      |
| Math.sign()                               | 返回 -1 / 0 +1         | ES6  |
| Math.log() / log10() / log2() / log1p()   | 对数                   | ES6  |
| Math.sin() / cos() / tan() / asin() 等    | 三角函数               |      |
| Math.sinh() / cosh() / tanh() 等          | 双曲函数               | ES6  |
| Math.hypot(...args)                       | 斜边长度(√(x²+y²+...)) | ES6  |
| Math.clz32()                              | 前导零个数(32 位)      | ES6  |
| Math.imul()                               | 32 位整数乘法          | ES6  |
| Math.fround()                             | 转为 32 位浮点数       | ES6  |

## Date

**静态方法**

| API          | 说明            |
| ------------ | --------------- |
| Date.now()   | 当前时间戳(ms)  |
| Date.parse() | 字符串 → 时间戳 |
| Date.UTC()   | UTC 时间        |

**实例方法(常用)**

| API                                        | 说明               |
| ------------------------------------------ | ------------------ |
| getFullYear() / getMonth() / getDate() 等  | 本地时间组件       |
| getUTCFullYear() 等                        | UTC 时间组件       |
| setFullYear() 等                           | 设置时间组件       |
| getTime() / setTime()                      | 时间戳操作         |
| toISOString()                              | ISO 8601 格式(UTC) |
| toJSON()                                   | 等同 toISOString() |
| toLocaleString() / toLocaleDateString() 等 | 本地化格式         |

## JSON(全静态)

| API              | 说明                                |
| ---------------- | ----------------------------------- |
| JSON.parse()     | 字符串 → JS 值                      |
| JSON.stringify() | JS 值 → 字符串(可传 replacer/space) |

## Promise

**静态方法**

| API                     | 说明                              | 备注                |
| ----------------------- | --------------------------------- | ------------------- |
| Promise.resolve()       | 快速返回 resolved Promise         |                     |
| Promise.reject()        | 快速返回 rejected Promise         |                     |
| Promise.all()           | 全部成功才成功                    |                     |
| Promise.allSettled()    | 所有都完成(无论成功失败)          | ES2020              |
| Promise.any()           | 第一个成功即成功                  | ES2021 新特性       |
| Promise.race()          | 第一个完成(无论成功失败)          |                     |
| Promise.withResolvers() | 返回 `{promise, resolve, reject}` | ES2024 提案(已落地) |

**实例方法**

| API       | 说明           |
| --------- | -------------- |
| then()    | 成功回调       |
| catch()   | 失败回调       |
| finally() | 无论如何都执行 |

## Map

**实例属性/方法**

| API               | 说明         |
| ----------------- | ------------ |
| size              | 元素个数     |
| set() / get()     | 设置/获取    |
| has()             | 是否存在 key |
| delete()          | 删除         |
| clear()           | 清空         |
| keys()            | 遍历键值对   |
| keys() / values() | 遍历键/值    |
| forEach()         | 遍历         |

## Set

**实例属性/方法**

| API                           | 说明                        |
| ----------------------------- | --------------------------- |
| size                          | 元素个数                    |
| add()                         | 添加(去重)                  |
| has() / delete() / clear()    | 同 Map                      |
| keys() / values() / entries() | keys() 和 values() 都返回值 |
| forEach()                     | 遍历                        |

## Symbol

**静态方法**

| API                | 说明               |
| ------------------ | ------------------ |
| Symbol.for(key)    | 全局 Symbol 注册表 |
| Symbol.keyFor(sym) | 获取注册表中的 key |

**常用内置 Symbol(Well-known Symbols)**

| Symbol                                  | 说明                               | 备注          |
| --------------------------------------- | ---------------------------------- | ------------- |
| Symbol.iterator                         | 可迭代协议                         |               |
| Symbol.asyncIterator                    | 异步可迭代协议                     |               |
| Symbol.toStringTag                      | 自定义 Object.prototype.toString() |               |
| Symbol.hasInstance                      | 自定义 instanceof                  |               |
| Symbol.species                          | 控制衍生类构造函数                 |               |
| Symbol.match / search / replace / split | 正则相关                           |               |
| Symbol.toPrimitive                      | 自定义类型转换                     |               |
| Symbol.dispose                          | 同步资源清理(using)                | ES2024 新特性 |
| Symbol.asyncDispose                     | 异步资源清理(await using)          | ES2024 新特性 |
