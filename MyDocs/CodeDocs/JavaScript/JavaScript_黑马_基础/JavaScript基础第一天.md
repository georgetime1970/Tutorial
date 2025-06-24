

#  JavaScript 基础 - 第1天

> 了解变量、数据类型、运算符等基础概念，能够实现数据类型的转换，结合四则运算体会如何编程。

- 体会现实世界中的事物与计算机的关系
- 理解什么是数据并知道数据的分类
- 理解变量存储数据的“容器”
- 掌握常见运算符的使用，了解优先级关系
- 知道 JavaScript 数据类型隐式转换的特征

## 介绍

> 掌握 JavaScript 的引入方式，初步认识 JavaScript 的作用

### 引入方式

JavaScript 程序不能独立运行，它需要被嵌入 HTML 中，然后浏览器才能执行 JavaScript 代码。通过 `script` 标签将 JavaScript 代码引入到 HTML 中，有两种方式：

#### 内部方式

通过 `script` 标签包裹 JavaScript 代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 引入方式</title>
</head>
<body>
  <!-- 内联形式：通过 script 标签包裹 JavaScript 代码 -->
  <script>
    alert('嗨，欢迎来传智播学习前端技术！')
  </script>
</body>
</html>
```

#### 外部形式

一般将 JavaScript 代码写在独立的以 .js 结尾的文件中，然后通过 `script` 标签的 `src` 属性引入

```javascript
// demo.js
document.write('嗨，欢迎来传智播学习前端技术！')
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 引入方式</title>
</head>
<body>
  <!-- 外部形式：通过 script 的 src 属性引入独立的 .js 文件 -->
  <script src="demo.js"></script>
</body>
</html>
```

> 如果 script 标签使用 `src` 属性引入了某` .js `文件，那么 标签的代码会被忽略！！！如下代码所示：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 引入方式</title>
</head>
<body>
  <!-- 外部形式：通过 script 的 src 属性引入独立的 .js 文件 -->
  <script src="demo.js">
    // 此处的代码会被忽略掉！！！！
  	alert(666);  
  </script>
</body>
</html>
```

###  注释和结束符

通过注释可以屏蔽代码被执行或者添加备注信息，JavaScript 支持两种形式注释语法：

#### 单行注释

使用 `// ` 注释单行代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 注释</title>
</head>
<body>
  
  <script>
    // 这种是单行注释的语法
    // 一次只能注释一行
    // 可以重复注释
    document.write('嗨，欢迎来传智播学习前端技术！');
  </script>
</body>
</html>
```

#### 多行注释

使用 `/* */` 注释多行代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 注释</title>
</head>
<body>
  
  <script>
    /* 这种的是多行注释的语法 */
    /*
    	更常见的多行注释是这种写法
    	在些可以任意换行
    	多少行都可以
      */
    document.write('嗨，欢迎来传智播学习前端技术！')
  </script>
</body>
</html>
```

> `VSCode`中单行注释的快捷键为 `ctrl + /`, 多行注释为`ctrl + shift + A`

### 结束符

在 JavaScript 中 `;` 代表一段代码的结束，多数情况下可以省略 `;` 使用回车（enter）替代。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 结束符</title>
</head>
<body>
  
  <script> 
    alert(1);
    alert(2);
    alert(1)
    alert(2)
  </script>
</body>
</html>
```

实际开发中有许多人主张书写 JavaScript 代码时省略结束符 `;`

### 输入和输出

输出和输入也可理解为人和计算机的交互，用户通过键盘、鼠标等向计算机输入信息，计算机处理后再展示结果给用户，这便是一次输入和输出的过程。

举例说明：如按键盘上的方向键，向上/下键可以滚动页面，按向上/下键这个动作叫作输入，页面发生了滚动了这便叫输出。

#### 输出

JavaScript 可以接收用户的输入，然后再将输入的结果输出：`alert()`、`document.wirte()`、`console.log`

以数字为例，向 `alert()` 或 `document.write()`输入任意数字，会以弹窗或渲染页面的形式展示（输出）给用户。

####  输入

向 `prompt()` 输入任意内容会以弹窗形式出现在浏览器中，一般提示用户输入一些内容。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 输入输出</title>
</head>
<body>
  
  <script> 
    // 1. 输入的任意数字，都会以弹窗形式展示
    document.write('要输出的内容')
    alert('要输出的内容');

    // 2. 以弹窗形式提示用户输入姓名，注意这里的文字使用英文的引号
    prompt('请输入您的姓名:')
  </script>
</body>
</html>
```

