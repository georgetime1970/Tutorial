# BOM 与本地存储

## 定义

**BOM（Browser Object Model，浏览器对象模型）** 是浏览器提供的、与页面窗口相关的 API 集合，以全局对象 **`window`** 为根。BOM 涵盖地址栏、历史记录、定时器、本地存储等，与 DOM（页面内容）互补，共同构成浏览器端 JavaScript 运行环境。

## 核心概念

- **window**：浏览器标签页的 global 对象；`document`、定时器、`localStorage` 等均挂载其上。
- **location**：当前 URL 信息，可读可写（赋值会触发导航）。
- **history**：会话历史栈，支持前进后退（`back` / `forward` / `go`）。
- **navigator**：浏览器与系统信息（用户代理、语言、在线状态等）。
- **定时器**：`setTimeout` 延迟一次；`setInterval` 重复执行；返回 ID 用于 `clear*` 取消。
- **Web Storage**：`localStorage`（持久）与 `sessionStorage`（标签页会话）；键值均为**字符串**。
- **Cookie**：由服务器 Set-Cookie 下发、随请求自动携带的小型键值；容量小、API 繁琐，现代前端偏好 Storage 存本地数据。

## window 要点

| 属性 / 方法                           | 说明                          |
| ------------------------------------- | ----------------------------- |
| `window.document`                     | 当前文档（DOM 入口）          |
| `window.location`                     | 当前 URL 对象                 |
| `window.history`                      | 浏览历史 API                  |
| `window.navigator`                    | 浏览器信息                    |
| `window.localStorage`                 | 持久本地存储                  |
| `window.sessionStorage`               | 会话级存储                    |
| `window.innerWidth` / `innerHeight`   | 视口尺寸（含滚动条）          |
| `window.open(url)`                    | 打开新窗口（易被拦截）        |
| `window.alert` / `confirm` / `prompt` | 阻塞式对话框（少用于生产 UI） |

## location 速查

| 属性           | 示例              | 说明                 |
| -------------- | ----------------- | -------------------- |
| `href`         | 完整 URL          | 赋值可跳转页面       |
| `protocol`     | `https:`          | 协议                 |
| `host`         | `example.com:443` | 主机 + 端口          |
| `pathname`     | `/docs/page`      | 路径部分             |
| `search`       | `?q=dom`          | 查询字符串（含 `?`） |
| `hash`         | `#section`        | 锚点（含 `#`）       |
| `assign(url)`  | —                 | 跳转并留下历史记录   |
| `replace(url)` | —                 | 跳转且替换当前历史项 |
| `reload()`     | —                 | 刷新页面             |

## history 与 navigator 简介

| API                   | 说明                            |
| --------------------- | ------------------------------- |
| `history.back()`      | 等价于浏览器「后退」            |
| `history.forward()`   | 「前进」                        |
| `history.go(n)`       | 相对当前位置跳转 n 步           |
| `history.length`      | 历史栈中的条目数                |
| `navigator.userAgent` | UA 字符串（勿用于精确特性检测） |
| `navigator.language`  | 首选语言，如 `zh-CN`            |
| `navigator.onLine`    | 是否在线（布尔值）              |

## 定时器 API

| API                           | 说明                                   |
| ----------------------------- | -------------------------------------- |
| `setTimeout(fn, delayMs)`     | delay 毫秒后执行**一次**；返回 timerId |
| `setInterval(fn, intervalMs)` | 每 interval 毫秒重复执行               |
| `clearTimeout(timerId)`       | 取消尚未执行的 timeout                 |
| `clearInterval(timerId)`      | 停止 interval                          |

`delay` 最小值在嵌套层级深时会被浏览器节流（如 4ms）；页面后台时定时器可能被大幅延迟。

## localStorage / sessionStorage

| 方法                  | 说明                         |
| --------------------- | ---------------------------- |
| `setItem(key, value)` | 写入（value 会被转为字符串） |
| `getItem(key)`        | 读取；不存在返回 `null`      |
| `removeItem(key)`     | 删除单项                     |
| `clear()`             | 清空当前源下全部项           |
| `key(index)`          | 按索引取键名                 |
| `length`              | 键数量                       |

