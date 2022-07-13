const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const qrCode = require('qrcode-terminal');

const initClient = require('../pkg/whatsapp_client')

router.post('/create', multipartMiddleware, function (req, res, next) {
    let clientId = `${req.body.clientId}`;

    console.log('body:', req.body)

    let client = initClient(clientId);
    client.initialize().then(r => {
        console.log('init', r)
    })

    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrCode.generate(qr, {});
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
