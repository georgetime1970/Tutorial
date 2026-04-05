import { defineConfig } from "vitepress";
import { nav, sidebar } from "../index";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "乔治的编程手册",
  description: "乔治的编程手册, 记录编程学习过程",
  // base: '/Tutorial/', // GitHub 页面下部署站点，则需要设置此项,注意斜杠开头和结尾不能少！
  head: [
    // 站点图标
    // ['link', { rel: 'icon', href: '/Tutorial/logo/will-o.ico' }], // 如果使用github的域名,构建到GitHub 页面,需要加仓库的名字
    ["link", { rel: "icon", href: "/logo/will-o.ico" }], // 构建到GitHub 页面,需要加仓库的名字
  ],
  // markdown 配置
  markdown: {
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
  },
  // 站点地图
  sitemap: {
    hostname: "https://tutorial.jiangyahan.com",
  },
  // 主题级选项
  themeConfig: {
    // 导航栏上显示的 Logo，位于站点标题前。
    logo: "/logo/will-o.png",
    // 启用本地搜索
    search: {
      provider: "local",
    },
    //  最后更新于
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    // 编辑链接配置
    editLink: {
      // GitHub (最常用)
      pattern: "https://github.com/georgetime1970/Tutorial/tree/main/docs/:path",
      text: "在 GitHub 上编辑此页",
    },

    // 添加自定义的 Codespaces 链接
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    // 配置右侧目录大纲
    outline: {
      level: [2, 6], // 显示 h2 到 h6 的标题
      label: "目录大纲",
    },

    // 顶部导航栏
    nav: nav,

    // 侧边栏是文档的主要导航块
    sidebar: sidebar,

    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/georgetime1970" }],
  },
});
