
var express = require('express');

var router = express.Router();

var async=require('async');

var multiparty=require('multiparty');

var DB = require('../../moudle/dbx.js');
var ObjectId = require('mongodb').ObjectId;

router.get('/',function(req,res){
    //res.send('新闻管理首页');
    var page = req.query.page || 1;
    var pageSize = 3;

    // db.collection('news').find({}).skip((page-1)*pageSize).limit(pageSize)
    // db.collection('news').count();   //返回的是promise
    // DB.find('news',{},function(countNum){
    //     DB.find('news',{},{},{
    //         page:page,
    //         pageSize:pageSize
    //     },function(data){
    //         res.render('admin/news/index',{
    //             list:data,
    //             page:page,
    //             totalPages:Math.ceil(countNum/pageSize)
    //         });
    //     })
    // })
    async.parallel({
        count:function(callback){
             DB.countAll('project','news',{},function(data){
               callback(null,data)
            })
        },
        pageSum:function(callback){
             DB.find('project','news',{},page,pageSize,function(data){
               callback(null,data)
            })
        }
    },function(err,data){
        console.log(data)
         res.render('admin/news',{
            count:data.count,
            list:data.pageSum,
            pageSize:pageSize,
            page:page

        });
    })


})

router.get('/addnews',function(req,res){
    //res.send('新闻添加');
    DB.find('project','newscate',{},function(data){

        res.render('admin/news/addnews',{
            catelist:data
        });
    })
    
})

//添加数据
router.post('/addnews',function(req,res){

    console.log(req.body);

    DB.insertOne('project','news',req.body,function(err){

        if(!err){

            res.redirect('/admin/news')
        }
    })
})


router.get('/editonews',function(req,res){
    //get传值
    var id=req.query.id;
    async.parallel({
        catelist:function(callback){
            //查询数据库
            DB.find('project','newscate',{},function(catelist){
                callback(null,catelist);
            })
        },
        newslist:function(callback){
            DB.find('project','news',{"_id":new ObjectId(id)},function(newslist){
                callback(null,newslist);
            })
        }
    },function(err,data){
        console.log(data);
        res.render('admin/news/editonews',{
            catelist:data.catelist,
            newslist:data.newslist[0]
        })
    })



})

router.post('/editonews',function(req,res){
    console.log(req.body.title);
    var title=req.body.title;

    var author=req.body.author;
    var cid=req.body.cid;

    var description=req.body.description;
    var content=req.body.content;


    DB.updateOne('project','news',{"_id":new ObjectId(req.body.id)},{
        title,author,cid,description,content
    },function(err){

        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/news');
        }
    })
})


router.post('/upload',function(req,res){

 //上传图片
    var form = new multiparty.Form();
    form.uploadDir='static/upload'  /*设置图片上传的路径必须存在*/

    form.parse(req, function(err, fields, files) {

        console.log(fields);

        console.log(files);

        var path=files.filedata[0].path;

        res.json({"err":"","msg":'/'+path});  /*给编辑器返回地址信息*/
    });

})

router.get('/delete',function(req,res){
    //res.send('新闻删除');
    var id=req.query.id;
     console.log(req.query.id);
     DB.removeOne('project','news',{"_id":new ObjectId(id)});
     res.redirect('/admin/news');
})

module.exports = router;





