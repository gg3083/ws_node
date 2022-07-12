var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var wsRouter = require('./routes/ws');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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
app.use('/', indexRouter);

module.exports = app;
