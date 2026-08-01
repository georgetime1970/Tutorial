# 音视频

## 定义

HTML5 通过原生 `<video>`、`<audio>` 及子元素 `<source>`、`<track>` 在页面嵌入**多媒体**，无需插件。浏览器提供内置控件（`controls`）与 **JavaScript 媒体 API**，可编程控制播放、音量、进度与字幕轨道。

## 核心概念

| 概念 | 说明 |
| ---- | ---- |
| **容器 vs 编解码** | MP4/WebM 是容器；H.264、VP9、AAC 是编码；需多格式 `<source>` 兼容 |
| **媒体元素** | `HTMLMediaElement` 共通接口；`HTMLVideoElement` 额外有 `videoWidth` 等 |
| **默认静音自动播放** | 多数浏览器仅允许 `muted` + `autoplay`；有声 autoplay 常被拦截 |
| **文本轨道** | `<track kind="subtitles">` 提供 WebVTT 字幕/说明 |
| **CORS** | Canvas 截取视频帧需服务器返回正确 CORS 头 |

## `<video>` 属性速查

| 属性 | 说明 | 常用值 |
| ---- | ---- | ------ |
| `src` | 视频 URL（单源时） | `.mp4`, `.webm` |
| `controls` | 显示原生控件 | 布尔属性 |
| `autoplay` | 就绪后自动播放 | 常配合 `muted` |
| `loop` | 循环 | |
| `muted` | 静音 | autoplay 场景常用 |
| `poster` | 加载前占位图 URL | 预览帧 |
| `preload` | 预加载策略 | `none` \| `metadata` \| `auto` |
| `playsinline` | iOS 内联播放非全屏 | 移动端必需 |
| `width` / `height` | 显示尺寸 | 防 CLS |
| `crossorigin` | CORS 模式 | `anonymous` |
| `disablepictureinpicture` | 禁用画中画 | |
| `disableremoteplayback` | 禁用远程播放（如 AirPlay） | |

## `<audio>` 属性速查

| 属性 | 说明 |
| ---- | ---- |
| 与 video 共用 | `src`, `controls`, `autoplay`, `loop`, `muted`, `preload`, `crossorigin` |
| 无 | `poster`, `playsinline`, `width`, `height` |

## `<source>` 属性

| 属性 | 说明 |
| ---- | ---- |
| `src` | 媒体 URL |
| `type` | MIME，如 `video/mp4; codecs="avc1.42E01E, mp4a.40.2"`，帮浏览器跳过不支持的源 |
| `media` | 媒体查询，按条件选源（较少用） |

## `<track>` 属性

| 属性 | 说明 |
| ---- | ---- |
| `src` | WebVTT (`.vtt`) 文件 URL |
| `kind` | `subtitles` \| `captions` \| `descriptions` \| `chapters` \| `metadata` |
| `srclang` | 语言，如 `zh-CN` |
| `label` | 用户可见轨道名 |
| `default` | 默认选中该轨道 |

## 常见媒体事件

| 事件 | 触发时机 | 典型用途 |
| ---- | -------- | -------- |
| `loadstart` | 开始加载 | 显示 loading |
| `loadedmetadata` | 时长、尺寸就绪 | 初始化进度条最大值 |
| `loadeddata` | 首帧可用 | |
| `canplay` | 可开始播放（可能缓冲） | |
| `canplaythrough` | 预计可播放到结束 | 隐藏缓冲提示 |
| `play` | 播放开始/恢复 | 切换 UI 为暂停图标 |
| `pause` | 暂停 | |
| `timeupdate` | 播放位置变化 | 更新进度条（节流） |
| `ended` | 播放结束 | 下一首 / 重播提示 |
| `volumechange` | 音量或 muted 变化 | 同步音量 UI |
| `waiting` | 缓冲不足暂停 | 显示 spinner |
| `error` | 加载/解码失败 | 错误提示；查 `media.error` |

## JavaScript 控制 API（HTMLMediaElement）

