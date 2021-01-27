# CORS 跨域资源共享

CORS（Cross-Origin Resource Sharing）跨域资源共享，是 w3c 标准，为了解决 `ajax` 跨域请求问题。兼容 IE10 及以上版本浏览器。
CORS 分为简单请求和非简单请求，两者在处理方式上存在不同。

## 简单请求

### 什么是简单请求

1. 请求方法：`GET`、`POST` 和 `HEAD`
2. 开发者设置的请求头信息不超过下面几个：

- Accept
- Accept-Language
- Content-Type
- Content-Language
- Last-Event-ID
  其中`Content-Type`的值只能是 `application/x-www-form-urlencode`,`multipart/form-data`,`text/plain`其中之一，对应表单、文件上传和 POST方法发送字符串。

### 发送简单请求

浏览器识别当前请求为跨域简单请求，自动在请求头添加`Origin`字段，用来表示当前请求来自哪个源，服务根据这个值判断是否在允许范围内，服务器返回一个响应，响应头添加`Access-Control-Allow-Origin`字段，表示服务器可以接受来自哪个源的跨域请求，这个字段是必须的。 值可以是表示任意源`Access-Control-Allow-Origin:*`或者具体源例如：`Access-Control-Allow-Origin:http://127.0.0.1:8000`，CORS相关响应头信息如下：

| 响应头信息                       | 含义                                                         | 是否必选 |
| -------------------------------- | ------------------------------------------------------------ | -------- |
| Access-Control-Allow-Origin      | 服务器可以接受来自这些源的请求                               | 是       |
| Access-Control-Allow-Credentials | 允许携带跨域 Cookie                                          | 否       |
| Access-Control-Expose-Headers    | 能被`XMLHttpRequest`对象的 `getResposeHeader`方法获取的头字段 | 否       |

> 默认`getResposeHeader`只能读取`Content-Type`，`Content-Language`，`Cache-Control`，`Expires`，`Last-Modified`、`Pragma`。

## 非简单请求

非简单请求，例如：请求方法为`DELETE`、`PUT`，或者`Content-Type:application/json`。

### 预检（preflight）

在发送 CORS 非简单请求时，浏览器会先发送预检请求，检验服务器是否支持当前源，确认支持时浏览器才发送正式请求。

- 预检请求

预检请求由浏览器自动发送，请求方式为`OPTIONS`,相关头`Access-Control-Request-Methods`，`Access-Control-Request-Headers`，`Origin`。

| 预检请求头                     | 作用                                                         | 是否必选 |
| ------------------------------ | ------------------------------------------------------------ | -------- |
| Access-Control-Request-Methods | 列出浏览器发送 CORS 请求的方法                               | 是       |
| Access-Control-Request-Headers | 浏览器发送 CORS 请求会额外发送的头信息字段（`XMLHttpRequest`对象没有指定额外头信息，浏览器就不会发送该请求头） | 否       |

- 预检响应

| 预检响应头                       | 作用                                                                                                              | 是否必选 |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| Access-Control-Allow-Origin      | 服务器可接受来自这些源的 CORS 请求                                                                                | 是       |
| Access-Control-Allow-Methods     | 服务端支持的所有跨域请求方法                                                                                      | 是       |
| Access-Control-Allow-Headers     | 服务器支持对的所有头信息，不限于预检部分也包括正式请求部分 |如果预检请求存在 Access-Control-Request-Headers 则必选|
| Access-Control-Allow-Credentials | 允许携带 Cookie                                                                                                   | 否       |
| Access-Control-Max-Age           | 预检请求缓存时间                                                                                                  | 否       |
| Access-Control-Expose-Headers    | 允许`XMLHttpRequest`对象读取的响应扩展头信息                                             | 否       |

### 正式请求

预检请求成功后，浏览器发送正常的 CORS 请求，和简单请求一致；响应规则也和简单请求一致。

请求头会自动携带`Origin`头，响应中必须有`Access-Control-Allow-Origin`。