## 变量

> 理解变量是计算机存储数据的“容器”，掌握变量的声明方式

变量是计算机中用来存储数据的“容器”，它可以让计算机变得有记忆，通俗的理解变量就是使用【某个符号】来代表【某个具体的数值】（数据）

```html
<script>
  // x 符号代表了 5 这个数值
  x = 5
  // y 符号代表了 6 这个数值
  y = 6
    
  //举例： 在 JavaScript 中使用变量可以将某个数据（数值）记录下来！

  // 将用户输入的内容保存在 num 这个变量（容器）中
  num = prompt('请输入一数字!')

  // 通过 num 变量（容器）将用户输入的内容输出出来
  alert(num)
  document.write(num)
</script>
```

### 声明

声明(定义)变量有两部分构成：声明关键字、变量名（标识）

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 声明和赋值</title>
</head>
<body>
  
  <script> 
    // let 变量名
    // 声明(定义)变量有两部分构成：声明关键字、变量名（标识）
    // let 即关键字，所谓关键字是系统提供的专门用来声明（定义）变量的词语
    // age 即变量的名称，也叫标识符
    let age
  </script>
</body>
</html>
```

关键字是 JavaScript 中内置的一些英文词汇（单词或缩写），它们代表某些特定的含义，如 `let` 的含义是声明变量的，看到 `let`  后就可想到这行代码的意思是在声明变量，如 `let age;` 

`let` 和 `var` 都是 JavaScript 中的声明变量的关键字，推荐使用 `let` 声明变量！！！

### 赋值

声明（定义）变量相当于创造了一个空的“容器”，通过赋值向这个容器中添加数据。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 声明和赋值</title>
</head>
<body>
  
  <script> 
    // 声明(定义)变量有两部分构成：声明关键字、变量名（标识）
    // let 即关键字，所谓关键字是系统提供的专门用来声明（定义）变量的词语
    // age 即变量的名称，也叫标识符
    let age
    // 赋值，将 18 这个数据存入了 age 这个“容器”中
    age = 18
    // 这样 age 的值就成了 18
    document.write(age)
    
    // 也可以声明和赋值同时进行
    let str = 'hello world!'
    alert(str);
  </script>
</body>
</html>
```

### 声明变量关键字

JavaScript 使用专门的关键字 `let` 和 `var` 来声明（定义）变量，在使用时需要注意一些细节：

以下是使用 `let` 时的注意事项：

1. 允许声明和赋值同时进行
2. 不允许重复声明
3. 允许同时声明多个变量并赋值,用逗号隔开 ` let a, b ,c = 1, 2, 3`,`let [a,  b, c] = [1, 2, 3]` 一般多用于解构赋值
4. JavaScript 中内置的一些关键字不能被当做变量名

以下是使用 `var` 时的注意事项：

2. 允许声明和赋值同时进行
2. 允许重复声明
3. 允许同时声明多个变量并赋值

大部分情况使用 `let` 和 `var` 区别不大，但是 `let` 相较 `var` 更严谨，因此推荐使用 `let`，后期会更进一步介绍二者间的区别。

### 变量名命名规则

关于变量的名称（标识符）有一系列的规则需要遵守：

1. 只能是`字母`、`数字`、下划线`_`、`$`，且不能能数字开头, 唯一的2个符号`_`和`$`
2. 字母区分大小写，如 Age 和 age 是不同的变量
3. JavaScript 内部已占用单词（关键字或保留字）不允许使用
4. 尽量保证变量具有一定的语义，见字知义
5. 驼峰命名: 第一个单词首字母小写, 后面的单词首字母都大写

| 开头符号 | 常见用途                          | 举例                          | 含义                         |
| -------- | --------------------------------- | ----------------------------- | ---------------------------- |
| `_`      | 私有变量、占位符、lodash库        | `_name`, `const [_, x] = arr` | “不该外部访问”或“我不关心它” |
| `$`      | 框架变量（Vue、jQuery）、构建标记 | `this.$refs`, `$()`           | “系统/框架/工具提供的东西”   |

注：所谓关键字是指 JavaScript 内部使用的词语，如 `let` 和`var`，保留字是指 JavaScript 内部目前没有使用的词语，但是将来可能会使用词语。

### 关键字列表

