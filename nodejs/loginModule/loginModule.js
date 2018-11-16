var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var express = require('express');
var app = express();

require('../config/passport')(passport);

app.use(passport.initialize());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
// app.use(passport.session()); //로그인 세션 유지

//플래시메세지를 사용한다면
app.use(flash());

module.exports = app;