/**
* user.js
*/

'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('./auth');

// 패스포트 세팅
require('./passport').setup();

var router = express.Router();

// 로그인 라우팅 POST /login
router.post('/', function(req, res, next) {

  //  패스포트 모듈로 인증 시도
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    // 인증된 유저 정보로 응답
    res.json(req.user);
  })(req, res, next);
});

module.exports = router;

/**
* user.js
*/

/* GET users listing. */
router.get('/', auth.isAuthenticated(), function(req, res) {
    res.send(req.user);
  });

/**
 * passport.js
*/

'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function () {
  passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      function(email, password, done) {
      // 인증 정보 체크 로직
        if (email === 'test@test.com' && password === 'test') {
        // 로그인 성공시 유저 아이디를 넘겨준다.
          var user = {id: 'user_1'};
          return done(null, user);
        } else {
          return done(null, false, { message: 'Fail to login.' });
        }
      }
  ));
};

/**
* auth.js
*/

'use strict';

var jwt = require('jsonwebtoken');
var compose = require('composable-middleware');
var SECRET = 'token_secret';
var EXPIRES = 60; // 1 hour

// JWT 토큰 생성 함수
function signToken(id) {
  return jwt.sign({id: id}, SECRET, { expiresInMinutes: EXPIRES });
}

// 토큰을 해석하여 유저 정보를 얻는 함수
function isAuthenticated() {
  return compose()
      // Validate jwt
      .use(function(req, res, next) {
        var decoded = jwt.verify(req.headers.authorization, SECRET);
        console.log(decoded) // '{id: 'user_id'}'
        req.user = decode;
      })
      // Attach user to request
      .use(function(req, res, next) {
        req.user = {
          id: req.user.id,
          name: 'name of ' + req.user.id
        };
        next();
      });
}


exports.signToken = signToken;
exports.isAuthenticated = isAuthenticated;

/**
 * auth.js
 */

'use strict';

var jwt = require('jsonwebtoken');
var compose = require('composable-middleware');
var SECRET = 'token_secret';
var EXPIRES = 60; // 1 hour

// jwt에서 사용한 시크릿 문자열과 동일한 문자열로 객체 생성
var validateJwt = require('express-jwt')({secret: SECRET});

function isAuthenticated() {
  return compose()
      // Validate jwt
      .use(function(req, res, next) {
        // 만약 access_token 파라메터에 토큰을 설정한 경우 리퀘슽 헤더에 토큰을 설정한다.
        if(req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = 'Bearer ' + req.query.access_token;
        }

        // 토큰 인증 로직
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use(function(req, res, next) {
        req.user = {
          id: req.user.id,
          name: 'name of ' + req.user.id
        };
        next();
      });

}

/**
* login.js
*/

router.post('/', function(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      var error = err || info;
      if (error) return res.json(401, error);
      if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});
  
      // access token 생성
      var token = auth.signToken(user.id);
      res.json({access_token: token});
    })(req, res, next);
  });