- [`break`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/break), [`case`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/switch), [`catch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch), [`class`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/class), [`const`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const), [`continue`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/continue), [`debugger`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/debugger), [`default`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/switch), [`delete`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete), [`do`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/do...while), [`else`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/if...else), [`export`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export), [`extends`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends), [`false`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E5%B8%83%E5%B0%94%E5%AD%97%E9%9D%A2%E9%87%8F), [`finally`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch), [`for`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for), [`function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function), [`if`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/if...else), [`import`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import), [`in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in), [`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof), [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new), [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null), [`return`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/return), [`super`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super), [`switch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/switch), [`this`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this), [`throw`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/throw), [`true`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E5%B8%83%E5%B0%94%E5%AD%97%E9%9D%A2%E9%87%8F), [`try`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch), [`typeof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof), [`var`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var), [`void`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void), [`while`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/while), [`with`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 变量名命名规则</title>
</head>
<body>
  
  <script> 
    let age = 18 // 正确
    let age1 = 18 // 正确
    let _age = 18 // 正确

    // let 1age = 18; // 错误，不可以数字开头
    let $age = 18 // 正确
    let Age = 24 // 正确，它与小写的 age 是不同的变量
    // let let = 18; // 错误，let 是关键字
    let int = 123 // 不推荐，int 是保留字
  </script>
</body>
</html>
```

## 常量

概念：使用 const 声明的变量称为“常量”。

使用场景：当某个变量永远不会改变的时候，就可以使用 const 来声明，而不是let。

命名规范：和变量一致

~~~javascript
const PI = 3.14
~~~

>注意： 常量不允许重新赋值,声明的时候必须赋值（初始化）

## 数据类型

> 计算机世界中的万事万物都是数据。

计算机程序可以处理大量的数据，为了方便数据的管理，将数据分成了不同的类型：

> 注：通过 typeof 关键字检测数据类型

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    // 检测 1 是什么类型数据，结果为 number
    document.write(typeof 1)
  </script>
</body>
</html>
```

### 数值类型 `number`

即我们数学中学习到的数字，可以是整数、小数、正数、负数

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    let score = 100 // 正整数
    let price = 12.345 // 小数
    let temperature = -40 // 负数

    document.write(typeof score) // 结果为 number
    document.write(typeof price) // 结果为 number
    document.write(typeof temperature) // 结果为 number
  </script>
</body>
</html>
```

JavaScript 中的数值类型与数学中的数字是一样的，分为正数、负数、小数等。

> 注意: `typeof NaN === 'number'`

### 字符串类型`string`

通过单引号（ `''`） 、双引号（ `""`）或反引号(``)包裹的数据都叫字符串，单引号和双引号没有本质上的区别，推荐使用单引号。

注意事项：

1. 无论单引号或是双引号必须成对使用
2. 单引号/双引号可以互相嵌套，但是不以自已嵌套自已
3. 必要时可以使用转义符 `\`，输出单引号或双引号

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    let user_name = '小明' // 使用单引号
    let gender = "男" // 使用双引号
    let str = '123' // 看上去是数字，但是用引号包裹了就成了字符串了
    let str1 = '' // 这种情况叫空字符串
		
    documeent.write(typeof user_name) // 结果为 string
    documeent.write(typeof gender) // 结果为 string
    documeent.write(typeof str) // 结果为 string
  </script>
</body>
</html>
```

### 布尔类型[`boolean`](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)

表示肯定或否定时在计算机中对应的是布尔类型数据，它有两个固定的值 `true` 和 `false`，表示肯定的数据用 `true`，表示否定的数据用 `false`。

能够转化为 false 的表达式的示例如下：

- number类型中: `0`或`-0`；
- string类型中: 空字符串（`""` 或 `''` 或 ``）；
- `null`；
- `NaN`；
- `undefined`
- `false`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    //  pink老师帅不帅？回答 是 或 否
    let isCool = true // 是的，帅死了！
    isCool = false // 不，是套马的汉子！

    document.write(typeof isCool) // 结果为 boolean
  </script>
</body>
</html>
```

```js
// Boolean类型的显式转换
const x = Boolean(expression); // 可以这样使用
const x = !!expression; // ...或者这样使用	!!: 双重非运算符(取反取反)
const x = new Boolean(expression); // 不要这样使用,其值不是 undefined 或 null 的任何对象（包括其值为 false 的布尔对象）在传递给条件语句时都将计算为 true
const test = new Boolean(false) // 结果test == false(值相等,类型不等)
```

> 注意不要将基本类型中的布尔值 `true` 和 `false` 与值为 `true` 和 `false` 的 `Boolean` 对象弄混了。
> 不要在应该使用基本类型布尔值的地方使用 `Boolean` 对象(不要new一个Boolean对象),
> 因为如果省略`new Boolean()`参数或参数值为 `0`、`-0`、[`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)、`false`、[`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)、[`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，或空字符串（`""`），则该对象具有的初始值为 `false`。所有其他值，包括任何对象，空数组（`[]`）或字符串 `"false"`，都会创建一个初始值为 `true` 的对象

### 未定义`undefined`

表示值缺失, 未定义是比较特殊的类型，只有一个值 undefined，**<u>只声明变量，不赋值</u>**的情况下，变量的默认值为 undefined，一般很少【直接】为某个变量赋值为 undefined。`undefined` 是一个普通的[标识符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E6%A0%87%E8%AF%86%E7%AC%A6)(就是变量名)

- 没有值的 [`return`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/return) 语句（`return;`），隐式返回 `undefined` 或没有return的函数。
- 访问不存在的[对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)属性（`obj.iDontExist`），返回 `undefined`。
- 变量声明时没有初始化（`let x;`），隐式初始化为 `undefined`。
- 许多像 [`Array.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find) 和 [`Map.prototype.get()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/get) 的方法，当没有找到元素时，返回 `undefined`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    // 只声明了变量，并末赋值
    let tmp;
    document.write(typeof tmp) // 结果为 undefined
  </script>
</body>
</html>
```

**注：JavaScript 中变量的值决定了变量的数据类型。**

### 空类型`null`

空类型, 表示对象缺失, 如果一个变量里面存的是对象, 还还没准备好对象, 可以先放一个null, `null` 是一个[关键字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E5%85%B3%E9%94%AE%E5%AD%97)

 [`typeof null === "object"`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null) 特殊历史遗留bug,为了兼容性只能保留

###	原始数据类型和构造函数

| 原始类型（小写）   | 构造函数（大写） | 是否常用 | 说明                                                |
| ------------------ | ---------------- | -------- | --------------------------------------------------- |
| `string`           | `String`         | ✅        | 字符串 vs 包装对象                                  |
| `number`           | `Number`         | ✅        | 数值类型                                            |
| `boolean`          | `Boolean`        | ✅        | 布尔值                                              |
| `symbol`           | `Symbol`         | ✅        | 唯一标识符                                          |
| `bigint`           | `BigInt`         | ✅        | 任意精度整数                                        |
| `undefined`        | ❌（无构造函数）  | 🚫        | 只有一个值：undefined                               |
| `null`             | ❌（无构造函数）  | 🚫        | 只有一个值：null                                    |
| `object`(js中没有) | `Object`         |          | JavaScript 中的**构造函数**、**原型对象**，万物之父 |

`object`和`Object`的区别

| 角度       | 小写 `object` 是什么？                                       | 是否表示原始类型？ | 属于 JS 语言标准吗？       |
| ---------- | ------------------------------------------------------------ | ------------------ | -------------------------- |
| JavaScript | ❌ 并不存在“object”这个类型关键词，仅在 `typeof` 中作为返回值存在 | ❌ 不是原始类型     | ❌ 不是 JS 的关键词         |
| TypeScript | ✅ 是一种类型注解，表示“非原始类型”,  不是原始类型的所有值都是object | ❌ 不是原始类型     | ✅ 属于 TypeScript 类型系统 |

| 项目                   | `object`（小写）            | 对象（object literal）        | `Object`（大写）                    |
| ---------------------- | --------------------------- | ----------------------------- | ----------------------------------- |
| 属于哪种语言           | ✅ TypeScript                | ✅ JavaScript                  | ✅ JavaScript                        |
| 是什么                 | 一种宽泛的**类型**          | JS 中的**数据结构**           | JS 的**构造函数 + 原型祖先 + 工具** |
| 是否能被 `typeof` 检测 | ❌ 无法检测（TS 的类型）     | ✅ 是 `"object"`               | ✅ 是 `"function"`                   |
| 用途                   | TS 中限制变量只能是对象类型 | 存储键值对                    | 创建对象、继承原型、工具方法        |
| 示例                   | `let a: object = {}`        | `const a = { name: "Jiang" }` | `const a = new Object()`            |

## 类型转换

> 理解弱类型语言的特征，掌握显式类型转换的方法

在 JavaScript 中数据被分成了不同的类型，如数字number、字符串string、布尔值boolean、undefined，null, 在实际编程的过程中，不同数据类型之间存在着转换的关系。

### 隐式转换

某些运算符被执行时，系统内部自动将数据类型进行转换，这种转换称为隐式转换。

**规则：**

- `+`号两边只要有一个是字符串，都会把另外一个转成字符串
- 除了 + 以外的算术运算符比如`－ * /`等都会把数据转成数字类型

**缺点：**

- 转换类型不明确，靠经验才能总结

**小技巧：**

- 一个操作数: `+` 号作为正号解析可以将字符串转换成数字型 `+'123' === 123`
- 2个操作数: 任何数据和字符串相加结果都是字符串 `''+ 1 === '1'`
- 减法`-`（像大多数数学运算一样）只能用于数字，它会使空字符串“转换为0 ,` '2'-2 === 0`
- `null`经过数字转换之后会变为`0`
- ``undefined`经过数字转换之后会变为`NaN`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 隐式转换</title>
</head>
<body>
  <script> 
    let num = 13 // 数值
    let num2 = '2' // 字符串

    // 结果为 132
    // 原因是将数值 num 转换成了字符串，相当于 '13'
    // 然后 + 将两个字符串拼接到了一起
    console.log(num + num2)

    // 结果为 11
    // 原因是将字符串 num2 转换成了数值，相当于 2
    // 然后数值 13 减去 数值 2
    console.log(num - num2)

    let a = prompt('请输入一个数字')
    let b = prompt('请再输入一个数字')

    alert(a + b);
  </script>
</body>
</html>
```

注：数据类型的隐式转换是 JavaScript 的特征，后续学习中还会遇到，目前先需要理解什么是隐式转换。

补充介绍模板字符串的拼接的使用

### 显式转换

编写程序时过度依靠系统内部的隐式转换是不严禁的，因为隐式转换规律并不清晰，大多是靠经验总结的规律。为了避免因隐式转换带来的问题，通常根逻辑需要对数据进行显示转换。

#### Number

通过 `Number` 显示转换成数值类型，当转换失败时结果为 `NaN`（Not a Number）即不是一个数字。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 隐式转换</title>
</head>
<body>
  <script>
    let t = '12'
    let f = 8

    // 显式将字符串 12 转换成数值 12
    t = Number(t)

    // 检测转换后的类型
    // console.log(typeof t);
    console.log(t + f) // 结果为 20

    // 并不是所有的值都可以被转成数值类型
    let str = 'hello'
    // 将 hello 转成数值是不现实的，当无法转换成
    // 数值时，得到的结果为 NaN （Not a Number）
    console.log(Number(str))
  </script>
</body>
</html>
```

> `String`, `Boolean`和`Number`一样可以显式转换类型,用法一样, 但是不要使用new关键字构造对象
>
> `Number`和`number`,是不同的一个是构造函数 / 包装对象类型, 一个是原始数据类型

##### parseInt`: 只保留整数(不会四舍五入)

**语法: [parseInt(string, radix)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)**

**参数**

- [`string`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt#string)要被解析的值。如果参数不是一个字符串，则将其转换为字符串 (使用 [`ToString`](https://www.ecma-international.org/ecma-262/6.0/#sec-tostring)抽象操作)。字符串开头的空白符将会被忽略。

- [`radix`_ 可选_](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt#radix)

  从 `2` 到 `36` 的整数，表示进制的基数。例如指定 `16` 表示被解析值是十六进制数。如果超出这个范围，将返回 `NaN`。假如指定 `0` 或未指定，基数将会根据字符串的值进行推算。注意，推算的结果不会永远是默认值 `10`！文章后面的描述解释了当参数 `radix` 不传时该函数的具体行为。

  **返回值**

  从给定的字符串中解析出的一个整数。或者 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)，当

  - `radix` 小于 `2` 或大于 `36`，或
  - 第一个非空格字符不能转换为数字。


#####  `parseFloat`: 保留浮点数(不会四舍五入)

**语法: [parseFloat(string)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)**

**参数**

- [`string`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat#string)

  需要被解析成为浮点数的值

**返回值**

给定值被解析成浮点数。如果给定值不能被转换成数值(和parseInt一样)，则会返回 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)。









