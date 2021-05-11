# Http缓存

## 强制缓存

Expires设置文件过期时间

Cache-Control可以设置多个值，max-age指定文件在多少秒后过期，no-cache强制要求缓存服务器在返回缓存的版本之前将请求提交到源头服务器进行验证；no-store不缓存。

Expires和Cache-Control同时存在，cache-control优先级高，Expires是http1.0的头字段，cache-control是http1.1的头字段，为了兼容性，最好两个字段都设置。



Pragma头字段不常用，可能将来被废弃，只有一个值`Pragma:no-cache`等同于`Cache-Control:no-cache`，强制要求缓存服务器在返回缓存的版本之前将请求提交到源头服务器进行验证。

## 协商缓存

Etag和Last-Modified同时存在，Etag优先级高

## HTML设置meta标签控制缓存

```html
<meta http-equiv="expries" content=""/>
<meta http-equiv="cache-control" content=""/>
<meta http-equiv="pragma" conten="no-cache">
```