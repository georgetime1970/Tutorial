import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '乔治的编程手册',
  description: '乔治的编程手册, 记录编程学习过程',
  // base: '/Tutorial/', // GitHub 页面下部署站点，则需要设置此项,注意斜杠开头和结尾不能少！
  head: [
    // 站点图标
    // ['link', { rel: 'icon', href: '/Tutorial/logo/will-o.ico' }], // 如果使用github的域名,构建到GitHub 页面,需要加仓库的名字
    ['link', { rel: 'icon', href: '/logo/will-o.ico' }], // 构建到GitHub 页面,需要加仓库的名字
  ],
  // markdown 配置
  markdown: {
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
  },
  // 主题级选项
  themeConfig: {
    // 导航栏上显示的 Logo，位于站点标题前。
    logo: '/logo/will-o.png',
    // 启用本地搜索
    search: {
      provider: 'local',
    },
    //  最后更新于
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },
    // 编辑链接配置
    editLink: {
      // GitHub (最常用)
      pattern: 'https://github.com/georgetime1970/Tutorial/tree/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    // 添加自定义的 Codespaces 链接
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    // 配置右侧目录大纲
    outline: {
      level: [2, 6], // 显示 h2 到 h6 的标题
      label: '目录大纲',
    },

    // 顶部导航栏
    nav: [
      { text: '主页', link: '/' },
      { text: 'JS基础', link: '/tutorial/JavaScript/basic/introduction' },
      { text: 'ES6基础', link: '/tutorial/ES6/intro' },
      { text: 'TS基础', link: '/tutorial/TypeScript/intro' },
      { text: 'JS笔记', link: '/tutorial/JavaScript_My/1_基础第一天' },
      { text: 'Vue手册', link: '/tutorial/Vue/1_vue简介' },
      { text: 'Linux笔记', link: '/tutorial/Linux/note' },
      { text: '笔记', link: '/tutorial/Note/Git/note' },
      { text: '思考', link: '/MyThink/思想核心' },
    ],

    // 侧边栏是文档的主要导航块
    sidebar: {
      // JavaScript基础 侧边栏
      '/tutorial/JavaScript/': [
        {
          text: '入门篇',
          collapsed: false,
          items: [
            { text: '导论', link: '/tutorial/JavaScript/basic/introduction' },
            { text: '历史', link: '/tutorial/JavaScript/basic/history' },
            { text: '基本语法', link: '/tutorial/JavaScript/basic/grammar' },
          ],
        },
        {
          text: '数据类型',
          collapsed: false,
          items: [
            { text: '概述', link: '/tutorial/JavaScript/types/general' },
            {
              text: 'null，undefined 和布尔值',
              link: '/tutorial/JavaScript/types/null-undefined-boolean',
            },
            { text: '数值', link: '/tutorial/JavaScript/types/number' },
            { text: '字符串', link: '/tutorial/JavaScript/types/string' },
            { text: '对象', link: '/tutorial/JavaScript/types/object' },
            { text: '函数', link: '/tutorial/JavaScript/types/function' },
            { text: '数组', link: '/tutorial/JavaScript/types/array' },
          ],
        },
        {
          text: '运算符',
          collapsed: false,
          items: [
            { text: '算术运算符', link: '/tutorial/JavaScript/operators/arithmetic' },
            { text: '比较运算符', link: '/tutorial/JavaScript/operators/comparison' },
            { text: '布尔运算符', link: '/tutorial/JavaScript/operators/boolean' },
            { text: '二进制位运算符', link: '/tutorial/JavaScript/operators/bit' },
            { text: '其他运算符，运算顺序', link: '/tutorial/JavaScript/operators/priority' },
          ],
        },
        {
          text: '语法专题',
          collapsed: false,
          items: [
            { text: '数据类型的转换', link: '/tutorial/JavaScript/features/conversion' },
            { text: '错误处理机制', link: '/tutorial/JavaScript/features/error' },
            { text: '编程风格', link: '/tutorial/JavaScript/features/style' },
            { text: 'console 对象与控制台', link: '/tutorial/JavaScript/features/console' },
          ],
        },
        {
          text: '标准库',
          collapsed: false,
          items: [
            { text: 'Object 对象', link: '/tutorial/JavaScript/stdlib/object' },
            { text: '属性描述对象', link: '/tutorial/JavaScript/stdlib/attributes' },
            { text: 'Array 对象', link: '/tutorial/JavaScript/stdlib/array' },
            { text: '包装对象', link: '/tutorial/JavaScript/stdlib/wrapper' },
            { text: 'Boolean 对象', link: '/tutorial/JavaScript/stdlib/boolean' },
            { text: 'Number 对象', link: '/tutorial/JavaScript/stdlib/number' },
            { text: 'String 对象', link: '/tutorial/JavaScript/stdlib/string' },
            { text: 'Math 对象', link: '/tutorial/JavaScript/stdlib/math' },
            { text: 'Date 对象', link: '/tutorial/JavaScript/stdlib/date' },
            { text: 'RegExp 对象', link: '/tutorial/JavaScript/stdlib/regexp' },
            { text: 'JSON 对象', link: '/tutorial/JavaScript/stdlib/json' },
          ],
        },
        {
          text: '面向对象编程',
          collapsed: false,
          items: [
            { text: '实例对象与 new 命令', link: '/tutorial/JavaScript/oop/new' },
            { text: 'this 关键字', link: '/tutorial/JavaScript/oop/this' },
            { text: '对象的继承', link: '/tutorial/JavaScript/oop/prototype' },
            { text: 'Object 对象的相关方法', link: '/tutorial/JavaScript/oop/object' },
            { text: '严格模式', link: '/tutorial/JavaScript/oop/strict' },
          ],
        },
        {
          text: '异步操作',
          collapsed: false,
          items: [
            { text: '概述', link: '/tutorial/JavaScript/async/general' },
            { text: '定时器', link: '/tutorial/JavaScript/async/timer' },
            { text: 'Promise 对象', link: '/tutorial/JavaScript/async/promise' },
          ],
        },
        {
          text: 'DOM',
          collapsed: false,
          items: [
            { text: '概述', link: '/tutorial/JavaScript/dom/general' },
            { text: 'Node 接口', link: '/tutorial/JavaScript/dom/node' },
            {
              text: 'NodeList 接口，HTMLCollection 接口',
              link: '/tutorial/JavaScript/dom/nodelist',
            },
            {
              text: 'ParentNode 接口，ChildNode 接口',
              link: '/tutorial/JavaScript/dom/parentnode',
            },
            { text: 'Document 节点', link: '/tutorial/JavaScript/dom/document' },
            { text: 'Element 节点', link: '/tutorial/JavaScript/dom/element' },
            { text: '属性的操作', link: '/tutorial/JavaScript/dom/attributes' },
            { text: 'Text 节点和 DocumentFragment 节点', link: '/tutorial/JavaScript/dom/text' },
            { text: 'CSS 操作', link: '/tutorial/JavaScript/dom/css' },
            { text: 'Mutation Observer API', link: '/tutorial/JavaScript/dom/mutationobserver' },
          ],
        },
        {
          text: '事件',
          collapsed: false,
          items: [
            { text: 'EventTarget 接口', link: '/tutorial/JavaScript/events/eventtarget' },
            { text: '事件模型', link: '/tutorial/JavaScript/events/model' },
            { text: 'Event 对象', link: '/tutorial/JavaScript/events/event' },
            { text: '鼠标事件', link: '/tutorial/JavaScript/events/mouse' },
            { text: '键盘事件', link: '/tutorial/JavaScript/events/keyboard' },
            { text: '进度事件', link: '/tutorial/JavaScript/events/progress' },
            { text: '表单事件', link: '/tutorial/JavaScript/events/form' },
            { text: '触摸事件', link: '/tutorial/JavaScript/events/touch' },
            { text: '拖拉事件', link: '/tutorial/JavaScript/events/drag' },
            { text: '其他常见事件', link: '/tutorial/JavaScript/events/common' },
            {
              text: 'GlobalEventHandlers 接口',
              link: '/tutorial/JavaScript/events/globaleventhandlers',
            },
          ],
        },
        {
          text: '浏览器模型',
          collapsed: false,
          items: [
            { text: '浏览器模型概述', link: '/tutorial/JavaScript/bom/engine' },
            { text: 'window 对象', link: '/tutorial/JavaScript/bom/window' },
            { text: 'Navigator 对象，Screen 对象', link: '/tutorial/JavaScript/bom/navigator' },
            { text: 'Cookie', link: '/tutorial/JavaScript/bom/cookie' },
            { text: 'XMLHttpRequest 对象', link: '/tutorial/JavaScript/bom/xmlhttprequest' },
            { text: '同源限制', link: '/tutorial/JavaScript/bom/same-origin' },
            { text: 'CORS 通信', link: '/tutorial/JavaScript/bom/cors' },
            { text: 'Storage 接口', link: '/tutorial/JavaScript/bom/storage' },
            { text: 'History 对象', link: '/tutorial/JavaScript/bom/history' },
            {
              text: 'Location 对象，URL 对象，URLSearchParams 对象',
              link: '/tutorial/JavaScript/bom/location',
            },
            { text: 'ArrayBuffer 对象，Blob 对象', link: '/tutorial/JavaScript/bom/arraybuffer' },
            {
              text: 'File 对象，FileList 对象，FileReader 对象',
              link: '/tutorial/JavaScript/bom/file',
            },
            { text: '表单，FormData 对象', link: '/tutorial/JavaScript/bom/form' },
            { text: 'IndexedDB API', link: '/tutorial/JavaScript/bom/indexeddb' },
            { text: 'Web Worker', link: '/tutorial/JavaScript/bom/webworker' },
          ],
        },
        {
          text: '附录：网页元素接口',
          collapsed: false,
          items: [
            { text: '标签&lt;a&gt;', link: '/tutorial/JavaScript/elements/a' },
            { text: '标签&lt;img&gt;', link: '/tutorial/JavaScript/elements/image' },
            { text: '标签&lt;form&gt;', link: '/tutorial/JavaScript/elements/form' },
            { text: '标签&lt;input&gt;', link: '/tutorial/JavaScript/elements/input' },
            { text: '标签&lt;button&gt;', link: '/tutorial/JavaScript/elements/button' },
            { text: '标签&lt;option&gt;', link: '/tutorial/JavaScript/elements/option' },
            {
              text: '标签&lt;video&gt;, &lt;audio&gt;',
              link: '/tutorial/JavaScript/elements/video',
            },
          ],
        },
      ],

      // ES6基础 侧边栏
      '/tutorial/ES6/': [
        {
          text: 'ES6基础',
          items: [
            { text: '简介', link: '/tutorial/ES6/intro' },
            { text: 'let 和 const 命令', link: '/tutorial/ES6/let' },
            { text: '变量的解构赋值', link: '/tutorial/ES6/destructuring' },
            { text: '字符串的扩展', link: '/tutorial/ES6/string' },
            { text: '字符串的新增方法', link: '/tutorial/ES6/string-methods' },
            { text: '正则的扩展', link: '/tutorial/ES6/regex' },
            { text: '数值的扩展', link: '/tutorial/ES6/number' },
            { text: '函数的扩展', link: '/tutorial/ES6/function' },
            { text: '数组的扩展', link: '/tutorial/ES6/array' },
            { text: '对象的扩展', link: '/tutorial/ES6/object' },
            { text: '对象的新增方法', link: '/tutorial/ES6/object-methods' },
            { text: '运算符的扩展', link: '/tutorial/ES6/operator' },
            { text: 'Symbol', link: '/tutorial/ES6/symbol' },
            { text: 'Set 和 Map 数据结构', link: '/tutorial/ES6/set-map' },
            { text: 'Proxy', link: '/tutorial/ES6/proxy' },
            { text: 'Reflect', link: '/tutorial/ES6/reflect' },
            { text: 'Promise 对象', link: '/tutorial/ES6/promise' },
            { text: 'Iterator 和 for...of 循环', link: '/tutorial/ES6/iterator' },
            { text: 'Generator 函数的语法', link: '/tutorial/ES6/generator' },
            { text: 'Generator 函数的异步应用', link: '/tutorial/ES6/generator-async' },
            { text: 'async 函数', link: '/tutorial/ES6/async' },
            { text: 'Class 的基本语法', link: '/tutorial/ES6/class' },
            { text: 'Class 的继承', link: '/tutorial/ES6/class-extends' },
            { text: 'Module 的语法', link: '/tutorial/ES6/module' },
            { text: 'Module 的加载实现', link: '/tutorial/ES6/module-loader' },
            { text: '编程风格', link: '/tutorial/ES6/style' },
            { text: '读懂规格', link: '/tutorial/ES6/spec' },
            { text: '异步遍历器', link: '/tutorial/ES6/async-iterator' },
            { text: 'ArrayBuffer', link: '/tutorial/ES6/arraybuffer' },
            { text: '最新提案', link: '/tutorial/ES6/proposals' },
            { text: 'Decorator', link: '/tutorial/ES6/decorator' },
            { text: '参考链接', link: '/tutorial/ES6/reference' },
          ],
        },
      ],

      // TypeScript基础 侧边栏
      '/tutorial/TypeScript/': [
        {
          text: '入门篇',
          collapsed: false,
          items: [
            { text: '简介', link: '/tutorial/TypeScript/intro' },
            { text: '基本用法', link: '/tutorial/TypeScript/basic' },
            { text: 'any 类型', link: '/tutorial/TypeScript/any' },
            { text: '类型系统', link: '/tutorial/TypeScript/types' },
          ],
        },
        {
          text: '数据类型',
          collapsed: false,
          items: [
            { text: '数组', link: '/tutorial/TypeScript/array' },
            { text: '元组', link: '/tutorial/TypeScript/tuple' },
            { text: 'symbol 类型', link: '/tutorial/TypeScript/symbol' },
            { text: '函数', link: '/tutorial/TypeScript/function' },
            { text: '对象', link: '/tutorial/TypeScript/object' },
            { text: 'interface', link: '/tutorial/TypeScript/interface' },
            { text: '类', link: '/tutorial/TypeScript/class' },
            { text: 'Enum 类型', link: '/tutorial/TypeScript/enum' },
          ],
        },
        {
          text: '进阶特性',
          collapsed: false,
          items: [
            { text: '泛型', link: '/tutorial/TypeScript/generics' },
            { text: '类型断言', link: '/tutorial/TypeScript/assert' },
            { text: '类型运算符', link: '/tutorial/TypeScript/operator' },
            { text: '类型映射', link: '/tutorial/TypeScript/mapping' },
            { text: '类型工具', link: '/tutorial/TypeScript/utility' },
          ],
        },
        {
          text: '模块与声明',
          collapsed: false,
          items: [
            { text: '模块', link: '/tutorial/TypeScript/module' },
            { text: 'namespace', link: '/tutorial/TypeScript/namespace' },
            { text: 'declare 关键字', link: '/tutorial/TypeScript/declare' },
            { text: 'd.ts 类型声明文件', link: '/tutorial/TypeScript/d_ts' },
          ],
        },
        {
          text: '装饰器',
          collapsed: false,
          items: [
            { text: '装饰器', link: '/tutorial/TypeScript/decorator' },
            { text: '装饰器（旧语法）', link: '/tutorial/TypeScript/decorator-legacy' },
          ],
        },
        {
          text: '工具与配置',
          collapsed: false,
          items: [
            { text: '注释指令', link: '/tutorial/TypeScript/comment' },
            { text: 'tsconfig.json 文件', link: '/tutorial/TypeScript/tsconfig_json' },
            { text: 'tsc 命令', link: '/tutorial/TypeScript/tsc' },
          ],
        },
      ],

      // JavaScript 笔记手册 侧边栏
      '/tutorial/JavaScript_My/': [
        {
          text: '基础',
          collapsed: false,
          items: [
            { text: '变量 数据类型', link: '/tutorial/JavaScript_My/1_基础第一天' },
            { text: '运算符 语句', link: '/tutorial/JavaScript_My/2_基础第二天' },
            { text: 'for 数组', link: '/tutorial/JavaScript_My/3_基础第三天' },
            { text: '函数 作用域', link: '/tutorial/JavaScript_My/4_基础第四天' },
            { text: '对象', link: '/tutorial/JavaScript_My/5_基础第五天' },
          ],
        },
        {
          text: 'WebApis',
          collapsed: false,
          items: [
            { text: 'DOM 基础', link: '/tutorial/JavaScript_My/6_WebApis第一天' },
            { text: '事件监听', link: '/tutorial/JavaScript_My/7_WebApis第二天' },
            { text: '事件流', link: '/tutorial/JavaScript_My/8_WebApis第三天' },
            { text: 'DOM方法', link: '/tutorial/JavaScript_My/9_WebApis第四天' },
            { text: 'BOM方法', link: '/tutorial/JavaScript_My/10_WebApis第五天' },
            { text: '正则表达式', link: '/tutorial/JavaScript_My/11_WebApis第六天' },
            { text: 'WebApis实战', link: '/tutorial/JavaScript_My/12_WebApis实战' },
          ],
        },
        {
          text: '进阶',
          collapsed: false,
          items: [
            { text: '第一天', link: '/tutorial/JavaScript_My/13_进阶第一天' },
            { text: '第二天', link: '/tutorial/JavaScript_My/14_进阶第二天' },
            { text: '第三天', link: '/tutorial/JavaScript_My/15_进阶第三天' },
            { text: '第四天', link: '/tutorial/JavaScript_My/16_进阶第四天' },
          ],
        },
        {
          text: '扩展',
          collapsed: false,
          items: [
            { text: '模块化规范', link: '/tutorial/JavaScript_My/17_模块化' },
            { text: '类实践', link: '/tutorial/JavaScript_My/18_类实践' },
          ],
        },
      ],

      // Vue手册 侧边栏
      '/tutorial/Vue/': [
        {
          text: 'Vue 手册',
          items: [
            { text: 'vue3简介', link: '/tutorial/Vue/1_vue简介' },
            { text: '创建Vue3工程', link: '/tutorial/Vue/2_创建Vue3工程' },
            { text: '核心语法', link: '/tutorial/Vue/3_Vue3核心语法' },
            { text: '路由', link: '/tutorial/Vue/4_路由' },
            { text: 'Pinia', link: '/tutorial/Vue/5_pinia' },
            { text: '组件通信', link: '/tutorial/Vue/6_组件通信' },
            { text: '其他API', link: '/tutorial/Vue/7_其它API' },
            { text: 'Vue3新组件', link: '/tutorial/Vue/8_Vue3新组件' },
          ],
        },
      ],

      // Linux笔记 侧边栏
      '/tutorial/Linux/': [
        {
          text: 'Linux笔记',
          items: [
            { text: 'Ubuntu桌面版配置', link: '/tutorial/Linux/ubuntu_configure' },
            { text: 'Linux基础', link: '/tutorial/Linux/note' },
          ],
        },
      ],

      // 基础笔记 侧边栏
      '/tutorial/Note/': [
        {
          text: '基础笔记',
          items: [
            { text: 'Git', link: '/tutorial/Note/Git/note' },
            { text: 'Docker', link: '/tutorial/Note/Docker/note' },
            { text: 'Github Actions', link: '/tutorial/Note/GithubActions/note' },
          ],
        },
      ],

      // 思想结晶 侧边栏
      '/MyThink/': [
        {
          text: '思考',
          collapsed: false,
          items: [
            { text: '思想核心', link: '/MyThink/思想核心' },
            { text: '摘要', link: '/MyThink/摘要' },
            { text: '自身问题', link: '/MyThink/自身问题' },
            { text: '创业', link: '/MyThink/创业' },
            { text: '经济', link: '/MyThink/经济' },
          ],
        },
      ],
    },

    // 社交链接
    // socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
