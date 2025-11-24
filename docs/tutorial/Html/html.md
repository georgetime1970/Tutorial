# html 笔记

## 注释

- 注释不可以嵌套

## 文档声明

作用:告诉浏览器当前的网页版本

```html
<!DOCTYPE html>
```

## 语义化标签

用特定的标签去表达特定的含义

| 标签           | 含义（语义）                | 常见用途                           | 是否块级      |
| -------------- | --------------------------- | ---------------------------------- | ------------- |
| `<header>`     | 页头/章节头部               | 网站顶部导航、标题区               | 块级          |
| `<nav>`        | 导航区域                    | 主导航、侧边导航                   | 块级          |
| `<main>`       | 文档主体（唯一）            | 页面主内容（每页只能一个）         | 块级          |
| `<section>`    | 语义区块（主题性内容）      | 文章分块、专题段落                 | 块级          |
| `<article>`    | 独立完整内容                | 博客文章、新闻、独立模块           | 块级          |
| `<aside>`      | 侧栏内容（与主内容关联弱）  | 侧边栏、广告、补充说明             | 块级          |
| `<footer>`     | 页面/章节页脚               | 版权、联系方式、底部导航           | 块级          |
| `<figure>`     | 独立媒体内容                | 图片、图表、代码块等               | 块级          |
| `<figcaption>` | 媒体的说明文字              | 图片说明、表格描述                 | 块级          |
| `<time>`       | 时间标签                    | 显示日期、时间（机器可读）         | 行内          |
| `<mark>`       | 高亮文本                    | 搜索结果高亮、强调文字             | 行内          |
| `<details>`    | 可折叠内容                  | 展开/收起的 FAQ、说明文字          | 块级          |
| `<summary>`    | `<details>`的概述标题       | FAQ 标题、折叠按钮文字             | 块级          |
| `<dialog>`     | 对话框（模态窗口）          | 弹窗、登录窗口                     | 块级          |
| `<address>`    | 联系信息                    | 作者信息、地址、邮箱等             | 块级          |
| `<progress>`   | 进度条                      | 加载进度、任务进度                 | 行内/替换元素 |
| `<meter>`      | 度量值（可度量范围）        | 分数、温度、评分                   | 行内/替换元素 |
| `<ruby>`       | ruby 注释（中文注音或字符） | 在东亚使用，显示的是东亚字符的发音 | 行内          |

## 排版标签

- `h1~h6` 不能互相嵌套，例如： `h1` 标签中最好不要写 `h2` 标签了。
- `p` 标签很特殊！它里面不能有： `h1~h6` 、 `p` 、 `div` 标签

## 常用标签

| 标签名          | 标签含义                                   | 单 / 双 标签 |
| --------------- | ------------------------------------------ | ------------ |
| **br**          | 换行                                       | 单           |
| **hr**          | 分隔                                       | 单           |
| **pre**         | 按原文显示（一般用于在页面中嵌入大段代码） | 双           |
| **sub** **sup** | 下标文字和上标文字                         | 双           |

## 图片标签

```html
<img src="" alt="" width="" height="" />
```

| 属性       | 说明             |
| ---------- | ---------------- |
| **src**    | 图片地址         |
| **alt**    | 图片描述         |
| **width**  | 图片宽度,单位 px |
| **height** | 图片高度,单位 px |

## SVG 标签

