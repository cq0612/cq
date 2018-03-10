
var express = require('express');

var router = express.Router();

var user = require('./admin/user.js');

var news = require('./admin/news.js');

var focus = require('./admin/focus.js');

var login = require('./admin/login.js');

var newscate = require('./admin/newscate.js');


router.get('/',function(req,res){
    res.send('用户管理首页');
})

router.use('/user',user);

router.use('/news',news);

router.use('/focus',focus);

router.use('/login',login);

router.use('/newscate',newscate);

module.exports = router;





