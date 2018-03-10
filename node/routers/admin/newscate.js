
var express = require('express');

var router = express.Router();

var multiparty = require('multiparty');

var DB = require('../../moudle/db.js');


router.get('/',function(req,res){
    //res.send('新闻列表');
    DB.find('newscate',{},function(data){
        res.render('admin/newscate/index',{
            list:data
        });
    })
})

router.get('/addnewscate',function(req,res){
    //res.send('新闻列表');
     res.render('admin/newscate/addnewscate');
})

router.post('/addnewscate',function(req,res){
    //console.log(req.query);
    var form = new multiparty.Form();
    form.uploadDir='static/upload';
    form.parse(req, function(err, fields, files){
        console.log(fields);
        var name=fields.title[0];
        var description = fields.description[0];
        console.log(name,description);
        //连接数据库，增加数据
        DB.insert('newscate',{
            name,description
        },function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/newscate');
            }
        })
    })
})

router.get('/delete',function(req,res){
    var id=req.query.id;
    console.log(id);
     console.log(req.query.id);
     DB.removeOne('newscate',{"_id":new DB.ObjectId(id)});
     res.redirect('/admin/newscate');
})


module.exports = router;


