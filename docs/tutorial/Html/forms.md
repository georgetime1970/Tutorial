# 表单

## 定义

HTML **表单**（`<form>`）收集用户输入并提交到服务器，或通过 JavaScript 拦截处理。表单控件包括 `<input>`、`<textarea>`、`<select>`、`<button>` 等；**约束验证**（Constraint Validation）可在提交前检查必填、格式与范围。

## 核心概念

| 概念 | 说明 |
| ---- | ---- |
| **控件 name** | 提交时的字段名；无 `name` 不提交 |
| **label 关联** | `<label for="id">` 或包裹控件，扩大点击区，读屏朗读 |
| **表单控件族** | 同一 `name` 的 radio 互斥；checkbox 可多选 |
| **验证** | HTML 属性触发内置验证；`:valid` / `:invalid` 可样式化 |
| **提交方式** | `method` + `enctype` 决定 GET/POST 与编码格式 |

## `<form>` 属性速查

| 属性 | 说明 | 常用值 |
| ---- | ---- | ------ |
| `action` | 提交 URL | `/api/login`；省略则提交当前页 |
| `method` | HTTP 方法 | `get`（查询）\| `post`（改数据）\| `dialog`（关闭 dialog） |
| `enctype` | POST 编码 | `application/x-www-form-urlencoded`（默认）\| `multipart/form-data`（文件）\| `text/plain` |
| `target` | 响应展示上下文 | `_self`, `_blank`, iframe `name` |
| `novalidate` | 禁用 HTML5 提交前验证 | 自定义 JS 验证时用 |
| `autocomplete` | 表单级自动填充 | `on` \| `off` |

## `<input type="...">` 速查

| type | 用途 | 备注 |
| ---- | ---- | ---- |
| `text` | 单行文本 | 默认 type |
| `password` | 密码（掩码） | |
| `email` | 邮箱 | 含 `@` 的简单校验 |
| `url` | URL | 需协议 |
| `tel` | 电话 | 移动端或弹出数字键盘；格式不强制 |
| `search` | 搜索框 | 部分浏览器有清除按钮 |
| `number` | 数字 | 支持 `min`/`max`/`step`；本地化小数点 |
| `range` | 滑块 | 配合 `<output>` 显示值 |
| `date` | 日期 | `YYYY-MM-DD` |
| `time` | 时间 | `HH:mm` |
| `datetime-local` | 本地日期时间 | 无时区 |
| `month` | 年月 | |
| `week` | 年周 | |
| `color` | 颜色选择器 | `#rrggbb` |
| `checkbox` | 多选 | 同名多值需 `name="hobby"` 多个或 `name="hobby[]"`（后端约定） |
| `radio` | 单选 | 同组相同 `name` |
| `file` | 文件 | 需 `enctype="multipart/form-data"`；`multiple` 多文件 |
| `hidden` | 隐藏字段 | CSRF token 等 |
| `submit` | 提交按钮 | 可设 `formaction` / `formmethod` 覆盖表单 |
| `reset` | 重置为初始值 | 少用 |
| `button` | 普通按钮 | 默认 `type="button"` 防误提交 |

## 其他表单元素

| 元素 | 关键属性 | 说明 |
| ---- | -------- | ---- |
| `<textarea>` | `rows`, `cols`, `maxlength`, `placeholder` | 多行文本；内容写在标签内 |
| `<select>` | `multiple`, `size`, `required` | 下拉或多选列表 |
| `<option>` | `value`, `selected`, `disabled`, `label` | 选项 |
| `<optgroup>` | `label`, `disabled` | 选项分组 |
| `<label>` | `for`（对应控件 `id`） | 关联控件 |
| `<fieldset>` | `disabled` | 分组；整组禁用 |
| `<legend>` | — | fieldset 标题 |
| `<button>` | `type`: `submit` \| `reset` \| `button` | 默认 type 为 **submit**（易踩坑） |
| `<datalist>` | — | 与 `input list="id"` 提供建议值 |
| `<output>` | `for`, `name` | 计算结果展示 |

## 验证属性速查

