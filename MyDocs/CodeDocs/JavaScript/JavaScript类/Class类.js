/**
 * JS类
 * 1.如何定义类的属性和方法(静态, 类字段, 普通)
 * 2.如何继承类
 * 3.如何使用父类的属性和方法
 * 4.抽象类
 */
class Father {
  // 1.静态属性和静态方法, 直接使用类来访问: Father.name和Father.sayName(), 实例对象无法访问
  static sname = 'george'
  static sayName() {
    return `我是爸爸,我叫 ${this.sname}`
  }
  // 2.类字段和方法(语法糖,直接赋值),和constructor类似, 但是不能传参和写逻辑
  // 实例对象使用,不能通过类直接访问
  age = 40
  sayAge = () => {
    // 使用箭头函数,this自动绑定到当前实例
    return `我是爸爸, 我今年 ${this.age}`
  }

  // 3.构造函数和实例方法(普通方法), 使用constructor,适合传参和写逻辑
  constructor(x, y) {
    this.x = x
    this.y = y || 0
  }
  sum() {
    // 使用实例参数
    return this.x + this.y
  }
  moreSum(m) {
    // 使用外部参数
    return this.sum() + m
  }

  // 4.私有属性和方法,只能类內部使用
  #id = 888888
  #showId() {
    return this.#id
  }
  sayId() {
    return `我是爸爸,我的ID是 ${this.#showId()}`
  }
}

// 调用Father的静态属性和方法
console.log(`类Father的静态属性, 由Father直接访问name=>${Father.name}`)
console.log(`类Father的静态方法, 由Father直接调用sayName=>${Father.sayName()}`)

// 实例化Father类
const newFather = new Father(1, 2)
// 静态属性: 实例newFather直接访问类Father的静态属性,会失败
console.log(`实例对象newFather尝试访问类Father的静态属性name=>${newFather.name}`) // 类的静态属性实例不能访问:undefined
console.log(`实例对象nweFather尝试访问Father的静态方法=>${newFather.sayName}`) // 类的静态方法实例不能访问:undefined(调用会报错)
// 类字段: 实例newFather可以访问类字段属性和方法
console.log(`实例对象newFather尝试访问Father的类字段age=>${newFather.age}`)
console.log(`实例对象nweFather尝试访问Father的类方法sayAge=>${newFather.sayAge()}`)
// 普通: 实例newFather可以访问普通属性和方法
console.log(`实例对象newFather尝试访问Father的普通属性x=>${newFather.x}`)
console.log(`实例对象newFather尝试访问Father的普通方法sum=>${newFather.sum()}`)
console.log(`实例对象newFather尝试访问Father的普通方法moreSum=>${newFather.moreSum(3)}`) // 使用了外部传参的普通方法
// 私有: 实例newFather不可以访问私有属性和方法
try {
  console.log(`实例对象newFather尝试访问Father的私有属性id=>${id}`)
  console.log(`实例对象newFather尝试访问Father的私有方法showId=>${showId()}`)
} catch {
  console.log('私有属性id和方法showId不可访问')
}
console.log('//////////////////////////////////////////////////////////////////////////////')

// Son继承Father的属性和方法
class Son extends Father {
  // 子类自己的静态方法调用父类的静态属性和方法
  static sonSelf() {
    return `我叫 ${super.sname}, ${super.sayName()}`
  }
  constructor(x, z) {
    super(x) // super必须在最前面, super 就是父类，用来调用父类的构造函数(属性)或方法(将实参传递给父类)
    // super(x + 1)  // 可以对参数进行加工,将影响子类调用父类的结果
    // this.x = x // 如果Son想保留传入的实参值,可以保留
    this.z = z
    this.sayHi(`实例化时就调用:正在实例化Son类, 传入的实参为 ${this.x} 和 ${this.z}`)
  }
  sayHi(hi) {
    console.log(hi)
  }
  // 子类自己的普通方法,调用父类普通的sum方法和age属性
  subtract() {
    return super.sum() + this.age - this.z
  }
  // 覆写父类的方法
  sayAge = () => {
    // 直接重写覆盖即可, 箭头函数就要箭头函数覆盖, 普通函数就要普通函数覆盖
    return `我是儿子, 我今年 ${this.age - 24}`
  }
}

console.log(`Son实例访问Father类的静态属性和方法=>${Son.sonSelf()}`)
//  实例化Son类
const s = new Son(5, 3) // 只是用了父类的x和子类的z形参
console.log(`Son实例对象访问Father类的方法sum=> ${s.sum()}`)
console.log(`Son实例访问Son类的普通方法subtract=>${s.subtract()}`)
console.log(`Son实例访问Son类的覆写类字段方法sayAge=>${s.sayAge()}`)
