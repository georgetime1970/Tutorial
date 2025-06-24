# JavaScript 基础 - 第5天

> 知道对象数据类型的特征，能够利用数组对象渲染页面

- 理解什么是对象，掌握定义对象的语法
- 掌握数学对象的使用

## 对象

> 对象是 JavaScript 数据类型的一种，之前已经学习了数值类型`number`、字符串类型`string`、布尔类型`boolean`、`undefined`, `null`。对象数据类型可以被理解成是一种数据集合。它由属性和方法两部分构成。

### 语法

声明一个对象类型的变量与之前声明一个数值number或字符串string类型的变量没有本质上的区别。

语法: `let 对象名 = {}`或者`let 对象名 = new Object()`

使用:`let 对象名 ={属性名: 属性值, 方法名: 函数}`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 声明对象类型变量，使用一对花括号
    // user 便是一个对象了，目前它是一个空对象
    let user = {}
    
    // Es6的简写
    const foo = 'bar'
    const baz = {foo}	//=== {foo:'bar}
    // 等同于
    const baz = {foo: foo}
  </script>
</body>
</html>
```

### 声明属性和方法

- 属性:  数据描述性的信息称为属性，如人的姓名name、身高height、年龄age、性别等gender，一般是名词性的。
- 方法:  数据行为性的信息称为方法，如跑步run、唱歌sing等，一般是动词性的，其本质是函数。

1. 属性都是成 对出现的，包括属性名和值，它们之间使用英文 `:` 分隔,  比如: `name : '张三'`; 

   方法是由方法名和函数两部分构成，它们之间使用 : 分隔, 比如: `run : function(){}`

2. 多个属性或方法之间使用英文 `,` 分隔

3. 属性就是依附在对象上的变量,  方法是依附在对象中的函数

4. 属性名或方法名可以使用 `""` 或 `''`，一般情况下省略，除非名称遇到特殊符号如空格、中横线等

   > 方法（函数）本质上也是属性的一种（值是函数而已）

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 定义一个person对象, 有属性和方法
    let person = {
      name: '小明', // 描述人的姓名
      age: 18, // 描述人的年龄
      run: function(){
        console.log('我跑得很快!')
      }
      // ES6 方法的简写形式
      run(){
      console.log('我跑得很快!')
    }
      
    }
  </script>
</body>
</html>
```

###	访问属性和方法

声明对象，并添加了若干属性后，可以使用 `.` 或 `[]` 获得对象中属性对应的值。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    let person = {
      name: '小明',
      age: 18,
      run(){
        console.log('我跑得很快!')
      }
    };
    
    // 访问name属性
    console.log(person.name) // 结果为 小明
    // 访问age属性
    console.log(person['age']) // 结果为 18
   // 调用run方法
    console.log(person.run()) // 结果 '我跑得很快!'
  </script>
</body>
</html>
```

###	增加方法和属性

可以动态为对象添加属性或方法，动态添加与直接定义是一样的，只是语法上更灵活。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 声明一个空的对象（没有任何属性）
	let user = {}
    // 动态追加属性
    user.name = '小明'
    user.['age'] = 18
    
    // 动态添加方法
    user.move = function () {
      console.log('移动一点距离...')
    }
    
  </script>
</body>
</html>
```

> 注：无论是属性或是方法，同一个对象中出现名称一样的，后面的会覆盖前面的。修改属性和方法正是利用的这一点.

###	修改和删除属性和方法

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    let person = {
      name: '小明',
      age: 18,
      run(){
        console.log('我跑得很快!')
      }
    };

		// 修改属性和方法, 直接重复定义就可以
		p.name = '张三'
    p.run = function(){
			console.log('我跑的非常快!!!')
    }
    
    // 删除属性和方法, 不建议直接使用!!!
    delete p.name
		delete p.run
    
  </script>
</body>
</html>
```

###	遍历对象

~~~javascript
let obj = {
    uname: 'pink'
}
for(let k in obj) {
    // k 属性名(string类型, 带引号, k ===  'uname')
    // obj[k](读取属性值必须使用[], obj[k] === obj['uname'], obj.k === obj.'name' 是无法正确访问到属性值的) 
}
~~~

>  ⚠️for in 不提倡遍历数组 因为 k 是 字符串  , 而且会遍历原型链，⚠️数组慎用

| 方法                              | 能力                                   | 常用性                                  |
| --------------------------------- | -------------------------------------- | --------------------------------------- |
| `for...in`                        | 遍历所有可枚举属性（包括原型链）       | ⚠️ 一般不用，除非配合 `hasOwnProperty()` |
| `Object.keys(obj)`                | 遍历自己的 key（键）                   | ✅ 常用                                  |
| `Object.values(obj)`              | 遍历自己的 value（值）                 | ✅ 常用                                  |
| `Object.entries(obj)`             | 遍历自己的 `[key, value]`              | ✅✅ 推荐                                 |
| `Object.getOwnPropertyNames(obj)` | 获取所有自己定义的属性（包括不可枚举） | 少用，特殊场景                          |
| `Reflect.ownKeys(obj)`            | 获取自己定义的所有属性（包含 symbol）  | 进阶用法                                |

✅ 最推荐：`Object.entries(obj)` + `for...of`

~~~js
const person = { name: 'Jiang', age: 30 };

for (const [key, value] of Object.entries(person)) {
  console.log(key, value);
}

// 对比数组使用entries()的for of 方法
for (const [index, value] of arr.entries()) {
  console.log(index, value);
}
~~~

🔥 为什么推荐这个方式？

1. **只遍历自己的属性**（不会管原型链，安全）
2. **一次拿到 key 和 value**（不用再写 `obj[key]`）
3. **可读性强**，最接近 Python 那种字典遍历的写法

## 内置对象

回想一下我们曾经使用过的 `console.log`，`console`其实就是 JavaScript 中内置的对象，该对象中存在一个方法叫 `log`，然后调用 `log` 这个方法，即 `console.log()`。

除了 `console` 对象外，JavaScritp 还有其它的内置的对象

### [Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)

`Math` 是 JavaScript 中内置的对象，称为数学对象，这个对象下既包含了属性，也包含了许多的方法。

#### 静态属性: Math.PI

```javascript
// 获取圆周率
console.log(Math.PI);
```

#### 静态方法: Math.random

```javascript
// 生成0 ~ 1 之间的随机数, 包含 0 不包含 1
Math.random()
```

####	静态方法: Math.ceil

```javascript
// 数字向上取整: 舍弃小数部分，整数部分加1
Math.ceil(3.4)
```

####	静态方法: Math.floor

```javascript
// 数字向下取整: 舍弃小数部分，整数部分不变
Math.floor(4.68)
```

####	静态方法: Math.round

```javascript
// 四舍五入取整，四舍五入原则
Math.round(5.46539)
Math.round(4.849)
```

####	静态方法: Math.max

```javascript
// 在一组数中找出最大的
Math.max(10, 21, 7, 24, 13)
```

####	静态方法: Math.min

```javascript
// 在一组数中找出最小的
Math.min(24, 18, 6, 19, 21)
```

####	静态方法: Math.pow

```javascript
// 幂方法: 求某个数的多少次方
Math.pow(4, 2) // 求 4 的 2 次方
Math.pow(2, 3) // 求 2 的 3 次方
```

####	静态方法: Math.sqrt

```javascript
// 平方根: 求某数的平方根
Math.sqrt(16)
```

数学对象提供了比较多的方法，这里不要求强记，通过演示数学对象的使用，加深对对象的理解。

