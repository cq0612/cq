
var express = require('express');

var router = express.Router();

var multiparty=require('multiparty');

var session = require('express-session');

router.use(session({
    secret: 'this is session',  // sign the session ID cookie. 加密方式
    resave: false,  //无论有没有修改session 都保存
    saveUninitialized: true,  //当未初始化的时候也保存session
    cookie:{ 
        //session的过期时间
        maxAge: 900000
    }
}))


router.get('/',function(req,res){
    res.render('admin/login');
})



//设置登录权限
router.use(function(req,res,next){
    //判断是否登录
    if(req.session.userinfo){
        next();
    }else{
        if(req.url=='/admin/login' || req.url=='/login'){
            next();
        }else{
            res.redirect('/admin/login');  //如果没有登录跳转到/login
        }
    }
})

router.get('/login',function(req,res){
    console.log(req.query);
})

module.exports = router;





