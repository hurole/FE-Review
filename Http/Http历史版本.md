# Http 历史版本

HTTP 全称超文本传输协议，是应用层协议，HTTP 是面向连接的，传输层使用 TCP 协议；无状态的服务器并不知道前后请求是否来自同一个用户；基于 c/s 模型，客户端发送请求，服务端返回响应；简单的，http/2 以前以明文传输；易扩展的，客户端与服务端通过。

HTTP 请求方式：GET POST HEAD OPTION PUT DELETE PATCH TRACE CONNECT

## Http/0.9

单行协议，只有 GET 请求这一种方式，请求报文：

```http
GET /index.html
```

响应报文只有响应内容：

```html
<html>
  我是html
</html>
```

## Http/1.0(1996)

- 引入 HTTP 头的概念，通过 Content-Type 增加了对不同类型文件的支持。
- 增加响应码
- 每次请求都需要创建一个连接，请求结束连接断开。

## Http/1.1(1999)

- 新增了 24 个错误状态响应码。
- 缓存相关首部扩展，http1.0 只有 Expire、Last-Modified 和 If-Modified-Since；http1.1 增加了 Etag、If-None-Match、If-Match、If-Unmodified-Since、Cache-Control
- 长连接，http1.0 每次请求要建立 TCP 连接，收到响应断开连接，浪费资源，http1.1 增加长连接功能那个，通过`Connect: Keep-Alive`头保持连接。
- 管道化 pipelining 支持并发
- Host 首部，增加对虚拟主机的支持，即一个 IP 上有多个域名时，通过 Host 判断请求的目标域名。
- Range 首部，请求文件时可以指定请求的某一段，断点续传成为可能。

## Http/2

- 二进制分帧传输

- 头部压缩
- 多路复用
- 服务器推送
- 请求优先级

## Http/3
