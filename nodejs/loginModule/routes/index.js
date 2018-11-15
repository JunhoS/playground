var passport = require('passport');

router.post('/signup', passport.authenticate('signup', {
    successRedirect : '/profile', 
    failureRedirect : '/', //가입 실패시 redirect할 url주소
    failureFlash : true 
}))
router.post('/login', passport.authenticate('login', {
    successRedirect : '/profile', 
    failureRedirect : '/', //로그인 실패시 redirect할 url주소
    failureFlash : true 
}))

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }
}

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('index', { title: 'You are logged in.' });
});