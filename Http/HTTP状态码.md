# http 常见状态码

http 响应码大概分为 5 类：

> 1xx: 消息提示
>
> 2xx: 成功
>
> 3xx: 重定向
>
> 4xx: 客户端错误
>
> 5xx: 服务器错误

## 100 系列状态码

100 系列状态码不支持 http1.1 以前版本。

- 100 Continue(继续) 表示服务端已经接收到了请求，请客户端继续和发送。
- 101 Switching Protocol(切换协议) 表示服务器已经了解了客户端的请求，并通过 Upgrade 消息头通知客户端使用指定协议来完成后续请求，于此同时服务端也会立刻切换成 Upgrade 消息头中定义的那些协议。

## 200 系列状态码

- 200 OK 表示请求成功，响应头或数据体已经随着该响应返回。
- 201 Created(已创建) 表示已创建，成果请求并创建了新的资源，新资源的 URI 已经随着响应头 Location 返回。
- 202 Accepted(已接受) 表示接收请求，但尚未处理。最终请求可能并不会被处理。这个状态码的目的是为了，处理那些耗时的任务，不必让客户端一直保持连接，直到服务器把任务处理完成。

- 203 Non-Authoritative Information(非权威信息) 例如代理向原始服务器转发请求，
- 204 No Content(没有内容) 服务成功处理请求，没有返回响应体。
- 205 Reset Content(重置内容) 服务器成功处理请求，响应中没有响应体，页面刷新。
- 206 Partial Content(部分内容) 断点续传

## 300 系列状态码

- 300 Multiple Choices(多种选择) 请求的资源有多种选择。
- 301 Moved Permanently(永久转移) 请求的资源永久重定向到新的位置。资源的新位置响应头信息 Location 中返回。
- 302 Moved Temporarily(临时转移) 请求的资源临时重定向到新的位置，资源的 URI 通过响应头信息 Location 中返回。
- 303 See Other
- 304 Not Modified(未发生变化) 请求的资源未发生改变，304 响应禁止包含响应体。客户端缓存有效。
- 305 Use Proxy(使用代理) 请求的资源需要通过代理才能访问。响应头信息 Location 包含代理的 URI 信息。客户端需要重新发送一个请求通过这个代理获取资源。代理服务器不能返回 305 状态码，仅限原始服务器。
- 307 Temporary Redirect(临时重定向) 与 302 类似只能使用 GET 请求重定向。

## 400 系列状态码

- 400 Bad Request(错误请求) 请求的语义有误，或者请求的参数有误，服务器无法理解请求的含义。
- 401 Unauthorized(未认证) 当前请求需要进行用户验证，
- 403 Forbidden(禁止访问)
- 404 Not Found(找不到) 找不到与请求 URL 对应的资源。
- 405 Method Not Allowed(请求方法不允许)
- 406 Not Acceptable(不接受) 指定资源已找到但是资源的 MIME 类型与请求的 Accept 头中指定的不兼容。
- 407 Proxy Authentication Required(需要经过代理服务授权) 与 401 相似，指客户端先要经过代理服务器授权
- 408 Request Timeout(请求超时) 在服务器许可的等待时间内，客户端一直没有发请求。
- 409 Conflict(冲突) 表示请求与服务器端目标资源的当前状态相冲突。一般出现在 PUT 请求中。
- 410 Gone(过时) 请求的目标资源已经不可用了。
- 411 Length Required(Content-Length 是必须的) 请求的头部中缺少 Content-Length 字段。

## 500 系列状态码

- 500 Internal Server Error 服务器端错误
- 501 Not Implemented(未实现) 服务器未实现请求所需的功能
- 502 Bad Gateway(网关错误) 作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。
- 503 Service Unavailable(服务不可用) 服务器暂时无法处理请求，可能是服务器过载或正在维护。
- 504 Gateway Timeout(网关超时) 作为网关或者代理工作的服务器尝试执行请求时，上游服务器响应超时。