| 类别                             | 属性/方法                                | 作用/说明                                      | 示例/取值                                                                   |
| -------------------------------- | ---------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------- |
| **在 CSS 中引入 SVG**            | `background-image`                       | 最常用的背景图方式                             | `background-image: url('icon.svg');`                                        |
|                                  | `mask-image`                             | 用 SVG 做蒙版                                  | `mask-image: url('mask.svg');`                                              |
|                                  | `filter`                                 | 使用 SVG filter（需编码或外部文件）            | `filter: url('filters.svg#blur');` 或 `filter: url(data:image/svg+xml;...)` |
|                                  | `content`（::before/::after）            | 内联 SVG 作为伪元素内容                        | `content: url("data:image/svg+xml,...")`                                    |
| **CSS 直接控制 SVG 元素**        | 当前颜色 `currentColor`                  | SVG 继承 CSS 的 color 值（stroke/fill 默认值） | `fill: currentColor; stroke: currentColor;`                                 |
|                                  | `inherit` / `initial` / `unset`          | 强制继承父级样式                               | `fill: inherit;`                                                            |
|                                  | CSS 自定义属性（--var）                  | 动态修改 SVG 颜色、大小等                      | `--icon-color: red; fill: var(--icon-color);`                               |
| **常用可被 CSS 覆盖的 SVG 属性** | `fill`                                   | 填充颜色                                       | `.icon { fill: #f00; }`                                                     |
|                                  | `stroke`                                 | 描边颜色                                       | `stroke: #000;`                                                             |
|                                  | `stroke-width`                           | 描边宽度                                       | `stroke-width: 4px;`                                                        |
|                                  | `stroke-linecap` / `stroke-linejoin`     | 端点和拐角样式                                 | `stroke-linecap: round;`                                                    |
|                                  | `opacity`                                | 整体透明度                                     | `opacity: 0.8;`                                                             |
|                                  | `transform`                              | 旋转、缩放、位移（推荐用 CSS）                 | `transform: rotate(rotate(45deg) scale(1.2));`                              |
|                                  | `filter`                                 | 模糊、阴影、颜色矩阵等                         | `filter: drop-shadow(2px 2px 4px #000);`                                    |
| **CSS 动画/过渡控制 SVG**        | `transition`                             | 平滑过渡 fill/stroke/transform 等              | `transition: fill .3s, transform .3s;`                                      |
|                                  | `@keyframes` + `animation`               | 复杂动画（如 SVG 路径描边动画）                | `animation: dash 2s linear infinite;`                                       |
| **SVG 路径描边动画技巧**         | `stroke-dasharray`                       | 虚线模式(实线长度+间隔长度)                    | `stroke-dasharray: 10 10`                                                   |
|                                  | `stroke-dashoffset`                      | 调整虚线与间隔的起始位置                       | `stroke-dashoffset: 100`                                                    |
| **响应式 SVG**                   | `width/height: 100%` + `viewBox`         | 让内联 SVG 自适应容器                          | `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">`             |
|                                  | `aspect-ratio`（CSS 新属性）             | 控制外部 SVG 背景图比例                        | `aspect-ratio: 1/1;`                                                        |
| **SVG 滤镜（filter）**           | `filter: url(#id)`                       | 引用 `<filter>` 原始滤镜                       | `filter: url(#gooey);`                                                      |
|                                  | CSS 原生 filter 替代                     | drop-shadow、blur、brightness 等               | `filter: brightness(1.2) contrast(1.5);`                                    |
| **最佳实践**                     | 优先使用内联 SVG                         | 才能被 CSS 完全控制颜色、动画                  | 推荐用于图标系统                                                            |
|                                  | 能用 CSS 实现的尽量不用 SVG filter       | 性能更好                                       | 例如 drop-shadow 代替 `<feDropShadow>`                                      |
|                                  | 外部 SVG 引用时加 #svgView(viewBox(...)) | 强制指定 viewBox，避免闪烁                     | `url('icon.svg#svgView(viewBox(0 0 24 24))')`                               |
|                                  | data URI 编码时注意转义                  | 特别是 # 号要写成 %23                          | `url("data:image/svg+xml,%3Csvg ...%3E%3C/svg%3E")`                         |

### 常用模板

常用 data URI 内联 SVG 模板（支持 CSS 变量）

```html
<img
  src="data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3e%3e%3cpath fill='currentColor' d='...'%3e%3c/svg%3e"
  alt=""
/>
```

或更现代的写法（不编码）：

```html
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='black' d='...'/></svg>" />
```

## 视频标签

