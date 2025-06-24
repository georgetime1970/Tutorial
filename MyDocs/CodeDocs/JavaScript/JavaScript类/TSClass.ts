// 接口是用来暴露公开能力的,静态的,私有的属性和方法都不用定义接口
interface ITsFather {
  // static name:string 不能直接显示类的静态属性和方法
  age: number
  sayAge(): string
  x: number
  sum(): number
}

class TsFather implements ITsFather {
  // 1.静态方法和属性
  static sname: string = 'Tom'
  static sayName(): string {
    return `我是父类,我的名字叫 ${this.sname}`
  }
  // 2.类字段和方法
  public age: number = 42
  sayAge = (): string => {
    return `我今年 ${this.age}岁了`
  }
  // 3.constructor构造函数
  constructor(
    public x: number, // 公开属性
    protected y: number, // 受保护属性, 允许在类的内部和子类中访问，但外部依然不应该访问
    private z: number // 私有属性,只允许在类的内部访问，子类都不能访问
  ) {}
  // 普通方法
  sum(): number {
    return this.x + this.y + this.z
  }
}

// 访问静态属性和方法
console.log(TsFather.sname)
console.log(TsFather.sayName())

// 实例化类
const tf = new TsFather(1, 2, 3)
// 访问实例的类字段属性和方法
console.log(tf.age)
console.log(tf.sayAge())
// 访问实例的普通属性和方法
console.log(tf.x)
// console.log(tf.y) // 静态检查不通过,实际能运行
// console.log(tf.z) // 静态检查不通过,实际能运行

console.log('/////////////////////////////////////////////////////')
// 类的继承
class TsSon extends TsFather {
  // 子类自己的静态方法调用父类的静态属性和方法
  static sonSelf() {
    return `我是子类,正在访问父类的属性和方法:我叫 ${super.sname}, ${super.sayName()}`
  }
  constructor(x: number, y: number, z: number, public t: number) {
    super(x, y, z) // super必须在最前面, super 就是父类，用来调用父类的构造函数(属性)或方法(将实参传递给父类)
    // super(x + 1)  // 可以对参数进行加工,将影响子类调用父类的结果
    // this.x = x // 如果Son想保留传入的实参值,可以保留
    this.t = t
    this.sayHi(`实例化时就调用:正在实例化TsSon类, 传入的实参为 ${this.x} 和 ${this.t}`)
  }
  sayHi(hi: string): void {
    console.log(hi)
  }
  // 子类自己的普通方法,调用父类普通的sum方法和age属性
  subtract() {
    return super.sum() + this.age - this.t
  }
  // 覆写父类的方法
  override sayAge = () => {
    // override关键字,重写方法覆盖即可, 箭头函数就要箭头函数覆盖, 普通函数就要普通函数覆盖
    return `我是儿子, 我今年 ${this.age - 24}`
  }
}

// 访问父类的属性和方法
console.log(TsSon.sname)
console.log(TsSon.sayName())
// 访问子类的静态属性和方法
console.log(TsSon.sonSelf())

// 实例化子类
const ts = new TsSon(1, 2, 3, 4)
// 访问子类覆写的父类方法
console.log(ts.subtract())
