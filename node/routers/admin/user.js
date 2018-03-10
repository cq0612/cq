
var express = require('express');

var router = express.Router();

var multiparty = require('multiparty');

var DB = require('../../moudle/db.js');




router.get('/',function(req,res){
    //res.send('用户管理首页');
    DB.find('admin',{},function(data){
        res.render('admin/user/index',{
            list:data
        });
    })
    
})

router.get('/add',function(req,res){
    //res.send('用户增加');
    res.render('admin/user/add');
}) 

//增加用户
router.post('/add',function(req,res){
    //console.log(req.query);
    var form = new multiparty.Form();
    form.uploadDir='static/upload';
    form.parse(req, function(err, fields, files){
        // console.log(files);
        // console.log(fields);
        var name=fields.name[0];
        var age=fields.age[0];
        var sex=fields.sex[0];
        var classname=fields.classname[0];
        var face=files.face[0].path;
        //连接数据库，增加数据
        DB.insert('admin',{
            name,age,sex,classname,face
        },function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/user')
            }
        })
    }) 
})

router.get('/edito',function(req,res){
    //res.send('用户修改');
    var id = req.query.id;
        DB.find('admin',{"_id":new DB.ObjectId(id)},function(docs){
             res.render('admin/user/edito',{
                 list:docs[0]
             }) 
        })
       
    })
//修改提交数据
router.post('/edito',function(req,res){
    var id=req.query.id;
    var form = new multiparty.Form();
    form.uploadDir='static/upload';
    form.parse(req,function(err, fields, files){
        // console.log(files);
        // console.log(fields);
        var id = fields.id[0]; 
        var name = fields.name[0];
        var age = fields.age[0];
        var sex = fields.sex[0];
        var classname = fields.classname[0];
        var face = files.face[0].path;

        //判断是否编辑了图片
         var originalFilename= files.face[0].originalFilename;
        if(originalFilename){
            var json = {
                name,age,sex,classname,face
            };
        }
        else{
            var json = {
               name,age,sex,classname 
            };
        }
        //连接数据库,修改数据
        DB.update('admin',{"_id":new DB.ObjectId(id)},json,function(err){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/admin/user')
            }
        })
    })
})
    

router.get('/delete',function(req,res){
    var id=req.query.id;
     //console.log(req.query.id);
     //res.send('用户删除');
     DB.removeOne('admin',{"_id":new DB.ObjectId(id)});
     res.redirect('/admin/user');
})

module.exports = router;