| 属性                        | 含义                              | 备注说明                                |
| --------------------------- | --------------------------------- | --------------------------------------- |
| **src**                     | 视频资源路径                      | 指定视频文件地址                        |
| **width**                   | 设置播放区域宽度                  | 如：width="600"                         |
| **height**                  | 设置播放区域高度                  | 通常只设置一项保持比例                  |
| **controls**                | 显示控制条（播放/暂停/音量等 UI） | 无需赋值，写上即可启用                  |
| **autoplay**                | 自动播放                          | 浏览器通常需要 `muted` 配合才会自动播放 |
| **playsinline**             | 在移动端浏览器内联播放（不全屏）  | 移动 Web 必备属性                       |
| **muted**                   | 静音播放                          | 常与 autoplay 配合                      |
| **poster**                  | 视频未播放时显示的封面图          | 图片加载位置建议同源                    |
| **loop**                    | 播放结束后自动重新播放            | 写上即可启用                            |
| **preload**                 | 视频预加载策略                    | 可选值：`none` / `metadata` / `auto`    |
| **disablepictureinpicture** | 禁用画中画模式                    | 防止用户弹出 PIP                        |
| **controlsList**            | 控制条细项（如禁用下载按钮）      | 如：`controlsList="nodownload"`         |
| **crossorigin**             | 跨域控制                          | 可能需要 CORS 配置                      |
| **`<source>`**              | 指定不同格式的视频源              | 浏览器会选择支持的格式                  |
| **`<track>`**               | 字幕、说明文本轨道                | 用于字幕 `.vtt` 文件                    |

| 支持格式            | MIME 类型      | 浏览器支持            |
| ------------------- | -------------- | --------------------- |
| `MP4`（H.264 编码） | `video`/`mp4`  | 最通用、兼容性最好    |
| `WebM`（VP8/VP9）   | `video`/`webm` | Chrome / Firefox 友好 |
| `Ogg`（Theora）     | `video`/`ogg`  | 很少再用              |

```html
<video src="demo.mp4" controls autoplay muted loop playsinline poster="cover.jpg">
  <source src="demo.webm" type="video/webm" />
  <track src="sub.vtt" kind="subtitles" srclang="en" label="English" />
</video>
```

- `<track>` 用来加载 `.vtt`

## 音频标签

| 属性             | 值 / 类型                       | 作用说明                                                                                                   |
| ---------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **src**          | URL                             | 音频文件的地址。最常用的方式。                                                                             |
| **controls**     | 布尔（无值）                    | 显示浏览器自带的播放控件（播放、暂停、进度条）。                                                           |
| **autoplay**     | 布尔（无值）                    | 自动播放音频（多数移动端会被禁止）。                                                                       |
| **loop**         | 布尔（无值）                    | 自动循环播放音频。                                                                                         |
| **muted**        | 布尔（无值）                    | 默认静音（在自动播放时常配合使用）。                                                                       |
| **preload**      | `auto` / `metadata` / `none`    | 控制预加载行为：<br>• `auto`：尽可能加载<br>• `metadata`：只加载音频信息（时长等）<br>• `none`：不提前加载 |
| **controlsList** | `nodownload` 等                 | 隐藏某些控件，例如禁止“下载”按钮（部分浏览器支持）。                                                       |
| **crossorigin**  | `anonymous` / `use-credentials` | 设置跨域模式（加载跨域音频时用）。                                                                         |
| **type**         | MIME 类型                       | 指定音频格式类型，例如 `audio/mpeg`。                                                                      |
| **playsinline**  | 布尔                            | 允许在移动端内联播放（不强制全屏）。                                                                       |

### 常用事件（Event）

| 事件名         | 触发时机说明                         |
| -------------- | ------------------------------------ |
| **play**       | 音频开始播放时触发。                 |
| **pause**      | 音频暂停时触发。                     |
| **ended**      | 音频播放完毕时触发。                 |
| **loadeddata** | 音频数据加载完成可以开始播放时触发。 |
| **timeupdate** | 播放进度更新时触发（非常常用）。     |
| **error**      | 加载出错时触发。                     |

