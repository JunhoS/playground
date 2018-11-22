var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var express = require('express');
var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); //로그인 세션 유지

require('../config/passport')(passport);

//플래시메세지를 사용한다면
//app.use(flash());

//module.exports = app;