# Http 缓存

## 强制缓存

### Expires 响应头部

设置资源过期时间，是一个绝对时间，格式为 Http Date，缺点是当服务端和客户端时间不一致时会有问题。

如果在 Cache-Control 响应头设置了 "max-age" 或者 "s-max-age" 指令，那么 `Expires` 头会被忽略。

### Cache-Control 通用头部

Cache-Control 可以设置多个指令

max-age 指定资源缓存在多少秒后过期，是一个绝对时间，解决了服务器和客户端时间不一致的问题;

no-cache （协商缓存）使用缓存之前，发送缓存验证请求到服务器进行验证；

no-store 不缓存;

Expires 和 Cache-Control 同时存在，Cache-Control 优先级高，Expires 是 http1.0 的头字段，cache-control 是 http1.1 的头字段，为了兼容性，最好两个字段都设置。

Pragma 头字段不常用，已经被废弃，只有一个值`Pragma:no-cache`等同于`Cache-Control:no-cache`。

## 协商缓存

Etag 和 Last-Modified 同时存在，Etag 优先级高

### Last-Modified 相应头部和 If-Modified-Since 请求头部

浏览器第一次请求资源时，响应中返回头字段 Last-Modified，他的值是该资源的修改日期及时间，例如为'Wed, 21 Oct 2015 07:28:00 GMT'，浏览器再次请求时会在请求头中将'Wed, 21 Oct 2015 07:28:00 GMT'放在 If-Modified-Since 字段中发送给服务器，此时服务器对比资源当前的修改时间和客户端发来的资源修改时间，相同则会返回 304，缓存可用；不同直接将服务器的资源返回，更新 Last-Modified 字段。

缺点：由于文件变更时间只能精确到秒，所以一秒内发生了文件变化，取得是缓存。由此引出下面的协商缓存机制。

### Etag 响应头部和 If-None-Match 请求头部

假设：浏览器第一次请求资源时，响应中返回头字段 Etag，他的值是该资源的版本标识，浏览器二次请求是会将该值放在请求头的 If-None-Match 字段中发送给服务器，此时服务器资源的版本标识进行比较，相同则会返回 304，缓存可用；不同直接将服务器的资源返回，更新 Etag 字段。

## HTML 设置 meta 标签控制缓存

```html
<meta http-equiv="expries" content="" />
<meta http-equiv="cache-control" content="" />
<meta http-equiv="pragma" conten="no-cache" />
```