### 常用 JS 控制 API

| 属性 / 方法         | 说明                                         |
| ------------------- | -------------------------------------------- |
| `audio.play()`      | 播放：返回一个 Promise。                     |
| `audio.pause()`     | 暂停播放。                                   |
| `audio.currentTime` | 当前播放时间（秒）。                         |
| `audio.duration`    | 总时长（秒）。可能为 `NaN`（未加载完成时）。 |
| `audio.paused`      | 是否暂停。                                   |
| `audio.volume`      | 音量 0 ～ 1。                                |
| `audio.muted`       | 是否静音。                                   |

## 超链接

```html
<!-- 超链接 -->
<a href="" target="" name="" id=""></a>

<!-- 1. 跳转到文件/网址 打不开的文件会自动下载-->
<a href="./html4Note.md">查看笔记</a>
<a href="https://www.baidu.com">去百度</a>
<!-- 强制触发下载 -->
<a href="./html4Note.md" download="笔记">下载笔记</a>

<!-- 2. 跳转描点 -->
<!-- 2.1. 设置描点 -->
<!-- 第一种方式：a标签配合name属性 -->
<a name="test1"></a>
<!-- 第二种方式：其他标签配合id属性 -->
<h2 id="test2">我是一个位置</h2>
<!-- 2.2. 跳转锚点 -->
<!-- 跳转到test1锚点-->
<a href="#test1">去test1锚点</a>
<!-- 跳到本页面顶部 -->
<a href="#">回到顶部</a>
<!-- 跳转到其他页面锚点 -->
<a href="demo.html#test1">去demo.html页面的test1锚点</a>
<!-- 刷新本页面 -->
<a href="">刷新本页面</a>
<!-- 执行一段js,如果还不知道执行什么，可以留空，javascript:; -->
<a href="javascript:alert(1);">点我弹窗</a>

<!-- 3. 唤起指定应用 -->
<!-- 唤起设备拨号 -->
<a href="tel:10010">电话联系</a>
<!-- 唤起设备发送邮件 -->
<a href="mailto:10010@qq.com">邮件联系</a>
<!-- 唤起设备发送短信 -->
<a href="sms:10086">短信联系</a>
<!-- 跳转到网址/文件 -->
```

| 属性     | 说明                                          |
| -------- | --------------------------------------------- |
| `href`   | 跳转目标地址                                  |
| `target` | 跳转方式,`_self`本窗口打开,`_blank`新窗口打开 |
| `name`   | 元素的名字,可用于设置锚点                     |
| `id`     | 元素唯一标识,可用于设置锚点                   |

## 列表

### 有序列表

```html
<h2>要把大象放冰箱总共分几步</h2>
<ol>
  <li>把冰箱门打开</li>
  <li>把大象放进去</li>
  <li>把冰箱门关上</li>
</ol>
```

### 无序列表

```html
<h2>我想去的几个城市</h2>
<ul>
  <li>成都</li>
  <li>上海</li>
  <li>西安</li>
  <li>武汉</li>
</ul>
```

### 自定义列表

```html
<h2>如何高效的学习？</h2>
<dl>
  <dt>做好笔记</dt>
  <dd>笔记是我们以后复习的一个抓手</dd>
  <dd>笔记可以是电子版，也可以是纸质版</dd>
  <dt>多加练习</dt>
  <dd>只有敲出来的代码，才是自己的</dd>
  <dt>别怕出错</dt>
  <dd>错很正常，改正后并记住，就是经验</dd>
</dl>
```

- 一个 `dl` 就是一个自定义列表，一个 `dt` 就是一个术语名称，一个 `dd` 就是术语描述（可以有多个）

### 列表嵌套

```html
<h2>我想去的几个城市</h2>
<ul>
  <li>成都</li>
  <li>
    <span>上海</span>
    <ul>
      <li>外滩</li>
      <li>杜莎夫人蜡像馆</li>
      <li>
        <a href="https://www.opg.cn/">东方明珠</a>
      </li>
      <li>迪士尼乐园</li>
    </ul>
  </li>
  <li>西安</li>
  <li>武汉</li>
</ul>
```

