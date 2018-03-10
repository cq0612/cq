
var express = require('express');

var router = express.Router();

var DB = require('../moudle/db.js');

var async = require('async');

router.get('/',function(req,res){
    //res.render('index/index');
    //  var id = req.query.id;
    // DB.find('picture',{},function(data){
    //     res.render('index/index',{
    //         list:data
    //     })
    // })
    async.parallel({
        list:function(callback){
             DB.find('picture',{},function(data){
                callback(null,data)
            })
        },
        newscate:function(callback){
             DB.find('newscate',{},function(data){
                callback(null,data)
            })
        }
   
    },function(err,data){
        console.log(data);
         res.render('index/index',{
            list:data.list,
            newscate:data.newscate
        })
    })
   
})

router.get('/news',function(req,res){
    //res.render('index/news');
    DB.find('news',{},function(data){
        res.render('index/news',{
            list:data
        })
    })
})


router.get('/newscontent',function(req,res){
    var id = req.query.id;
    DB.find('news',{"_id":new DB.ObjectId(id)},function(data){
        res.render('index/newscontent',{
            list:data[0]
        })
    })
})

router.get('/about',function(req,res){
    res.render('index/about');
})

router.get('/service',function(req,res){
    res.render('index/service');
})

router.get('/successful_case',function(req,res){
    res.render('index/successful_case');
})

module.exports = router;