| 属性 / 方法 | 类型 | 说明 |
| ----------- | ---- | ---- |
| `play()` | Promise | 播放；可能被 autoplay 策略 reject |
| `pause()` | void | 暂停 |
| `paused` | boolean | 是否暂停 |
| `currentTime` | number（秒） | 读写播放位置 |
| `duration` | number | 总时长；未就绪时为 `NaN` |
| `volume` | 0–1 | 音量 |
| `muted` | boolean | 静音 |
| `playbackRate` | number | 倍速，如 `1.5` |
| `ended` | boolean | 是否已结束 |
| `readyState` | 0–4 | 数据就绪程度 |
| `networkState` | 0–3 | 网络状态 |
| `seekable` | TimeRanges | 可 seek 范围 |
| `textTracks` | TextTrackList | 字幕轨道集合 |
| `captureStream()` | MediaStream | 录制/ WebRTC（进阶） |

## 示例

### 多格式 video + 字幕

```html
<video controls width="640" height="360" poster="/posters/intro.jpg" preload="metadata">
  <!-- type 帮助浏览器跳过不支持的编码 -->
  <source src="/video/intro.webm" type="video/webm">
  <source src="/video/intro.mp4" type="video/mp4">
  <track kind="subtitles" src="/subs/intro.zh.vtt" srclang="zh-CN" label="简体中文" default>
  <track kind="subtitles" src="/subs/intro.en.vtt" srclang="en" label="English">
  <!-- 回退：不支持 video 的浏览器 -->
  <p>您的浏览器不支持 HTML5 视频，可<a href="/video/intro.mp4">下载 MP4</a>。</p>
</video>
```

### 自定义控件（核心 API）

```html
<audio id="player" src="/audio/demo.mp3" preload="metadata"></audio>
<button id="btn-play" type="button">播放</button>
<input id="seek" type="range" min="0" max="100" value="0">
<span id="time">0:00 / 0:00</span>

<script>
  const audio = document.getElementById("player");
  const btnPlay = document.getElementById("btn-play");
  const seek = document.getElementById("seek");
  const timeEl = document.getElementById("time");

  /** 秒数格式化为 m:ss */
  function formatTime(sec) {
    if (!Number.isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  /** 更新进度条与时间文本 */
  function syncUI() {
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    seek.value = String(pct);
    timeEl.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  }

  btnPlay.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play(); // 用户手势触发，避免 autoplay 限制
        btnPlay.textContent = "暂停";
      } else {
        audio.pause();
        btnPlay.textContent = "播放";
      }
    } catch (err) {
      console.error("播放失败:", err);
    }
  });

  audio.addEventListener("loadedmetadata", syncUI);
  audio.addEventListener("timeupdate", syncUI);

  seek.addEventListener("input", () => {
    if (audio.duration) {
      audio.currentTime = (Number(seek.value) / 100) * audio.duration;
    }
  });
</script>
```

### 监听事件与错误

```javascript
const video = document.querySelector("video");

video.addEventListener("waiting", () => {
  // 缓冲中：显示 loading
});

video.addEventListener("error", () => {
  const code = video.error?.code; // 1=ABORTED, 2=NETWORK, 3=DECODE, 4=SRC_NOT_SUPPORTED
  console.error("媒体错误码:", code);
});
```

## 常见陷阱

| 问题 | 建议 |
| ---- | ---- |
| 仅有 MP4 在旧 Firefox 失败 | 提供 WebM 或确认目标浏览器 |
| 有声 `autoplay` 被拦 | 首次播放需用户手势，或 `muted autoplay` |
| iOS 全屏而非内联 | 加 `playsinline`（及必要时 `webkit-playsinline` 旧版） |
| `timeupdate` 过频卡 UI | 用 `requestAnimationFrame` 节流或仅更新关键节点 |
| 未设 `poster` / 尺寸 | 加载前空白或 CLS；设 poster 与 width/height |
| `play()` 不 await | Promise reject 未捕获会在控制台报错 |
| 字幕不显示 | 检查 `.vtt` MIME（`text/vtt`）、路径、CORS |

## 延伸阅读（MDN）

- [`<video>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)
- [`<audio>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)
- [`<source>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source)
- [`<track>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/track)
- [HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement)
- [WebVTT 指南](https://developer.mozilla.org/zh-CN/docs/Web/API/WebVTT_API)