## 表格

| 标签      | 说明                                     |
| --------- | ---------------------------------------- |
| `table`   | 表格                                     |
| `caption` | 表格标题                                 |
| `thead`   | 表格头部                                 |
| `tbody`   | 表格主体                                 |
| `tfoot`   | 表格注脚                                 |
| `tr`      | 每一行                                   |
| `th`      | 每一个单元格,表格头部中用 `th`           |
| `td`      | 每一个单元格,表格主体、表格脚注中用 `td` |

```html
<table border="1">
  <!-- 表格标题 -->
  <caption>
    学生信息
  </caption>
  <!-- 表格头部 -->
  <thead>
    <tr>
      <th>姓名</th>
      <th>性别</th>
      <th>年龄</th>
      <th>民族</th>
      <th>政治面貌</th>
    </tr>
  </thead>
  <!-- 表格主体 -->
  <tbody>
    <tr>
      <td>张三</td>
      <td>男</td>
      <td>18</td>
      <td>汉族</td>
      <td>团员</td>
    </tr>
    <tr>
      <td>李四</td>
      <td>女</td>
      <td>20</td>
      <td>满族</td>
      <td>群众</td>
    </tr>
    <tr>
      <td>王五</td>
      <td>男</td>
      <td>20</td>
      <td>回族</td>
      <td>党员</td>
    </tr>
    <tr>
      <td>赵六</td>
      <td>女</td>
      <td>21</td>
      <td>壮族</td>
      <td>团员</td>
    </tr>
  </tbody>
  <!-- 表格脚注 -->
  <tfoot>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>共计：4人</td>
    </tr>
  </tfoot>
</table>
```

## form 表单

以下标签都是在`<form></from>`标签中的表现

### 表单属性

| `from`属性   | 说明                                       |
| ------------ | ------------------------------------------ |
| `action`     | 用于指定表单的提交地址                     |
| `method`     | 用于控制表单的提交方式                     |
| `enctype`    | 编码方式，文件上传需 `multipart/form-data` |
| `novalidate` | 禁用 HTML5 校验                            |
| `target`     | 用于控制表单提交后，如何打开页面           |

- `target= "_self"`: 在本窗口打开
- `target= "_blank"`: 在新窗口打开

### `<input>` 输入框

| 类型（type）     | 说明                 | 是否文本类型 | 示例                            |
| ---------------- | -------------------- | ------------ | ------------------------------- |
| `text`           | 普通文本输入         | ✔            | `<input type="text">`           |
| `password`       | 密码输入，隐藏字符   | ✔            | `<input type="password">`       |
| `search`         | 搜索框（带清除按钮） | ✔            | `<input type="search">`         |
| `email`          | 邮箱，带格式校验     | ✔            | `<input type="email">`          |
| `url`            | URL 格式校验         | ✔            | `<input type="url">`            |
| `tel`            | 电话号码（无强校验） | ✔            | `<input type="tel">`            |
| `number`         | 数字输入框           | ❌           | `<input type="number">`         |
| `range`          | 滑块（数值范围）     | ❌           | `<input type="range">`          |
| `checkbox`       | 多选框               | ❌           | `<input type="checkbox">`       |
| `radio`          | 单选框               | ❌           | `<input type="radio">`          |
| `date`           | 日期选择器           | ❌           | `<input type="date">`           |
| `time`           | 时间选择器           | ❌           | `<input type="time">`           |
| `datetime-local` | 本地日期时间         | ❌           | `<input type="datetime-local">` |
| `month`          | 月份选择器           | ❌           | `<input type="month">`          |
| `week`           | 周选择器             | ❌           | `<input type="week">`           |
| `color`          | 颜色选择器           | ❌           | `<input type="color">`          |
| `file`           | 文件上传             | ❌           | `<input type="file">`           |
| `hidden`         | 隐藏字段             | ❌           | `<input type="hidden">`         |
| `submit`         | 提交按钮             | ❌           | `<input type="submit">`         |
| `reset`          | 重置按钮             | ❌           | `<input type="reset">`          |
| `button`         | 普通按钮             | ❌           | `<input type="button">`         |

