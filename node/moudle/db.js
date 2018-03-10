/**
 * Created by Administrator on 2018/3/6 0006.
 *





 *
 */

//http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;


var ObjectId = mongodb.ObjectId;

var dbUrl = 'mongodb://localhost:27017/';

var dbName = 'project';


function __connect(cb){

    MongoClient.connect(dbUrl,function(err,client){
        if(err){
            console.log(err);
            return false;
        }
        
        cb(err,client);
    })
}

exports.ObjectId=ObjectId;

/*
 DB.find('user',{},function(data){

    console.log(data)
 })
* */

//{"_id":new ObjectId(id)}
// exports.find=function(collectionName,json,cb){
//     __connect(function(err,client){
//         var db=client.db(dbName);
//         var result=db.collection(collectionName).find(json);
//         result.toArray(function(err,docs){
//             if(err){
//                 console.log(err);
//                 return;
//             }
//             cb(docs);
//             client.close();  
//         })
//     })

//}

exports.find=function(collectionName,json1,json2,json3,cb){
    //条件
    if(arguments.length==3){
        var slipNum=0;       /*跳过的条数据*/
        var pageSize=0;
        var attr={};  /*要查询的字段*/
        cb=json2;
    }else if(arguments.length==4){
        var slipNum=0;
        var pageSize=0;
        var attr=json2;  /*要查询的制度*/
        cb=json3;
    }else if(arguments.length==5){
        var attr=json2;  /*要查询的字段*/
        var slipNum=(json3.page-1)*json3.pageSize;
        var pageSize=json3.pageSize;
    } else{
        console.log('参数错误');
    }
    __connect(function(err,client){
        var db=client.db(dbName);
        //条件

        //console.log(JSON.stringify());

        var result=db.collection(collectionName).find(json1,attr).skip(slipNum).limit(pageSize);
        result.toArray(function(err,docs){
            //docs  查询到的数据
            console.log(docs);
            if(err){
                console.log(err);
                return;
            }
            cb(docs);
            client.close();  /*关闭数据库*/
        })
    })

}


/*
DB.insert('user',{},function(){

})
* */

exports.insert=function(collectionName,json,cb){

        __connect(function(err,client){
           
            var db=client.db(dbName);

            db.collection(collectionName).insertOne(json,function(err){
                cb(err);
            })

        })
}


/*
 DB.update('user',{},{},function(){


 })
* */
exports.update=function(collectionName,json1,json2,cb){

    __connect(function(err,client){
        
        var db=client.db(dbName);

        db.collection(collectionName).updateOne(json1,{
            $set:json2
        },function(err){
            cb(err);
        })

    })
}

exports.removeOne=function(collectionName,json,cb){
     __connect(function(err,client){
         var db=client.db(dbName);
         db.collection(collectionName).removeOne(json);
     })

}
 exports.count=function(collectionName,json,cb){
    __connect(function(err,client){
        var db=client.db(dbName);
        var result=db.collection(collectionName).count();
        result.then(function(err,docs){
            if(err){
                console.log(err);
                return;
            }
            cb(docs);
        })
    })

}