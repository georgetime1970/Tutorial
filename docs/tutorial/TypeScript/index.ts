const directory = [
  {
    text: "入门篇",
    collapsed: false,
    items: [
      { text: "简介", link: "/tutorial/TypeScript/intro" },
      { text: "基本用法", link: "/tutorial/TypeScript/basic" },
      { text: "any 类型", link: "/tutorial/TypeScript/any" },
      { text: "类型系统", link: "/tutorial/TypeScript/types" },
    ],
  },
  {
    text: "数据类型",
    collapsed: false,
    items: [
      { text: "数组", link: "/tutorial/TypeScript/array" },
      { text: "元组", link: "/tutorial/TypeScript/tuple" },
      { text: "symbol 类型", link: "/tutorial/TypeScript/symbol" },
      { text: "函数", link: "/tutorial/TypeScript/function" },
      { text: "对象", link: "/tutorial/TypeScript/object" },
      { text: "interface", link: "/tutorial/TypeScript/interface" },
      { text: "类", link: "/tutorial/TypeScript/class" },
      { text: "Enum 类型", link: "/tutorial/TypeScript/enum" },
    ],
  },
  {
    text: "进阶特性",
    collapsed: false,
    items: [
      { text: "泛型", link: "/tutorial/TypeScript/generics" },
      { text: "类型断言", link: "/tutorial/TypeScript/assert" },
      { text: "类型运算符", link: "/tutorial/TypeScript/operator" },
      { text: "类型映射", link: "/tutorial/TypeScript/mapping" },
      { text: "类型工具", link: "/tutorial/TypeScript/utility" },
    ],
  },
  {
    text: "模块与声明",
    collapsed: false,
    items: [
      { text: "模块", link: "/tutorial/TypeScript/module" },
      { text: "namespace", link: "/tutorial/TypeScript/namespace" },
      { text: "declare 关键字", link: "/tutorial/TypeScript/declare" },
      { text: "d.ts 类型声明文件", link: "/tutorial/TypeScript/d_ts" },
    ],
  },
  {
    text: "装饰器",
    collapsed: false,
    items: [
      { text: "装饰器", link: "/tutorial/TypeScript/decorator" },
      { text: "装饰器（旧语法）", link: "/tutorial/TypeScript/decorator-legacy" },
    ],
  },
  {
    text: "工具与配置",
    collapsed: false,
    items: [
      { text: "注释指令", link: "/tutorial/TypeScript/comment" },
      { text: "tsconfig.json 文件", link: "/tutorial/TypeScript/tsconfig_json" },
      { text: "tsc 命令", link: "/tutorial/TypeScript/tsc" },
    ],
  },
];
const home = "/tutorial/TypeScript/intro";

const data = {
  directory,
  home,
};
export default data;
