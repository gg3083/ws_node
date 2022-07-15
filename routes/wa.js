const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const qrCode = require('qrcode-terminal');

var wsClients = require("../routes/ws").wsClients;

const {Client, LocalAuth} = require('whatsapp-web.js');

var userClient = new Map()

router.post('/create', multipartMiddleware, function (req, res, next) {
    let clientId = `${req.body.clientId}`;

    console.log('body:', req.body)

    var puppeteerArgs = [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-setuid-sandbox",
    ]
    if (process.argv && process.argv.length >= 2 && process.argv[2]) {
        puppeteerArgs.push(process.argv[2])
    }
    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: clientId
        }),
        puppeteer: {
            headless: true,
            args: puppeteerArgs
        }
    });

    client.initialize().then(r => {
        console.log('init', r)
        userClient.set(clientId, client)
    })

    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        wsClients.forEach((item, key) =>{
            if (key === clientId) {
                item.send(JSON.stringify({
                    type: 1001,
                    clientId: qr
                }))
            }
        })
    });

    client.on('authenticated', () => {
        console.log('AUTHENTICATED');
    });

    client.on('ready', () => {
        console.log('READY', clientId);
        wsClients.forEach((item, key) =>{
            if (key === clientId) {
                item.send(JSON.stringify({
                    type: 1002,
                    clientId: clientId,
                    msg: "login success",
                }))
            }
        })
    });


    res.send({
        code: 0, msg: 'ok', data: {
            "clientId": clientId,
            "body": req.body,
        }
    });

});


router.get('/get', function (req, res, next) {

    let userList = []
    userClient.forEach((item, key) => {
        userList.push(key)
    })
    res.send({
        code: 0, msg: 'ok', data: {
            count: userClient.size,
            user: userList,
        }
    });
})


router.get('/register/:token/:phone', function (req, res, next) {
    let token = `${req.params.token}`;
    let phone = `${req.params.phone}`;
    console.log(phone)

    const client = userClient.get(token)

    if (!client) {
        res.send({
            code: 1, msg: '未登录！', data: {}
        });
        return
    }


    client.isRegisteredUser(phone + '@c.us').then((r) => {
        console.log(`${phone} ${r === true ? '已' : '未'}注册`);
        res.send({
            code: 0, msg: 'ok', data: {
                phone: phone,
                isReg: r,
            }
        })
    }).catch(err => {
        res.send( {
            code: 1, msg: err, data: {
                phone: phone,
                isReg: false,
            }
        })
    })
});


module.exports = router;
