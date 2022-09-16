const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const qrCode = require('qrcode-terminal');
const puppeteer = require('puppeteer')
// var clients = require("../routes/ws").wsClients;

router.post('/create', multipartMiddleware, function (req, res, next) {
    // let clientId = `${req.body.clientId}`;

    console.log('body:', req.body)
    // console.log('clients:', clients)
    initClient().then(r => {
        console.log('init:', r)
        res.send({
            code: 0, msg: 'ok', data: {
                "clientId": r,
                "body": req.body,
            }
        });
    })



});

const initClient = async () => {
    var puppeteerArgs = [
        "--no-sandbox",
        "--disable-setuid-sandbox",
    ]
    if (process.argv && process.argv.length >=2 && process.argv[2]){
        puppeteerArgs.push(process.argv[2])
    }
    console.log('puppeteerArgs', puppeteerArgs)
    const browser = await puppeteer.launch({
        // headless: true,
        args: puppeteerArgs
    })

    const page = (await browser.pages())[0]
    await page.goto(`https://go.3083.work/`)
    return await page.$eval('#qrcode', el => el.innerHTML).then(res => {
        console.log('res', res)
        return res
    })

}

module.exports = router;