| 属性 | 适用 | 说明 |
| ---- | ---- | ---- |
| `required` | 多数控件 | 必填 |
| `pattern` | text, tel, email, url, password, search | 正则；完整匹配 `^...$` |
| `min` / `max` | number, date, time, range | 最小/最大 |
| `step` | number, date, time, range | 步进；number 默认 1 |
| `minlength` / `maxlength` | text 类, textarea | 字符长度 |
| `multiple` | email, file | 多值/多文件 |
| `readonly` | 多数 | 只读仍提交；与 `disabled` 不同 |
| `disabled` | 多数 | 禁用不提交、不可聚焦 |

### 验证相关 DOM API（简要）

| API | 说明 |
| --- | ---- |
| `checkValidity()` | 是否通过 |
| `reportValidity()` | 显示浏览器提示并返回结果 |
| `setCustomValidity(msg)` | 自定义错误；空字符串清除 |
| `:valid` / `:invalid` | CSS 伪类 |

## 示例

### 注册表单（结构 + 验证）

```html
<form action="/register" method="post" novalidate>
  <fieldset>
    <legend>账户信息</legend>

    <label for="username">用户名</label>
    <input
      id="username"
      name="username"
      type="text"
      required
      minlength="3"
      maxlength="20"
      pattern="[A-Za-z0-9_]+"
      autocomplete="username"
    />

    <label for="email">邮箱</label>
    <input id="email" name="email" type="email" required autocomplete="email">

    <label for="age">年龄</label>
    <input id="age" name="age" type="number" min="18" max="120" step="1">

    <label for="site">个人站点</label>
    <input id="site" name="site" type="url" placeholder="https://">
  </fieldset>

  <fieldset>
    <legend>偏好</legend>
    <label><input type="checkbox" name="notify" value="email"> 邮件通知</label>
    <label><input type="radio" name="plan" value="free" required> 免费版</label>
    <label><input type="radio" name="plan" value="pro"> 专业版</label>
  </fieldset>

  <button type="submit">注册</button>
</form>
```

### 文件上传

```html
<!-- 文件上传必须 multipart/form-data -->
<form action="/upload" method="post" enctype="multipart/form-data">
  <label for="avatar">头像</label>
  <input id="avatar" name="avatar" type="file" accept="image/png,image/jpeg" required>

  <label for="docs">附件（可多选）</label>
  <input id="docs" name="docs" type="file" multiple accept=".pdf,.docx">

  <button type="submit">上传</button>
</form>
```

### select + datalist

```html
<label for="city">城市</label>
<select id="city" name="city" required>
  <option value="">请选择</option>
  <optgroup label="华东">
    <option value="shanghai">上海</option>
    <option value="hangzhou">杭州</option>
  </optgroup>
  <optgroup label="华北">
    <option value="beijing">北京</option>
  </optgroup>
</select>

<label for="skill">技能（可输入或选择）</label>
<input id="skill" name="skill" list="skills" />
<datalist id="skills">
  <option value="HTML"></option>
  <option value="CSS"></option>
  <option value="JavaScript"></option>
</datalist>
```

## 常见陷阱

| 问题 | 建议 |
| ---- | ---- |
| `<button>` 默认 submit | 非提交按钮写 `type="button"` |
| 文件上传未改 `enctype` | POST 文件用 `multipart/form-data` |
| `pattern` 不生效 | 需 `type` 为 text 类；正则会隐式锚定 |
| 仅用 placeholder 当 label | 应用 `<label>`；placeholder 不是标签 |
| `disabled` 字段期望提交 | 改用 `readonly` 或隐藏域 |
| radio 不同 `name` | 同组必须相同 `name` |
| 依赖 `type=email` 防垃圾 | 仅格式提示；服务端必须再验证 |
| GET 表单敏感数据 | 密码等勿用 GET（URL 可见、进日志） |

## 延伸阅读（MDN）

- [`<form>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)
- [`<input>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)
- [input type 列表](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#input_types)
- [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea)
- [`<select>` / `<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select)
- [表单约束验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)
