# Cookie和SameSite

## Cookie

Cookie是存储在浏览器的一小段数据，通常存储限制4KB，每个domain可以设置20条（不同浏览器可能不同）。每条Cookie是由name-value对组成，例如：`user=hurole`；可以设置其他属性，例如：`user=hurole; Expires=Wed, 21 Oct 2015 07:28:00 GMT; HttpOnly`，Expires和HttpOnly及时cookie的属性，所有支持的属性及作用如下：

| 属性    | 作用                                                         | 例子                                                 |
| ------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| Expires | 用于指定当前Cookie的过期时间，属性值为Http Date格式(`Date: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT`) | `user=hurole; Expires=Wed, 21 Oct 2015 07:28:00 GMT` |
| Max-Age | 过期时间，属性值为秒数                                       | `user=hurole; Max-Age=3600`cookie一小时后过期        |
| Domain  | cookie作用的域，不指定默认为当前域，对子域无效；指定该属性，那么子域也会生效。 |                                                      |
| Path    | 指定cookie的路径，默认为`/`                                  | `user=hurole; Path=/user`                            |



### Cookie的设置

1. 可以通过`document.cookie`操作Cookie。
2. 通过http响应设置Cookie，对应的响应头为`Set-Cookie`。
