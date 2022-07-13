var express = require('express');
var expressWs = require('express-ws');


var clients = new Set()
var router = express.Router();
expressWs(router);

router.ws('/qrCode', function (ws, req) {
    console.log('req:', req.params.id)
    console.log('connect success')
    // console.log(ws)
    clients.add(ws)
    // 使用 ws 的 send 方法向连接另一端的客户端发送数据
    // ws.send('connect to express server with WebSocket success')

    // 使用 on 方法监听事件
    //   message 事件表示从另一段（服务端）传入的数据
    ws.on('message', function (msg) {
        console.log(`receive message ${msg}`)
        ws.send(JSON.stringify({
            data: `default`
        }))
    })

    // 设置定时发送消息
    let timer = setInterval(() => {
        ws.send(JSON.stringify({
            data: `interval message ${new Date()}`
        }))
    }, 5000)

    // close 事件表示客户端断开连接时执行的回调函数
    ws.on('close', function (e) {
        console.log('close connection')
        clearInterval(timer)
        timer = undefined
    })
    // console.log('clients:::', clients)
})


module.exports =
{
    router,
    clients
}
