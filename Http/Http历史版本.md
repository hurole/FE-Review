# Http历史版本

HTTP全称超文本传输协议，是应用层协议，HTTP是面向连接的，传输层使用TCP协议；无状态的服务器并不知道前后请求是否来自同一个用户；基于c/s模型，客户端发送请求，服务端返回响应；简单的，http/2以前以明文传输；易扩展的，客户端与服务端通过。

HTTP请求方式：GET POST HEAD OPTION PUT DELETE PATCH TRACE CONNECT

## Http/0.9

单行协议，只有GET请求这一种方式，请求报文：
```http
GET /index.html
```
 响应报文只有响应内容：

```html
<html>我是html</html>
```

## Http/1.0(1996)

- 引入HTTP头的概念，通过Content-Type增加了对不通类型文件的支持。
- 增加响应码
- 

## Http/1.1(1999)

- 新增了24个错误状态响应码。
- 缓存相关首部扩展，http1.0只有Expire、Last-Modified和If-Modified-Since；http1.1增加了Etag、If-None-Match、If-Match、If-Unmodified-Since、Cache-Control
- 长连接，http1.0每次请求要建立TCP连接，收到响应断开连接，浪费资源，http1.1增加长连接功能那个，通过`Connect: Keep-Alive`头保持连接。
- 管道化pipelining 支持并发
- Host首部，增加对虚拟主机的支持，即一个IP上有多个域名时，通过Host判断请求的目标域名。
- Range首部，请求文件时可以指定请求的某一段，断点续传成为可能。
## Http/2
## Http/3