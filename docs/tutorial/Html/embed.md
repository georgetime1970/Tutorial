# 嵌入内容

## 定义

**嵌入内容**指将外部文档、插件或应用载入当前页面：最常用的是 `<iframe>`（嵌套浏览上下文）；`<embed>`、`<object>` 多用于插件或备用 HTML 回退。嵌入会引入**独立的安全边界**，必须控制来源、权限与沙箱策略。

## 核心概念

| 概念 | 说明 |
| ---- | ---- |
| **浏览上下文** | iframe 内页面有独立 `window`、Cookie、存储（同源策略下） |
| **同源策略** | 父页面 JS 无法读跨域 iframe DOM；`postMessage` 可安全通信 |
| **sandbox** | 限制 iframe 能力：脚本、表单、弹窗、同源等 |
| **Permissions Policy** | 通过 `allow` 声明可使用的 powerful features（相机、全屏等） |
| **点击劫持** | 透明 iframe 盖在诱导按钮上；用 `X-Frame-Options` / CSP `frame-ancestors` 防护 |

## `<iframe>` 属性速查

| 属性 | 说明 | 推荐 |
| ---- | ---- | ---- |
| `src` | 嵌入文档 URL | 可信 HTTPS 源 |
| `title` | 无障碍名称 | **必填**，描述 iframe 用途 |
| `width` / `height` | 尺寸 | 或用 CSS；防 CLS |
| `loading` | `lazy` \| `eager` | 非首屏地图/广告用 `lazy` |
| `name` | 浏览上下文名 | `target` 指向、脚本引用 |
| `sandbox` | 空格分隔限制令牌 | 见下表；最小权限原则 |
| `allow` | Permissions Policy | 如 `fullscreen; payment` |
| `referrerpolicy` | 请求 iframe 资源时的 Referer | 第三方常设 `strict-origin-when-cross-origin` |
| `allowfullscreen` | 允许全屏（旧） | 优先用 `allow="fullscreen"` |
| `srcdoc` | 内联 HTML 字符串 | 简单沙盒内容，注意转义 |
| `credentialless` | 无凭据加载（实验/部分浏览器） | 降低跨站 Cookie 风险 |

### `sandbox` 令牌

| 令牌 | 效果 |
| ---- | ---- |
| （空） | 最严：禁止脚本、表单、弹窗、同源、top 导航等 |
| `allow-scripts` | 允许 JS（仍禁止同源访问） |
| `allow-same-origin` | 与 `allow-scripts` 同用才恢复同源；**慎用** |
| `allow-forms` | 允许提交表单 |
| `allow-popups` | 允许 `window.open` |
| `allow-top-navigation-by-user-activation` | 用户激活时可改 top URL |
| `allow-downloads` | 允许下载 |

## `<embed>` 与 `<object>`

| 元素 | 典型用途 | 主要属性 |
| ---- | -------- | -------- |
| `<embed>` | 插件内容（PDF 查看器等，已式微） | `src`, `type`, `width`, `height` |
| `<object>` | 外部资源 + **回退 HTML** | `data`, `type`, `width`, `height`；子节点为 fallback |

现代 Web 优先 `<iframe>` 嵌同源/可信 SPA；PDF 等多用浏览器内置查看或 `<iframe src="file.pdf">`。

## iframe 安全要点

| 风险 | 缓解 |
| ---- | ---- |
| 恶意站点嵌你的页（点击劫持） | 响应头 `Content-Security-Policy: frame-ancestors 'self'` 或 `X-Frame-Options: DENY` |
| 嵌不可信第三方 | `sandbox` 默认全开限制；仅按需加令牌 |
| `sandbox` + `allow-same-origin` + `allow-scripts` | 等同给予完整脚本能力，仅防 top 导航等 |
| 钓鱼 / 假冒 UI | 明确 `title`；视觉上区分 iframe 边界 |
| 敏感数据经 Referer 泄露 | `referrerpolicy="no-referrer"` 或严格策略 |
| 过度 `allow` | 只列需要的 feature，如 `allow="clipboard-write"` |

## 示例

### 安全的第三方 iframe（地图）

```html
<!-- title 供读屏；sandbox 按需放开；lazy 推迟加载 -->
<iframe
  title="公司总部位置 - 交互式地图"
  src="https://maps.example.com/embed?id=123"
  width="600"
  height="450"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  allow="fullscreen"
  sandbox="allow-scripts allow-same-origin allow-popups"
></iframe>
```

### 沙盒广告 / 不可信 HTML

```html
<!-- 无 allow-same-origin：脚本无法访问父页面 Cookie -->
<iframe
  title="赞助商内容"
  src="https://ads.example.com/slot/1"
  width="300"
  height="250"
  loading="lazy"
  sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
  referrerpolicy="no-referrer"
></iframe>
```

### object 回退

```html
<object data="/report.pdf" type="application/pdf" width="100%" height="600">
  <!-- PDF 无法显示时的回退 -->
  <p>无法内嵌 PDF，请 <a href="/report.pdf">下载报告</a>。</p>
</object>
```

### 父页与 iframe 通信（postMessage）

```javascript
// 父页面：仅接受预期 origin
window.addEventListener("message", (event) => {
  if (event.origin !== "https://trusted.example.com") return;
  // 处理 event.data
});

const frame = document.querySelector("iframe");
frame.contentWindow.postMessage({ type: "init" }, "https://trusted.example.com");
```

## 常见陷阱

| 问题 | 建议 |
| ---- | ---- |
| 缺少 `title` | 无障碍审计必失败；写清 iframe 作用 |
| 全宽 iframe 高度为 0 | 用固定高度、aspect-ratio 或 JS 同源 resize |
| 嵌登录页在 iframe | 许多站点 CSP 禁止被嵌；OAuth 常用 top-level 重定向 |
| 忘记 CSP `frame-src` | 限制页面**可嵌**哪些源，防 XSS 后嵌恶意 iframe |
| `sandbox=""` 但内容需表单 | 加 `allow-forms`，仍避免 `allow-same-origin` 除非必要 |
| 混用 HTTP iframe 于 HTTPS 页 | 混合内容被 block |

## 延伸阅读（MDN）

- [`<iframe>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)
- [`<embed>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed)
- [`<object>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object)
- [iframe 沙箱](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#sandbox)
- [Permissions Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Permissions_Policy)
- [Window.postMessage()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)
