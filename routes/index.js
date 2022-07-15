const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


router.get('/', function (req, res, next) {
    console.log('process.argv', process.argv, "--", process.argv[2], "--", process.argv[3])

    if (!process.argv[3]){
        res.send({
            code: 1, msg: '初始化websocket失败！',
        });
    }
    res.render('index', {
        title: 'NodeJs',
        qr: '',
        wsUrl: process.argv[3],
        token: new Date().getTime(),
    })
})

router.get('/get/:id', function (req, res, next) {
    let id = `${req.params.id}`;
    res.send({
        code: 0, msg: 'ok', data: {
            "id": id,
            "body": req.params,
        }
    });
});

router.get('/get', function (req, res, next) {
    let id = `${req.query.id}`;
    res.send({
        code: 0, msg: 'ok', data: {
            "id": id,
            "body": req.query,
        }
    });
});


router.post('/postForXWWW', function (req, res, next) {
    let phone = `${req.body.phone}`;
    let message = `${req.body.message}`;

    console.log('phone:', phone)
    console.log('message:', message)
    console.log('body:', req.body)

    res.send({
        code: 0, msg: 'ok', data: {
            "message": message,
            "body": req.body,
        }
    });

});

router.post('/postForForm', function (req, res, next) {
    let body = `${req.formData()}`;
    let phone = body.phone
    let message = body.message

    console.log('phone:', phone)
    console.log('message:', message)
    console.log('body:', req.body)

    res.send({
        code: 0, msg: 'ok', data: {
            "message": message,
            "body": body,
        }
    });

});

router.post('/postForJson', multipartMiddleware, function (req, res, next) {
    let phone = `${req.body.phone}`;
    let message = `${req.body.message}`;

    console.log('phone:', phone)
    console.log('message:', message)
    console.log('body:', req.body)

    res.send({
        code: 0, msg: 'ok', data: {
            "phone": phone,
            "body": req.body,
        }
    });

});
module.exports = router;
