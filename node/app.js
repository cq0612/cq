
var express = require('express');

var app = express(); 

var bodyParser = require('body-parser');

app.set('view engine','ejs');

//配置中间件

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//静态web服务

app.use(express.static('static'));

app.use('/static',express.static('static'));

var admin = require('./routers/admin.js');

var api = require('./routers/api.js');

var index = require('./routers/index.js');

app.get('/',function(req,res){
    res.send('模块化');
})


//匹配到admin路由，让admin处理
app.use('/index',index);

app.use('/admin',admin);

app.use('/api',api);

app.listen(3002);




