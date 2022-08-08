# Cookie 和 SameSite

## Cookie

Cookie 是存储在浏览器的一小段数据，通常存储限制 4KB，每个 domain 可以设置 20 条（不同浏览器可能不同）。每条 Cookie 是由 name-value 对组成，例如：`user=hurole`；可以设置其他属性，例如：`user=hurole; Expires=Wed, 21 Oct 2015 07:28:00 GMT; HttpOnly`，Expires 和 HttpOnly 及时 cookie 的属性，所有支持的属性及作用如下：

| 属性      | 作用                                                                                                                                                                              | 例子                                                 |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Expires   | 用于指定当前 Cookie 的过期时间，属性值为 Http Date 格式(`Date: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT`)，如果值为 0 或者不设置当前 cookie 为 sessionCookie | `user=hurole; Expires=Wed, 21 Oct 2015 07:28:00 GMT` |
| Max-Age   | 过期时间，属性值为秒数                                                                                                                                                            | `user=hurole; Max-Age=3600`cookie 一小时后过期       |
| Domain    | cookie 可以发送到的域                                                                                                                                                             |                                                      |
| Path      | 指定 cookie 可以被发送的路径                                                                                                                                                      | `user=hurole; Path=/user`                            |
| SameSite  | 指定跨站请求 cookie 的处理方式，值包括 None、Lax、Strict                                                                                                                          | `user=hurole; Path=/user; SameSite=Lax`              |
| Secure    | 开启 Secure 只能通过 https 协议携带 cookie                                                                                                                                        | `name=aa;Secure`                                     |
| httpOnly  | 开启 httpOnly 禁止浏览器操作 cookie，可以防止 XSS 攻击                                                                                                                            | `name=aa;Secure=true;httpOnly`                       |
| SameParty | 开启 SameParty 属性 First-party-set 集合里的成员域可以互发 cookie                                                                                                                 | `name=q11; SameParty`                                |

### Cookie 的设置

1. 可以通过`document.cookie`操作 Cookie。
2. 通过 http 响应设置 Cookie，对应的响应头为`Set-Cookie`。例如下面

```http
Set-Cookie: currCookie=7654321; Max-Age=600; Path=/; Expires=Sun, 12 Jun 2022 14:53:38 GMT; SameSite=None
```

#### 设置规则

##### Domain

- 作用指定 cookie 可以发送到的域名。不设置该字段默认为当前 http 服务器所在域名，例如：向`http://a.com/api`发送请求，cookie 的`Domain=a.com`。也可以设置`Domain=.a.com`，此时向`a.com`的子域发送请求也会携带 cookie，例如：向 api.a.com 域名发送请求也会协带 cookie。

- Domain 字段设置的必须是合法域，例如当前`a.com`，设置`Domain=b.com`会被用户代理（例如浏览器）拒绝，不会被存储。

  假设请求的服务器域名为`a.com`，及`Host: a.com`情况如下

  | Domain           | 结果                                                       |
  | ---------------- | ---------------------------------------------------------- |
  | Domain=b.com     | UA 拒绝存储 cookie                                         |
  | Domain=api.a.com | UA 拒接存储 cookie                                         |
  | Domain=.a.com    | 可以存储，并且 UA 请求子域时（例如：api.a.com）会带 cookie |

  假设请求的服务器域名为`api.a.com`

  | Domain        | 结果               |
  | ------------- | ------------------ |
  | Domain=b.com  | UA 拒绝存储 cookie |
  | Domain=a.com  | 可以存储           |
  | Domain=.a.com | 可以存储           |

##### Path

作用指定 cookie 可以被发送的路径。例如：cookie 的`Domain=a.com;Path=/api`那么访问/api 及其子路径都会携带 cookie；访问/或者`/img`不会携带 cookie，不指定该字段相当于`Path=/`

##### Expires

作用指定 cookie 过期时间格式为 Http-Date， 例如`Expires=Mon, 13 Jun 2022 05:34:48 GMT`,不指定该字段 cookie 为会话 cookie 浏览器关闭就失效。

##### Max-Age

作用指定 cookie 的过期时间格式为单位秒，例如`Max-Age:60`即为 60s 后过期。设置 0 或者-1cookie 会立即失效。同时存在 Expires 和 Max-Age，Max-Age 优先级更高。

##### SameSite

作用指定跨站的 cookie 的处理方式。前端所在

| SameSite        | 含义                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SameSite=None   | 跨站时不对 cookie 做任何限制；此模式下 cookie 必须设置 secure，设置 secure 的前提是使用 https 传输 cookie。                                                                                                                                                        |
| SameSite=Lax    | 浏览的默认行为；以下会跨站时会携带通过链接跳转，例如`<a href="http://a.com"></a>`这种情况会携带 cookie；get 请求的表单，例如`<form action='http://a.com' method="GET">`;预加载，例如`<link rel="prerender" href="http://a.com"/>`，其他跨站的请求都不会携带 cookie |
| SameSite=Strict | 任何跨站的请求都不会携带 cookie                                                                                                                                                                                                                                    |

##### Secure

通过 https 传输才可以携带 cookie

##### HttpOnly

不允许浏览器操作 cookie

##### SameParty

设置 First-Party 集合：在`.a.com`、`.b.com`和`.c.com`三个站的服务器下都加一个配置文件，放在`/.well-know/`目录下，命名为`first-party-set`。

配置文件为 json 格式，包含：ower 和 member 字段，用来标识哪些站其实是相互可信的。

```json
# a.com/.well-know/first-party-set
{
  "owner":"a.com",
  "member":["b,com","c.com"]
}
```

```json
# b.com/.well-know/first-party-set
{
  "owner":"a.com"
}
```

```json
# c.com/.well-know/first-party-set
{
  "owner":"a.com"
}
```

这样三个域名之间的互相访问相当于同站访问会携带 cookie，相当于 SameSite=None
