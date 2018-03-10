
var express = require('express');

var router = express.Router();

var multiparty=require('multiparty');

var DB = require('../../moudle/db.js');

router.get('/',function(req,res){
    //res.send('轮播图管理首页');
    DB.find('picture',{},function(data){
        res.render('admin/focus/index',{
            list:data
        });
    })
})

router.get('/add',function(req,res){
    res.render('admin/focus/add');
})

router.post('/add',function(req,res){
    var form = new multiparty.Form();
    form.uploadDir='static/upload';
    form.parse(req, function(err, fields, files){
        // console.log(files);
        // console.log(fields);
        var name=fields.title[0];
        var type=fields.type[0];
        var face=files.face[0].path;
        DB.insert('picture',{
            name,type,face
        },function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/focus')
            }
        })
    })
})

router.get('/editopic',function(req,res){
    var id = req.query.id;
     DB.find('picture',{"_id":new DB.ObjectId(id)},function(docs){
             res.render('admin/focus/editopic',{
                 list:docs[0]
             }) 
        })
})

router.post('/editopic',function(req,res){
    console.log(req.query);
    var form = new multiparty.Form();
    form.uploadDir='static/upload';
    form.parse(req, function(err, fields, files){
        var id = fields.id[0]; 
        var name=fields.title[0];
        var type=fields.type[0];
        var face=files.face[0].path;
        //判断是否编辑了图片
        
        var originalFilename= files.face[0].originalFilename;
        if(originalFilename){
            var json = {
                name,type,face
            };
        }
        else{
            var json = {
                name,type
            };
        }
        //连接数据库
        DB.update('picture',{"_id":new DB.ObjectId(id)},json,function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/focus');
            }
        })

    })
})


router.get('/delete',function(req,res){
    var id=req.query.id;
     DB.removeOne('picture',{"_id":new DB.ObjectId(id)});
     res.redirect('/admin/focus');
})
module.exports = router;





