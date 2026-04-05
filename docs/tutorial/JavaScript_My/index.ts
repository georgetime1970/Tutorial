const directory = [
  { text: "JSApi", collapsed: false, items: [{ text: "Api 总览", link: "/tutorial/JavaScript_My/JSApi" }] },
  {
    text: "基础",
    collapsed: false,
    items: [
      { text: "变量 数据类型", link: "/tutorial/JavaScript_My/1_基础第一天" },
      { text: "运算符 语句", link: "/tutorial/JavaScript_My/2_基础第二天" },
      { text: "for 数组", link: "/tutorial/JavaScript_My/3_基础第三天" },
      { text: "函数 作用域", link: "/tutorial/JavaScript_My/4_基础第四天" },
      { text: "对象", link: "/tutorial/JavaScript_My/5_基础第五天" },
    ],
  },
  {
    text: "WebApis",
    collapsed: false,
    items: [
      { text: "DOM 基础", link: "/tutorial/JavaScript_My/6_WebApis第一天" },
      { text: "事件监听", link: "/tutorial/JavaScript_My/7_WebApis第二天" },
      { text: "事件流", link: "/tutorial/JavaScript_My/8_WebApis第三天" },
      { text: "DOM方法", link: "/tutorial/JavaScript_My/9_WebApis第四天" },
      { text: "BOM方法", link: "/tutorial/JavaScript_My/10_WebApis第五天" },
      { text: "正则表达式", link: "/tutorial/JavaScript_My/11_WebApis第六天" },
      { text: "WebApis实战", link: "/tutorial/JavaScript_My/12_WebApis实战" },
    ],
  },
  {
    text: "进阶",
    collapsed: false,
    items: [
      { text: "第一天", link: "/tutorial/JavaScript_My/13_进阶第一天" },
      { text: "第二天", link: "/tutorial/JavaScript_My/14_进阶第二天" },
      { text: "第三天", link: "/tutorial/JavaScript_My/15_进阶第三天" },
      { text: "第四天", link: "/tutorial/JavaScript_My/16_进阶第四天" },
    ],
  },
  {
    text: "扩展",
    collapsed: false,
    items: [
      { text: "模块化规范", link: "/tutorial/JavaScript_My/17_模块化" },
      { text: "类实践", link: "/tutorial/JavaScript_My/18_类实践" },
    ],
  },
];

const home = "/tutorial/JavaScript_My/JSApi";

const data = {
  directory,
  home,
};
export default data;
