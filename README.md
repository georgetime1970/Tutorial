# 编程教程和笔记整理

使用`vitepress`构建前端页面

## vitepress 使用

`vitepress` [站点](https://vitepress.dev/zh/)

### 文件目录

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

- `docs` 目录作为 VitePress 站点的项目根目录。
- `.vitepress` 目录是 VitePress 配置文件、开发服务器缓存、构建输出和可选主题自定义代码的位置。
- `.vitepress/cache` 存储 VitePress 开发服务器缓存
- `.vitepress/dist` 存储生产构建输出
- `.vitepress/config.js` 配置文件,自定义 VitePress 站点的各个方面

### 站点细节配置

https://vitepress.dev/zh/reference/site-config

直接访问,站内搜索
