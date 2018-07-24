var express = require('express');
var router = express.Router();
var JSON = require('JSON');
var serverValidate = require('../controller/ServerValidate');
var users = require('../public/javascripts/users');
var nullUser = {
  username: "",
  uid: "",
  password: "",
  confirmPassword: "",
  phone: "",
  email: ""
};
var newUser = nullUser;
var error = [];
var accountError = false;
var illegalAccess = false;


/* GET home page. */
router.get('/', function(req, res, next) {
  var user2Login = req.query.username;
  var cookie = req.cookies.user;
  if (cookie != null && /*user2Login &&*/ user2Login != cookie.username) {
    res.redirect('/?username=' + req.cookies.user.username)
    illegalAccess = true;
  } else if (cookie != null && user2Login == cookie.username) {
    res.render('detail', {
      title: 'detail',
      user: users.userList[users.findUser(user2Login)],
      illegalAccess: illegalAccess
    });
    illegalAccess = false;
  } else if (cookie == null || !user2Login) {
    res.render('index', {
      title: 'login',
      error: accountError
    });
    accountError = false;
  }
});

router.get('/regist', function(req, res, next) {
  res.render('regis', {
    title: 'a',
    newUser: newUser,
    existedError: error.join(",")
  });
});

router.post('/login', function(req, res, next) {
  var user2Login = req.body;
  var userIndex = users.findUser(user2Login.username);
  if (userIndex != -1 && users.userList[userIndex].password == user2Login.password) {
    res.clearCookie("user");
    var expireDate = new Date();
    expireDate.setFullYear(2017,9,1);
    res.cookie("user", {
      username: user2Login.username
    }, {
      expires: expireDate
    });
    res.redirect('/?username=' + user2Login.username)
  } else {
    accountError = true;
    res.redirect('/');
  }
});

router.post('/post-regist', function(req, res, next) {
  newUser = req.body;
  error = serverValidate.isUserUnique(newUser);
  if (error.length > 0) {
    res.redirect("/regist");
  } else {
    users.insertUser(newUser);
    users.writeUser();
    var expireDate = new Date();
    expireDate.setFullYear(2017,9,1);
    res.cookie("user", {
      username: newUser.username
    }, {
      expires: expireDate
    });
    res.redirect("/?username=" + newUser.username);
    newUser = nullUser;
  }
});

module.exports = router;