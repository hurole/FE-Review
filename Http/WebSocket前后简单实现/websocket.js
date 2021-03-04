// let http = require('http');
// let socket   = require('socket.io');

let ws = require('ws');

let server = new ws.Server({
    port:8080
})

server.on("connection",function(client){
    client.send("成功连接，可以发送消息。");
    client.on("message",function(msg){
        client.send(msg);
    })
})