const home = "/tutorial/JavaScript/basic/introduction";
const directory = [
  {
    text: "入门篇",
    collapsed: false,
    items: [
      { text: "导论", link: "/tutorial/JavaScript/basic/introduction" },
      { text: "历史", link: "/tutorial/JavaScript/basic/history" },
      { text: "基本语法", link: "/tutorial/JavaScript/basic/grammar" },
    ],
  },
  {
    text: "数据类型",
    collapsed: false,
    items: [
      { text: "概述", link: "/tutorial/JavaScript/types/general" },
      {
        text: "null，undefined 和布尔值",
        link: "/tutorial/JavaScript/types/null-undefined-boolean",
      },
      { text: "数值", link: "/tutorial/JavaScript/types/number" },
      { text: "字符串", link: "/tutorial/JavaScript/types/string" },
      { text: "对象", link: "/tutorial/JavaScript/types/object" },
      { text: "函数", link: "/tutorial/JavaScript/types/function" },
      { text: "数组", link: "/tutorial/JavaScript/types/array" },
    ],
  },
  {
    text: "运算符",
    collapsed: false,
    items: [
      { text: "算术运算符", link: "/tutorial/JavaScript/operators/arithmetic" },
      { text: "比较运算符", link: "/tutorial/JavaScript/operators/comparison" },
      { text: "布尔运算符", link: "/tutorial/JavaScript/operators/boolean" },
      { text: "二进制位运算符", link: "/tutorial/JavaScript/operators/bit" },
      { text: "其他运算符，运算顺序", link: "/tutorial/JavaScript/operators/priority" },
    ],
  },
  {
    text: "语法专题",
    collapsed: false,
    items: [
      { text: "数据类型的转换", link: "/tutorial/JavaScript/features/conversion" },
      { text: "错误处理机制", link: "/tutorial/JavaScript/features/error" },
      { text: "编程风格", link: "/tutorial/JavaScript/features/style" },
      { text: "console 对象与控制台", link: "/tutorial/JavaScript/features/console" },
    ],
  },
  {
    text: "标准库",
    collapsed: false,
    items: [
      { text: "Object 对象", link: "/tutorial/JavaScript/stdlib/object" },
      { text: "属性描述对象", link: "/tutorial/JavaScript/stdlib/attributes" },
      { text: "Array 对象", link: "/tutorial/JavaScript/stdlib/array" },
      { text: "包装对象", link: "/tutorial/JavaScript/stdlib/wrapper" },
      { text: "Boolean 对象", link: "/tutorial/JavaScript/stdlib/boolean" },
      { text: "Number 对象", link: "/tutorial/JavaScript/stdlib/number" },
      { text: "String 对象", link: "/tutorial/JavaScript/stdlib/string" },
      { text: "Math 对象", link: "/tutorial/JavaScript/stdlib/math" },
      { text: "Date 对象", link: "/tutorial/JavaScript/stdlib/date" },
      { text: "RegExp 对象", link: "/tutorial/JavaScript/stdlib/regexp" },
      { text: "JSON 对象", link: "/tutorial/JavaScript/stdlib/json" },
    ],
  },
  {
    text: "面向对象编程",
    collapsed: false,
    items: [
      { text: "实例对象与 new 命令", link: "/tutorial/JavaScript/oop/new" },
      { text: "this 关键字", link: "/tutorial/JavaScript/oop/this" },
      { text: "对象的继承", link: "/tutorial/JavaScript/oop/prototype" },
      { text: "Object 对象的相关方法", link: "/tutorial/JavaScript/oop/object" },
      { text: "严格模式", link: "/tutorial/JavaScript/oop/strict" },
    ],
  },
  {
    text: "异步操作",
    collapsed: false,
    items: [
      { text: "概述", link: "/tutorial/JavaScript/async/general" },
      { text: "定时器", link: "/tutorial/JavaScript/async/timer" },
      { text: "Promise 对象", link: "/tutorial/JavaScript/async/promise" },
    ],
  },
  {
    text: "DOM",
    collapsed: false,
    items: [
      { text: "概述", link: "/tutorial/JavaScript/dom/general" },
      { text: "Node 接口", link: "/tutorial/JavaScript/dom/node" },
      {
        text: "NodeList 接口，HTMLCollection 接口",
        link: "/tutorial/JavaScript/dom/nodelist",
      },
      {
        text: "ParentNode 接口，ChildNode 接口",
        link: "/tutorial/JavaScript/dom/parentnode",
      },
      { text: "Document 节点", link: "/tutorial/JavaScript/dom/document" },
      { text: "Element 节点", link: "/tutorial/JavaScript/dom/element" },
      { text: "属性的操作", link: "/tutorial/JavaScript/dom/attributes" },
      { text: "Text 节点和 DocumentFragment 节点", link: "/tutorial/JavaScript/dom/text" },
      { text: "CSS 操作", link: "/tutorial/JavaScript/dom/css" },
      { text: "Mutation Observer API", link: "/tutorial/JavaScript/dom/mutationobserver" },
    ],
  },
  {
    text: "事件",
    collapsed: false,
    items: [
      { text: "EventTarget 接口", link: "/tutorial/JavaScript/events/eventtarget" },
      { text: "事件模型", link: "/tutorial/JavaScript/events/model" },
      { text: "Event 对象", link: "/tutorial/JavaScript/events/event" },
      { text: "鼠标事件", link: "/tutorial/JavaScript/events/mouse" },
      { text: "键盘事件", link: "/tutorial/JavaScript/events/keyboard" },
      { text: "进度事件", link: "/tutorial/JavaScript/events/progress" },
      { text: "表单事件", link: "/tutorial/JavaScript/events/form" },
      { text: "触摸事件", link: "/tutorial/JavaScript/events/touch" },
      { text: "拖拉事件", link: "/tutorial/JavaScript/events/drag" },
      { text: "其他常见事件", link: "/tutorial/JavaScript/events/common" },
      {
        text: "GlobalEventHandlers 接口",
        link: "/tutorial/JavaScript/events/globaleventhandlers",
      },
    ],
  },
  {
    text: "浏览器模型",
    collapsed: false,
    items: [
      { text: "浏览器模型概述", link: "/tutorial/JavaScript/bom/engine" },
      { text: "window 对象", link: "/tutorial/JavaScript/bom/window" },
      { text: "Navigator 对象，Screen 对象", link: "/tutorial/JavaScript/bom/navigator" },
      { text: "Cookie", link: "/tutorial/JavaScript/bom/cookie" },
      { text: "XMLHttpRequest 对象", link: "/tutorial/JavaScript/bom/xmlhttprequest" },
      { text: "同源限制", link: "/tutorial/JavaScript/bom/same-origin" },
      { text: "CORS 通信", link: "/tutorial/JavaScript/bom/cors" },
      { text: "Storage 接口", link: "/tutorial/JavaScript/bom/storage" },
      { text: "History 对象", link: "/tutorial/JavaScript/bom/history" },
      {
        text: "Location 对象，URL 对象，URLSearchParams 对象",
        link: "/tutorial/JavaScript/bom/location",
      },
      { text: "ArrayBuffer 对象，Blob 对象", link: "/tutorial/JavaScript/bom/arraybuffer" },
      {
        text: "File 对象，FileList 对象，FileReader 对象",
        link: "/tutorial/JavaScript/bom/file",
      },
      { text: "表单，FormData 对象", link: "/tutorial/JavaScript/bom/form" },
      { text: "IndexedDB API", link: "/tutorial/JavaScript/bom/indexeddb" },
      { text: "Web Worker", link: "/tutorial/JavaScript/bom/webworker" },
    ],
  },
  {
    text: "附录：网页元素接口",
    collapsed: false,
    items: [
      { text: "标签&lt;a&gt;", link: "/tutorial/JavaScript/elements/a" },
      { text: "标签&lt;img&gt;", link: "/tutorial/JavaScript/elements/image" },
      { text: "标签&lt;form&gt;", link: "/tutorial/JavaScript/elements/form" },
      { text: "标签&lt;input&gt;", link: "/tutorial/JavaScript/elements/input" },
      { text: "标签&lt;button&gt;", link: "/tutorial/JavaScript/elements/button" },
      { text: "标签&lt;option&gt;", link: "/tutorial/JavaScript/elements/option" },
      {
        text: "标签&lt;video&gt;, &lt;audio&gt;",
        link: "/tutorial/JavaScript/elements/video",
      },
    ],
  },
];

const data = {
  directory,
  home,
};

export default data;
