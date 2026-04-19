// 全局目录配置文件
// 汇总顶部导航栏, 首页导航按钮, 侧边栏详情,修改此文件即可全局生效
import MyThink from "./MyThink";
import Css from "./tutorial/Css";
import Docker from "./tutorial/Docker";
import ES6 from "./tutorial/ES6";
import Git from "./tutorial/Git";
import GithubActions from "./tutorial/GithubActions";
import Html from "./tutorial/Html";
import JavaScript from "./tutorial/JavaScript";
import JavaScript_My from "./tutorial/JavaScript_My";
import Linux from "./tutorial/Linux";
import Rust from "./tutorial/Rust";
import SQLite from "./tutorial/SQLite";
import TypeScript from "./tutorial/TypeScript";
import Vue from "./tutorial/Vue";

// 顶部导航栏, 首页导航按钮组件/侧边栏详情皆复用的此数据
export const nav = [
  {
    text: "基础", // 顶部导航栏分类可以随便写
    // 下面的items.text值必须与目录名一致!!! 否则侧边栏详情将生成错误
    items: [
      { text: "JavaScript", link: JavaScript.home, directory: JavaScript.directory },
      { text: "ES6", link: ES6.home, directory: ES6.directory },
      { text: "TypeScript", link: TypeScript.home, directory: TypeScript.directory },
    ],
  },
  {
    text: "笔记",
    items: [
      { text: "Rust", link: Rust[0].items[0].link, directory: Rust }, // 只使用一个侧边栏数据
      { text: "Html", link: Html.home, directory: Html.directory },
      { text: "Css", link: Css.home, directory: Css.directory },
      { text: "JavaScript_My", link: JavaScript_My.home, directory: JavaScript_My.directory },
      { text: "Vue", link: Vue.home, directory: Vue.directory },
      { text: "Linux", link: Linux.home, directory: Linux.directory },
      { text: "Git", link: Git.home, directory: Git.directory },
      { text: "Docker", link: Docker.home, directory: Docker.directory },
      { text: "GithubActions", link: GithubActions.home, directory: GithubActions.directory },
      { text: "SQLite", link: SQLite.home, directory: SQLite.directory },
    ],
  },
  { text: "Think", items: [{ text: "MyThink", link: MyThink.home, directory: MyThink.directory }] },
];

// 根据顶部导航栏数据,自动生成侧边栏详情 {"/tutorial/JavaScript/": JavaScript.directory, ...}
const sidebarObj: {
  [x: string]: {
    text: string;
    items: {
      text: string;
      link: string;
    }[];
  }[];
} = {};
for (const item of nav) {
  for (const subItem of item.items) {
    let title = `/tutorial/${subItem.text}/`;
    //单独处理思考的侧边栏路径
    if (subItem.text === "MyThink") {
      title = `/${subItem.text}/`;
    }
    sidebarObj[title] = subItem.directory;
  }
}
export const sidebar = sidebarObj;

// 侧边栏详情
// export const sidebar = {
//   // JavaScript基础 侧边栏
//   "/tutorial/JavaScript/": JavaScript.directory,
//   // ES6基础 侧边栏
//   "/tutorial/ES6/": ES6.directory,
//   // TypeScript基础 侧边栏
//   "/tutorial/TypeScript/": TypeScript.directory,
//   // Html笔记 侧边栏
//   "/tutorial/Html/": Html.directory,
//   // Css笔记 侧边栏
//   "/tutorial/Css/": Css.directory,
//   // JavaScript 笔记手册 侧边栏
//   "/tutorial/JavaScript_My/": JavaScript_My.directory,
//   // Vue手册 侧边栏
//   "/tutorial/Vue/": Vue.directory,
//   // Linux笔记 侧边栏
//   "/tutorial/Linux/": Linux.directory,
//   // Git笔记 侧边栏
//   "/tutorial/Git/": Git.directory,
//   // Docker笔记 侧边栏
//   "/tutorial/Docker/": Docker.directory,
//   // Github Actions笔记 侧边栏
//   "/tutorial/GithubActions/": GithubActions.directory,
//   // SQLite笔记 侧边栏
//   "/tutorial/SQLite/": SQLite.directory,
//   // 思想结晶 侧边栏
//   "/MyThink/": MyThink.directory,
// };

// 中间工具链接