| 通用属性       | 说明                         | 示例                         |
| -------------- | ---------------------------- | ---------------------------- |
| `id`           | 唯一 ID                      | `<input id="name">`          |
| `name`         | 表单字段名称                 | `<input name="email">`       |
| `value`        | 默认值                       | `<input value="Jiang">`      |
| `disabled`     | 禁用                         | `<input disabled>`           |
| `readonly`     | 只读（多用于 text/password） | `<input readonly>`           |
| `required`     | 必填                         | `<input required>`           |
| `autocomplete` | 自动填充                     | `<input autocomplete="off">` |
| `autofocus`    | 自动聚焦                     | `<input autofocus>`          |

[input 标签更多类型参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)

#### 文本输入相关属性

`text`/`email`/`url`/`search`/`password`/`tel`

| 属性          | 说明                   | 示例                             |
| ------------- | ---------------------- | -------------------------------- |
| `placeholder` | 输入提示文字           | `<input placeholder="请输入">`   |
| `maxlength`   | 最大字符数             | `<input maxlength="20">`         |
| `minlength`   | 最小字符数             | `<input minlength="3">`          |
| `pattern`     | 正则校验               | `<input pattern="\d{11}">`       |
| `list`        | 配合 datalist 使用     | `<input list="cars">`            |
| `dirname`     | 提交输入方向 (LTR/RTL) | `<input dirname="username.dir">` |

#### 数字/日期相关属性

`number`, `range`, `date`, `time`, `datetime-local` 等

| 属性   | 说明   | 示例                               |
| ------ | ------ | ---------------------------------- |
| `min`  | 最小值 | `<input type="number" min="0">`    |
| `max`  | 最大值 | `<input type="number" max="100">`  |
| `step` | 步长   | `<input type="number" step="0.1">` |

#### 文件上传专用属性（file）

| 属性       | 说明             | 示例                                   |
| ---------- | ---------------- | -------------------------------------- |
| `accept`   | 限制上传文件类型 | `<input type="file" accept="image/*">` |
| `multiple` | 多选文件         | `<input type="file" multiple>`         |

#### checkbox / radio 专用属性

| 属性      | 说明     | 示例                                |
| --------- | -------- | ----------------------------------- |
| `checked` | 默认选中 | `<input type="checkbox" checked>`   |
| `value`   | 提交的值 | `<input type="radio" value="male">` |

- 想要单选效果，多个 `radio` 的 `name` 属性值要保持一致
- 多选框也需要 所有 `checkbox` 的 `name` 属性值保持一致
- `name`和`value`相当于 `key` `value` 原理

#### 表单控制属性（HTML5 新增）

这些属性允许 `input` 覆盖表单 `<form>` 的设置：

| 属性             | 说明                      | 示例                                        |
| ---------------- | ------------------------- | ------------------------------------------- |
| `form`           | 指定所属 form（可跨标签） | `<input form="form1">`                      |
| `formaction`     | 覆盖 form 的 action       | `<input type="submit" formaction="/save">`  |
| `formenctype`    | 覆盖编码方式              | `<input formenctype="multipart/form-data">` |
| `formmethod`     | 覆盖 method               | `<input formmethod="post">`                 |
| `formnovalidate` | 忽略验证                  | `<input formnovalidate>`                    |
| `formtarget`     | 覆盖 target               | `<input formtarget="_blank">`               |

#### 按钮

```html
<input type="submit" value="点我提交表单" />
<!-- 等于<button>点我提交表单</button> -->
<input type="reset" value="点我重置" />
<!-- 等于<button type="reset">点我重置</button>  -->
<input type="button" value="普通按钮" />
<!-- 等于<button type="button">普通按钮</button> -->
```

- 表单里的`button`按钮默认是 `type="submit"`

