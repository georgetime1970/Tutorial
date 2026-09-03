<div align="center">

# 乔治的编程手册

收集整理编程教程，并记录自己的学习笔记。

[在线阅读](https://tutorial.jiangyahan.com/) · [GitHub](https://github.com/georgetime1970/Tutorial)

</div>

## 内容

站点按三块组织，导航在 `docs/index.ts` 里统一配置。

### 基础

完整收录阮一峰 [网道](https://wangdoc.com/) 的开源教程，方便对照阅读：

| 教程 | 原文 | 仓库 |
| --- | --- | --- |
| C | [wangdoc.com/clang](https://wangdoc.com/clang/) | [clang-tutorial](https://github.com/wangdoc/clang-tutorial) |
| Bash | [wangdoc.com/bash](https://wangdoc.com/bash/) | [bash-tutorial](https://github.com/wangdoc/bash-tutorial) |
| JavaScript | [wangdoc.com/javascript](https://wangdoc.com/javascript/) | [javascript-tutorial](https://github.com/wangdoc/javascript-tutorial) |
| ES6 | [wangdoc.com/es6](https://wangdoc.com/es6/) | [es6-tutorial](https://github.com/wangdoc/es6-tutorial) |
| TypeScript | [wangdoc.com/typescript](https://wangdoc.com/typescript/) | [typescript-tutorial](https://github.com/wangdoc/typescript-tutorial) |

C 标准库补充了原文目录未挂出的 `stdarg.h`、`stdbool.h`、`stddef.h`；Bash 补充了仓库 `archives/commands/` 里的命令笔记。正文未改。

### 笔记

自己的学习笔记：Asm、Html、Css、JavaScript_My、Nuxt、Linux、Git、Docker、GithubActions、SQLite。

### Think

个人思考，见 `docs/MyThink/`。

## 署名与许可

「基础」中的教程来自网道项目，作者 [阮一峰](https://www.ruanyifeng.com/)，采用 [知识共享 署名-相同方式共享 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.zh)（CC BY-SA 3.0）。可以自由使用，包括商业用途；转载或改编时需保留「来自网道项目」的署名，并以相同协议分享。

本仓库站点代码和「笔记」「Think」归整理者所有。

## 本地开发

使用 [VitePress](https://vitepress.dev/zh/) 构建。

```bash
npm install
npm run dev      # 本地预览
npm run build    # 生产构建
npm run preview  # 预览构建结果
```

站点配置见 `docs/.vitepress/config.mts`。新增教程时：在 `docs/tutorial/`（或 `docs/MyThink/`）放入 Markdown，写好该目录的 `index.ts`，再登记到 `docs/index.ts`。`items.text` 必须与目录名一致，否则侧边栏会错。

## 目录结构

```
.
├─ docs
│  ├─ .vitepress/     # VitePress 配置与主题
│  ├─ tutorial/       # 教程与笔记
│  ├─ MyThink/        # 个人思考
│  ├─ index.md        # 首页
│  └─ index.ts        # 导航与侧边栏
├─ package.json
└─ README.md
```

- `docs/` 是站点根目录
- `docs/.vitepress/config.mts` 是站点配置
- `docs/.vitepress/cache/`、`docs/.vitepress/dist/` 分别是开发缓存和生产构建输出，不入库
