const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// const qrCode = require('qrcode-terminal');
const puppeteer = require('puppeteer')
var clients = require("../routes/ws").wsClients;

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
    var puppeteerArgs = [
        "--no-sandbox",
        "--disable-setuid-sandbox",
    ]
    if (process.argv && process.argv.length >=2 && process.argv[2]){
        puppeteerArgs.push(process.argv[2])
    }
    const browser = await puppeteer.launch({
        headless: true,
        args: puppeteerArgs
    })

    const page = (await browser.pages())[0]
    await page.goto(`https://www.google.com.hk/?clientId=${clientId}`).then(res => {
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


