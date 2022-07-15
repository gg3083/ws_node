const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const qrCode = require('qrcode-terminal');

const initClient = require('../pkg/whatsapp_client')
var clients = require("../routes/ws").clients;

const {Client, LocalAuth} = require('whatsapp-web.js');


router.post('/create', multipartMiddleware, async function (req, res, next) {
    let clientId = `${req.body.clientId}`;

    console.log('body:', req.body)

    const client = new Client({
        authStrategy: new LocalAuth({
        }),
        puppeteer: {
            headless: true,
            args: [
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                '--proxy-server=http://192.168.0.2:1080',
            ]
        }
    });
    client.initialize()
    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        for (let c of clients) {
            // console.log('')
            c.send(JSON.stringify({
                type: 1001,
                clientId: qr
            }))
        }
    });

    client.on('authenticated', () => {
        console.log('AUTHENTICATED');
    });

    client.on('ready', () => {
        console.log('READY');
    });


    res.send({
        code: 0, msg: 'ok', data: {
            "clientId": clientId,
            "body": req.body,
        }
    });

});
module.exports = router;
