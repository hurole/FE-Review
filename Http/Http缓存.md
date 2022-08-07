# Http缓存

## 强制缓存

Expires设置资源过期时间，设置0即资源已经过期。当Cache-Control: max-age或s-max-age该字段失效。缺点是当服务端和客户端时间不一致时会有问题。

Cache-Control可以设置多个值，max-age指定资源缓存在多少秒后过期，no-cache强制要求缓存服务器在返回缓存的版本之前将请求提交到源头服务器进行验证；no-store不缓存。

Expires和Cache-Control同时存在，cache-control优先级高，Expires是http1.0的头字段，cache-control是http1.1的头字段，为了兼容性，最好两个字段都设置。

Pragma头字段不常用，可能将来被废弃，只有一个值`Pragma:no-cache`等同于`Cache-Control:no-cache`，强制要求缓存服务器在返回缓存的版本之前将请求提交到源头服务器进行验证。

## 协商缓存

Etag和Last-Modified同时存在，Etag优先级高

- Last-Modified和If-Modified-Since

假设：浏览器第一次请求资源时，响应中返回头字段Last-Modified，他的值是该资源的修改日期及时间，例如为'Wed, 21 Oct 2015 07:28:00 GMT'，浏览器再次请求时会在请求头中将'Wed, 21 Oct 2015 07:28:00 GMT'放在If-Modified-Since字段中发送给服务器，此时服务器对比资源当前的修改时间和客户端发来的资源修改时间，相同则会返回304，缓存可用；不同直接将服务器的资源返回，更新Last-Modified字段。

缺点：由于文件变更时间只能精确到秒，所以一秒内发生了文件变化，取得是缓存。由此引出下面的协商缓存机制。

- Etag和If-None-Match

假设：浏览器第一次请求资源时，响应中返回头字段Etag，他的值是该资源的版本标识，浏览器二次请求是会将该值放在请求头的If-None-Match字段中发送给服务器，此时服务器资源的版本标识进行比较，相同则会返回304，缓存可用；不同直接将服务器的资源返回，更新Etag字段。

## HTML设置meta标签控制缓存

```html
<meta http-equiv="expries" content=""/>
<meta http-equiv="cache-control" content=""/>
<meta http-equiv="pragma" conten="no-cache">
```