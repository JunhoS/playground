var passport = require('passport');
var express = require('express');
var router = express.Router();
const path = require('path');

router.post('/signup', passport.authenticate('signup', {
    successRedirect : '/profile', 
    failureRedirect : '/', //가입 실패시 redirect할 url주소
    failureFlash : false 
}))
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
router.post('/login', passport.authenticate('login', {
    successRedirect : '/profile', 
    failureRedirect : '/', //로그인 실패시 redirect할 url주소
    failureFlash : false 
}))

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }
}

router.get('/profile', isLoggedIn, function(req, res, next) {
    console.log('profile>>');
    res.render('index', { title: 'You are logged in.' });
});

module.exports = router;