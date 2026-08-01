// 全局目录配置文件
// 汇总顶部导航栏, 首页导航按钮, 侧边栏详情,修改此文件即可全局生效
import MyThink from "./MyThink";
import Asm from "./tutorial/Asm";
import Css from "./tutorial/Css";
import Docker from "./tutorial/Docker";
import ES6 from "./tutorial/ES6";
import Git from "./tutorial/Git";
import GithubActions from "./tutorial/GithubActions";
import Html from "./tutorial/Html";
import JavaScript from "./tutorial/JavaScript";
import JavaScript_My from "./tutorial/JavaScript_My";
import Linux from "./tutorial/Linux";
import Nuxt from "./tutorial/Nuxt";
import SQLite from "./tutorial/SQLite";
import TypeScript from "./tutorial/TypeScript";
// 顶部导航栏, 首页导航按钮组件/侧边栏详情皆复用的此数据
export const nav = [
  {
    text: "基础", // 顶部导航栏分类可以随便写
    // 下面的items.text值必须与目录名一致!!! 否则侧边栏详情将生成错误
    items: [
      { text: "JavaScript", link: JavaScript[0].items[0].link, directory: JavaScript },
      { text: "ES6", link: ES6[0].items[0].link, directory: ES6 },
      { text: "TypeScript", link: TypeScript[0].items[0].link, directory: TypeScript },
    ],
  },
  {
    text: "笔记",
    items: [
      { text: "Asm", link: Asm[0].items[0].link, directory: Asm },
      { text: "Html", link: Html[0].items[0].link, directory: Html },
      { text: "Css", link: Css[0].items[0].link, directory: Css },
      { text: "JavaScript_My", link: JavaScript_My[0].items[0].link, directory: JavaScript_My },
      { text: "Nuxt", link: Nuxt[0].items[0].link, directory: Nuxt },
      { text: "Linux", link: Linux[0].items[0].link, directory: Linux },
      { text: "Git", link: Git[0].items[0].link, directory: Git },
      { text: "Docker", link: Docker[0].items[0].link, directory: Docker },
      { text: "GithubActions", link: GithubActions[0].items[0].link, directory: GithubActions },
      { text: "SQLite", link: SQLite[0].items[0].link, directory: SQLite },
    ],
  },
  { text: "Think", items: [{ text: "MyThink", link: MyThink[0].items[0].link, directory: MyThink }] },
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
