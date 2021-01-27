const http = require('http');

const _port = 3000;
const _host = "localhost";
/** 前端所在的源 index.html的静态服务*/
const webOrigin = "http://127.0.0.1:8848";
const app = http.createServer((req, res) => {
    if (req.url === '/cors/simple') {
        // 处理简单请求
        res.setHeader("Content-Type", "text/plain;charset=utf-8");
        res.setHeader("Access-Control-Allow-Origin", webOrigin);
        // Access-Control-Allow-Credentials 允许携带cookie，前台需要设置xhr.withCredentails = true
        res.setHeader("Access-Control-Allow-Credentials", true);
        // Access-Control-Expose-Headers 设置允许被ajax读取的响应头
        // CORS 请求时， XMLHttpRequest 对象的 getResponseHeader() 字段只能拿到6个基本字段：Content-Language、Content-Type、Cache-Control、Expires、Last-Modified、Pragma 。如果想要拿到这6个值之外的值，就必须在 Access-Control-Expose-Headers 指定。
        res.setHeader("Access-Control-Expose-Headers", "X-Bar,X-Foo")
        // res.setHeader("Set-Cookie","a=1;path=/");
        res.setHeader("X-Bar", "123");
        res.end(`CORS简单请求${req.method} ${req.url}`);
    } else if (req.url === "/cors/no-simple") {
        // 非简单请求
        if (req.method === "OPTIONS") {
            // 预检请求 pre-flight
            res.setHeader("Access-Control-Allow-Origin", webOrigin);
            res.setHeader("Access-Control-Allow-Methods", "GET");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type,X-Custom-Header");
            res.end();
        } else {
            // 正式请求
            res.setHeader("Content-Type", "text/plain;charset=utf-8");
            res.setHeader("Access-Control-Allow-Origin", webOrigin);
            res.end(`CORS非简单请求${req.method} ${req.url}`);
        }
    } else {
        // 处理非跨域请求
        res.setHeader("Content-Type", "text/plain;charset=utf-8");
        res.end(`${req.method} ${req.url}`);
    }
});
app.listen(_port, _host, (req, res) => {
    console.log(`server is running ${_host}:${_port}`);
});
