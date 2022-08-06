## 元素数 metadata 据标签

文档元数据包含文档的信息（例如：样式、脚本）或帮助其他软件（例如搜索引擎）浏览器更好的渲染页面。

### base 标签

base 标签用于指定文档中所有相对 url 的根 url，文档中只能有一个 base 标签

`<base href="https://a.com" target="_blank">` 文档中的所有相对路径前面都会拼接`https://a.com`，通过 tagret 属性指定文档中新页面的默认打开方式。

### title 标签

指定文档标题，显示在标签栏上，标签内只能存放文字。

### link 标签

链接外部文件，常见：样式表，favicon，移动设备的桌面图标，PWA 的 manifest.json 文件

`<link rel="stylesheet" href="/s" />`

### script 标签

链接外部 js 脚本文件

### style 标签

存放文档的内部 css

### meta 标签

存放不能由 base、link、style、script、title 表示的其他元数据。

#### charset 属性

设置文档的字符集，告诉浏览器以何种方式解码

`<meta charset="UTF-8">`

#### http-equiv 属性

设置视窗规则

`<meta http-equiv="viewport" content="width=device-width, initial-scale=1.0">`

内容安全策略

`<meta http-equiv="content-security-policy" content="style-src">`

设置 content-type

`<meta http-equiv='conte-type' content="text/html;charset=utf-8">`

2s 后刷新页面

`<meta http-equiv="refresh" content="2">`

ie 兼容模式

`<meta http-equiv="x-ua-compatible" content="ie=edge">`

#### name 属性

网站描述

`<meta name="description" content="一个牛逼的网站">`

网站关键字（被搜索引擎放弃）

`<meta name="keyword" content="科技,前端">`

网站作者

`<meta name="author" content="hurole">`

#### property 属性

例如将网站分享到新浪微博或者 twitter

```html
<meta property="og:description" content="Mozilla Developer Network" />
```
