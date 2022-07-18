var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var waRouter = require('./routes/wa');
var baiduRouter = require('./routes/baidu');
var authRouter = require('./routes/auth');
var wsRouter = require('./routes/ws').router;
var ejs = require('ejs');
const JwtUtil = require("./pkg/jwt")


var app = express();
var expressWs = require('express-ws')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);

app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const beginUrl = []
const beginNotTokenUrl = ['/', '/auth/token']
// const beginNotTokenUrl = []
const beginNotAuthUrl = ['/ws/qrCode/.websocket']

app.use(function (req, res, next) {
    console.log('req.url: ', req.url)
    for (let i = 0; i < beginNotTokenUrl.length; i++) {
        if (req.url === beginNotTokenUrl[i]) {
            next()
            return;
        }
    }

    for (let i = 0; i < beginNotAuthUrl.length; i++) {
        if (req.url.startsWith(beginNotAuthUrl[i])) {
            const token = req.query.token
            // console.log( req.query.token, req.method, decodeToken)
            req.query.tokenBody = JwtUtil.decodeToken(token)
            // console.log( req.query.token, req.query.tokenBody )

            next()
            // return;
        }
    }

    const token = req.header("token");

    const verifyToken = JwtUtil.verifyToken(token);
    if (verifyToken && verifyToken.code && verifyToken.message) {
        res.send({
            code: 1, msg: verifyToken.message, data: {}
        });
        return
    }
    req.body.tokenBody = verifyToken
    req.params.tokenBody = verifyToken
    console.log('verifyToken:', verifyToken)
    next()
})


app.use('/ws', wsRouter);
app.use('/wa', waRouter);
app.use('/', indexRouter);
app.use('/baidu', baiduRouter);
app.use('/auth', authRouter);

module.exports = app;
