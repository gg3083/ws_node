const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// const qrCode = require('qrcode-terminal');
const puppeteer = require('puppeteer')
var clients = require("../routes/ws").clients;

router.post('/create', multipartMiddleware, function (req, res, next) {
    let clientId = `${req.body.clientId}`;

    console.log('body:', req.body)
    // console.log('clients:', clients)
    initClient(clientId).then(r => {
        console.log('init:', r)
    })

    res.send({
        code: 0, msg: 'ok', data: {
            "clientId": clientId,
            "body": req.body,
        }
    });

});

const initClient = async (clientId) => {
    const browser = await puppeteer.launch({
        headless: true,
        // slowMo: 100,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    })
    const page = (await browser.pages())[0]
    await page.goto(`https://www.baidu.com/?clientId=${clientId}`).then(res => {
        console.log('res', res)
        //数据改变后将结果推送至客户端
        for (let c of clients) {
            // console.log('')
            c.send(JSON.stringify({
                type: 1001,
                clientId: clientId
            }))
        }
        // qrCode.generate(JSON.stringify(clientId))
    })
}

module.exports = router;


