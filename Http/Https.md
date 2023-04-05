# Https

http是以明文在网络上传输的，不安全，所以在http基础上加了一层SSL/TLS协议用于对报文进行加密，也就是HTTPS。

## SSL和TLS

SSL(Secure Sockets Layer)安全套接字层是TLS（Transport Layer Security）安全传输层层协议的前身。SSL由网景公司发明，TLS是根据SSL3.0开发的。所以现在大部分使用的都是TLS协议。

## TLS握手过程

- 客户端发送client hello，将TLS协议版本，支持的加密套件和第一个随机数client_random发送给服务端
- 服务端向客户端发送server hello，将证书（公钥，签名），第二个随机数server_random，商议好的加密套件发送给客户端。
- 客户端收到后先验证证书的有效性（域名、有效期、签名等），然后生成预主秘钥pre_master_secret，这个秘钥使用证书中的公钥进行加密，发送给服务端。
- 服务端使用私钥进行解密，获取预主秘钥，然后双方根据第一个随机数和第二个随机数和预主秘钥生成会话秘钥，即用于对称加解密的会话秘钥。后续双方的数据传输全都使用这个会话秘钥进行加密。