
var express = require('express');

var router = express.Router();

var DB = require('../moudle/db.js');

// router.get('/',function(req,res){
//     //res.send('api首页');
//     DB.find('newscate',{},function(data){
//         //console.log(data);
//         res.json({
//             list:data
//         })
//     })
// })

router.get('/',function(req,res){
    DB.find('news',{},function(data){
        console.log(data);
        res.json({
            list:data
        })
    })
})

module.exports = router;