| 对比项   | localStorage               | sessionStorage        |
| -------- | -------------------------- | --------------------- |
| 生命周期 | 除非手动清除，否则永久     | 关闭标签页/窗口后清除 |
| 作用域   | 同源所有标签页共享         | 仅当前标签页          |
| 容量     | 约 5–10 MB（因浏览器而异） | 同上                  |

**只能存字符串**：对象需 `JSON.stringify` 写入、`JSON.parse` 读出。

## 示例

### location 与 history

```javascript
// location：读取当前路径
console.log(window.location.pathname);

// 跳转到新页面（会刷新）
// window.location.href = '/tutorial/JavaScript_My/dom-basics';

// history：SPA 中常配合 pushState，入门先了解后退
document.querySelector("#back-btn")?.addEventListener("click", () => {
  window.history.back();
});
```

### 定时器

```javascript
let count = 0;

// setTimeout：3 秒后执行一次
const timeoutId = window.setTimeout(() => {
  console.log("延迟消息");
}, 3000);

// 如需取消：clearTimeout(timeoutId);

// setInterval：每秒计数
const intervalId = window.setInterval(() => {
  count += 1;
  console.log("tick", count);
  if (count >= 5) {
    window.clearInterval(intervalId); // 到 5 次后停止
  }
}, 1000);
```

### localStorage 存对象

```javascript
const STORAGE_KEY = "user-prefs"; // 键名常量，避免拼写错误

// 写入：对象必须序列化为 JSON 字符串
const prefs = { theme: "dark", fontSize: 16 };
localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));

// 读取：parse 还原对象，注意 getItem 可能为 null
const raw = localStorage.getItem(STORAGE_KEY);
const savedPrefs = raw ? JSON.parse(raw) : { theme: "light", fontSize: 14 };
console.log(savedPrefs.theme);

// 删除与清空
localStorage.removeItem(STORAGE_KEY);
// localStorage.clear(); // 慎用：清空同源全部数据
```

### sessionStorage 临时状态

```javascript
// sessionStorage：仅当前标签页有效，适合表单草稿、向导步骤
sessionStorage.setItem("wizard-step", "2");

const step = sessionStorage.getItem("wizard-step");
console.log("当前步骤", step);
```

### navigator 简单用法

```javascript
// navigator：检测语言与网络（勿依赖 UA 做精确分支）
if (!navigator.onLine) {
  console.warn("当前离线，部分功能不可用");
}
console.log("界面语言", navigator.language);
```

## Cookie 一句话对比

**Cookie** 由服务器通过响应头写入、每次 HTTP 请求自动带回，适合会话标识与服务端鉴权；前端读写需 `document.cookie` 字符串解析，容量约 4KB。**localStorage** 不参与请求、容量更大、API 简洁，适合纯客户端偏好与缓存——敏感令牌仍应优先 HttpOnly Cookie 由服务端管理。

## 易错点

| 问题                    | 说明                                                                      |
| ----------------------- | ------------------------------------------------------------------------- |
| 直接存对象              | `setItem('u', userObj)` 会变成 `"[object Object]"`；必须 `JSON.stringify` |
| `JSON.parse` 未捕获异常 | 存储被篡改或旧版本格式会导致 parse 抛错；建议 try/catch                   |
| 存敏感信息              | Storage 可被同源 JS 读取，勿存密码、token（HttpOnly Cookie 更安全）       |
| `setInterval` 不清理    | 页面卸载或组件销毁时 `clearInterval`，否则内存泄漏                        |
| 混淆 local 与 session   | 多标签共享用 local；仅当前页面临时用 session                              |
| `location.href` 误赋值  | 开发调试时意外跳转；生产环境用路由库管理 SPA 导航                         |

**相关章节**：[DOM 基础](./dom-basics) · [事件监听](./events)

## MDN 参考

- [BOM 介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)
- [Window.location](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)
- [History API](https://developer.mozilla.org/zh-CN/docs/Web/API/History)
- [Navigator](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator)
- [setTimeout](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)
- [Web Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)
- [Window.localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