### 文本域

```html
<textarea name="msg" rows="22" cols="3">我是文本域</textarea>
```

| 属性          | 说明                                   |
| ------------- | -------------------------------------- |
| `rows`        | 指定默认显示的行数，会影响文本域的高度 |
| `cols`        | 指定默认显示的列数，会影响文本域的宽度 |
| `name`        | 数据的名称                             |
| `value`       | 输入框的默认输入值                     |
| `placeholder` | 默认提示词                             |
| `maxlength`   | 输入框最大可输入长度                   |
| `disabled`    | 禁用                                   |

- 文本域没有 `type` 属性

### 下拉框

```html
<select name="from">
  <option value="黑">黑龙江</option>
  <option value="辽">辽宁</option>
  <option value="吉">吉林</option>
  <option value="粤" selected>广东</option>
</select>
```

1. `name` 属性：指定数据的名称。
2. `option` 标签设置 `value` 属性， 如果没有 `value` 属性，提交的数据是 `option` 中间的文字；如果设置了 `value` 属性，提交的数据就是 `value` 的值（建议设置 `value` 属性）
3. `option` 标签设置了 `selected` 属性，表示默认选中。

### label 标签

`label` 标签可与表单控件相关联，关联之后点击文字，与之对应的表单控件就会获取焦点。

两种 `input` 与 `label` 关联方式如下

```html
<!-- 1.让 `label` 标签的 `for` 属性的值等于表单控件的 `id` -->
<label for="zhanghu">账户：</label>
<input id="zhanghu" type="text" name="account" maxlength="10" /><br />

<!-- 2.把表单控件套在 `label` 标签的里面 -->
<label> 密码：<input id="mima" type="password" name="pwd" maxlength="6" /> </label>
```

### fieldset 与 legend 的使用（了解）

fieldset 可以为表单控件分组、 legend 标签是分组的标题

```html
<!-- 第一个 fieldset 标签 -->
<form>
  <fieldset>
    <legend>主要信息</legend>
    <label for="zhanghu">账户：</label>
    <input id="zhanghu" type="text" name="account" maxlength="10" /><br />
    <label> 密码：<input id="mima" type="password" name="pwd" maxlength="6" /> </label>
  </fieldset>
  <!-- 第二个 fieldset 标签 -->
  <fieldset>
    <legend>附加信息</legend>
    性别：<input type="radio" name="gender" value="male" id="nan" />
    <label for="nan">男</label>
    <label> <input type="radio" name="gender" value="female" id="nv" />女 </label>
  </fieldset>
</form>
```

## 框架标签

框架:在网页中嵌入其他网站或文件

```html
<!-- 1.引入外部网站 -->
<iframe src="https://www.baidu.com"></iframe>

<!-- 2.引入内部资源 -->
<iframe src="./note.md"></iframe>

<!-- 3.与 a 标签配合 将在框架中显示百度页面-->
<a href="https://www.baidu.com" target="go">去百度</a>
<iframe name="go"></iframe>

<!-- 4.与表单配合 在框架中显示表单提交内容 -->
<form action="https://www.baidu.com/s" target="search">
  <input type="text" name="wd" />
  <button>搜索</button>
</form>
<iframe name="search"></iframe>
```

| 属性         | 说明                                    |
| ------------ | --------------------------------------- |
| `name`       | 框架名字，可以与 target 属性配合        |
| `src`        | 资源或网站                              |
| `width`      | 框架的宽                                |
| `height`     | 框架的高度                              |
| `frameborde` | 是否显示边框，值:0(不显示) 或者 1(显示) |

`iframe` 标签的实际应用：

1. 在网页中嵌入广告。
2. 与超链接或表单的 target 配合，展示不同的内容。

## HTML 实体

字符实体由三部分组成：一个 `&` 和 一个实体名称（一个 `#` 或 一个实体编号），最后加上一个分号 `;`

**常见字符实体:**

