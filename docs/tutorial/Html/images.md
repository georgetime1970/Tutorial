# 图片

## 定义

HTML 通过 `<img>`、`<picture>`、`<figure>` 等标签在页面中嵌入**静态位图**（JPEG、PNG、WebP、AVIF 等），并借助 `srcset` / `sizes` 向浏览器提供多分辨率候选，由浏览器选择最合适的资源。图片是**替换元素**（replaced element），默认按固有尺寸占位，可通过 CSS 改变显示大小。

## 核心概念

| 概念 | 说明 |
| ---- | ---- |
| **替换元素** | 内容由外部资源决定，`width`/`height` 影响布局占位，不等同于 CSS 盒子内容区 |
| **响应式图片** | 同一 `<img>` 配 `srcset`+`sizes`，或 `<picture>` 配多 `<source>`，按视口/DPR 选图 |
| **描述性文本** | `alt` 在图片无法显示或读屏时替代；装饰性图片应设 `alt=""` |
| **CLS 预防** | 始终写 `width`/`height`（或 CSS `aspect-ratio`），浏览器可预留空间 |
| **懒加载** | `loading="lazy"` 推迟视口外图片请求；首屏关键图用 `loading="eager"` 或省略 |

## `<img>` 属性速查

| 属性 | 常用值 / 说明 | 何时用 |
| ---- | ------------- | ------ |
| `src` | URL | 默认图源；与 `srcset` 中 `1x` 候选配合 |
| `alt` | 文本；装饰图用 `""` | **必填**；SEO 与无障碍 |
| `width` / `height` | 像素（固有或期望比例） | 防布局偏移；可配合 CSS 缩放 |
| `srcset` | `url 400w, url 800w 2x` | 多宽度或 DPR 候选 |
| `sizes` | `(max-width:600px) 100vw, 50vw` | 告诉浏览器各断点下显示宽度，配合 `w` 描述符 |
| `loading` | `lazy` \| `eager` | 非首屏大图用 `lazy` |
| `decoding` | `async` \| `sync` \| `auto` | 大图解码不阻塞绘制时用 `async` |
| `fetchpriority` | `high` \| `low` \| `auto` | LCP  hero 图可设 `high` |
| `crossorigin` | `anonymous` \| `use-credentials` | Canvas 读像素或 CORS 字体相关场景 |

## `<picture>` 与 `<source>`

| 元素 / 属性 | 说明 |
| ----------- | ---- |
| `<picture>` | 容器；内部最后必须是 fallback `<img>` |
| `<source media="...">` | 按媒体查询切换（如 `(max-width: 768px)`） |
| `<source type="image/webp">` | 按 MIME 类型选格式（旧浏览器跳过） |
| `<source srcset sizes>` | 与 `<img>` 相同语法，优先级高于 `<img>` 的 `srcset` |
| fallback `<img>` | 必须存在；承担 `alt` 与实际渲染 |

## `<figure>` 与 `<figcaption>`

| 元素 | 说明 |
| ---- | ---- |
| `<figure>` | 独立图文单元（图、代码、引用等） |
| `<figcaption>` | 标题/说明；可放在 `<figure>` 内任意位置，通常首尾 |

## 示例

### 基础 img + 防 CLS

```html
<!-- alt 描述内容；width/height 保留宽高比占位 -->
<img
  src="/images/hero-800.jpg"
  alt="团队在产品发布会上的合影"
  width="800"
  height="450"
  loading="eager"
  decoding="async"
/>
```

### srcset + sizes（单 img 响应式）

```html
<!--
  sizes：浏览器按视口计算显示宽度
  srcset：提供 400/800/1200 物理宽度候选，浏览器选最合适的一张
-->
<img
  src="/images/product-800.jpg"
  srcset="
    /images/product-400.jpg 400w,
    /images/product-800.jpg 800w,
    /images/product-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 600px"
  alt="无线耳机产品图"
  width="800"
  height="800"
  loading="lazy"
/>
```

### picture：格式 + 断点

```html
<figure>
  <picture>
    <!-- 小屏用裁剪版 -->
    <source
      media="(max-width: 768px)"
      srcset="/images/banner-mobile.webp"
      type="image/webp"
    />
    <!-- 大屏 WebP -->
    <source srcset="/images/banner.webp" type="image/webp" />
    <!-- JPEG 回退 -->
    <img
      src="/images/banner.jpg"
      alt="2026 春季促销活动横幅"
      width="1920"
      height="600"
    />
  </picture>
  <figcaption>图 1：首页促销横幅（WebP 优先）</figcaption>
</figure>
```

## 常见陷阱

| 问题 | 原因 | 建议 |
| ---- | ---- | ---- |
| 布局跳动（CLS） | 未设 `width`/`height` 或 `aspect-ratio` | HTML 写尺寸 + CSS `max-width:100%;height:auto` |
| `alt` 堆砌关键词 | 把 SEO 当 `alt` 用途 | `alt` 描述**图片信息**；标题用 `<figcaption>` 或正文 |
| 装饰图可读 | 无意义图写了冗长 `alt` | 装饰/纯背景：`alt=""`，必要时 `role="presentation"` |
| `sizes` 写错 | 与 CSS 实际宽度不符 | `sizes` 应对应**渲染后**宽度，不是文件像素 |
| 仅 `2x` 无 `w` | 移动端仍下载过大图 | 内容图优先 `400w,800w` + 合理 `sizes` |
| 首屏 LCP 被 lazy | hero 图误加 `loading="lazy"` | LCP 候选图：`eager` + 预加载 `<link rel="preload" as="image">` |
| Retina 只换 `src` | 一条 URL 无法兼顾 DPR | 用 `srcset` 的 `w` 或 `x` 描述符 |

## 延伸阅读（MDN）

- [`<img>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)
- [`<picture>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture)
- [`<source>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source)
- [`<figure>` / `<figcaption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure)
- [响应式图片](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Responsive_images)
- [`srcset` 与 `sizes`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#srcset)
