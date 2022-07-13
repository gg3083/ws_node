var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var waRouter = require('./routes/wa');
var baiduRouter = require('./routes/baidu');
var wsRouter = require('./routes/ws').router;
var ejs = require('ejs');


var app = express();
var expressWs = require('express-ws')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);

app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function (req, res, next) {
  console.log('auth middleware:', new Date())
  const s = req.header("token");
  console.log('token:', s)
  next()
})


app.use('/ws', wsRouter);
app.use('/wa', waRouter);
app.use('/', indexRouter);
app.use('/baidu', baiduRouter);

module.exports = app;