| 符号 | 描述              | - 实体名称 | 实体编号  |
| ---- | ----------------- | ---------- | --------- |
| ` `  | 空格              | `&nbsp;`   | `&#160;`  |
| `<`  | 小于号            | `&lt;`     | `&#60;`   |
| `>`  | 大于号            | `&gt;`     | `&#62;`   |
| `&`  | 和号              | `&amp;`    | `&#38;`   |
| `"`  | 引号              | `&quot;`   | `&#34;`   |
| `´`  | 反引号            | `&acute;`  | `&#180;`  |
| `￠` | 分（cent）        | `&cent;`   | `&#162;`  |
| `£`  | 镑（pound）       | `&pound;`  | `&#163;`  |
| `¥`  | 元（yen）         | `&yen;`    | `&#165;`  |
| `€`  | 欧元（euro）      | `&euro;`   | `&#8364;` |
| `©`  | 版权（copyright） | `&copy;`   | `&#169;`  |
| `®`  | 注册商标          | `&reg;`    | `&#174;`  |
| `™`  | 商标              | `&trade;`  | `&#8482;` |
| `×`  | 乘号              | `&times`   | `&#215;`  |
| `÷`  | 除号              | `&divide;` | `&#247;`  |

完整实体列表，请参考：[HTML Standard (whatwg.org)](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references)

## HTML 全局属性

**常用的全局属性:**

| 属性              | 含义说明                                 | 使用场景示例                          |
| ----------------- | ---------------------------------------- | ------------------------------------- |
| `class`           | 设置元素的类名（用于 CSS/JS）            | `<div class="box big"></div>`         |
| `id`              | 页面唯一标识符                           | `<div id="header"></div>`             |
| `data-*`          | 自定义数据属性（前端最常用）             | `<div data-id="123"></div>`           |
| `style`           | 行内样式                                 | `<div style="color: red"></div>`      |
| `title`           | 鼠标悬停时的提示文本                     | `<div title="提示"></div>`            |
| `hidden`          | 隐藏该元素（相当于 display:none）        | `<div hidden></div>`                  |
| `tabindex`        | 控制键盘 Tab 顺序                        | `<button tabindex="1">`               |
| `contenteditable` | 元素内容是否可编辑                       | `<div contenteditable="true"></div>`  |
| `accesskey`       | 设置快捷键，让用户用键盘触发元素         | `<button accesskey="s">Save</button>` |
| `autocapitalize`  | 控制输入时是否自动大写（常用于移动端）   | `<input autocapitalize="off">`        |
| `dir`             | 文本方向（ltr/rtl）                      | `<p dir="rtl"></p>`                   |
| `draggable`       | 元素是否可拖拽                           | `<div draggable="true"></div>`        |
| `enterkeyhint`    | 输入键盘右下角按钮提示文字               | `<input enterkeyhint="search">`       |
| `exportparts`     | Web Components：导出 shadow dom 的 parts | `<x-el exportparts="btn: mybtn">`     |
| `inert`           | 使元素不可互动（禁用所有交互）           | `<div inert></div>`                   |
| `inputmode`       | 控制移动端输入键盘类型                   | `<input inputmode="numeric">`         |
| `is`              | 定义自定义元素扩展                       | `<button is="my-button">`             |
| `lang`            | 设置语言                                 | `<p lang="en">Hello</p>`              |
| `nonce`           | CSP 用来允许特定脚本                     | `<script nonce="xxx">`                |
| `part`            | Web Components：暴露样式部分             | `<div part="title">`                  |
| `popover`         | 弹出层属性（新特性）                     | `<div popover>内容</div>`             |
| `role`            | ARIA 可访问性角色                        | `<div role="button">`                 |
| `slot`            | Web Components 用于分发内容              | `<span slot="title">标题</span>`      |
| `spellcheck`      | 是否进行拼写检查                         | `<input spellcheck="false">`          |
| `translate`       | 是否允许内容被翻译                       | `<div translate="no">BrandName</div>` |

完整的全局属性，请参考：[全局属性 - HTML（超文本标记语言）](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)
