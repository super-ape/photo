// 创建相册相关的路由
const express = require('express');
const router = express.Router();
const file = require('../model/file.js');
const {SUCCESS,FAILED} = require('../status.js');
// const { route } = require('./pic');
//路由

// const } = require('../status');  同上

/* const status = require('../status.js');
const SUCCESS = status.SUCCESS;
const FAILED = status.FAILED;   同上*/

// 处理 /dir 请求, 显示服务器上所有的相册
router.get('/',function(req,res){
    file.getDirs('./uploads',function(err,files){
        if(err){
            console.log(err);
            res.render('error',{errMsg:"打开相册失败"});
            return;
        }
        res.render('index',{dirs:files});
    });
});
    // 将uploads里面的文件夹显示出来

        // 成功


// 处理 get 方式的 /dir/mkdir 请求,跳转到新建相册页面
router.get('/mkdir',function(req,res){
    res.render('create');
});
    // 跳转到该页面
    // 该页面不需要渲染数据.所以不需要传递数据过去


// 处理 post方式的 /dir/mkdir , 创建相册
router.post('/mkdir',function(req,res){
    var dirName =req.body.dirName;
    if(!dirName){
        res.send({status:FAILED,msg:"文件名不合法"});
        return;
    }
    dirName = 'uploads/' + dirName;
    file.creat(dirName,function(err){
        if(err){
            console.log(err);
            res.send({status:FAILED,msg:"创建失败"});
            return;
        }
        res.send({status:SUCCESS,msg:"创建成功"});
    });
});
    // 获取请求参数dirName

    // 检查dirName的合法性


    // 调用file的create方法来创建文件夹 
    // 将文件夹创建在uploads文件夹里


// 处理 /dir/check 请求, 获取传递过来的参数, 并检查文件夹名称是否已经存在
router.get('/check',function(req,res){
    var dirName = req.query.dirName;
    if(!dirName){
        res.send({status:FAILED,msg:"文件名不能为空"});
        return;
    }
    file.getDirs('./uploads',function(err,files){
        if(err){
            console.log(err);
            res.send({status:FAILED,msg:"网络异常稍后再试"});
            return;
        }
        var result = files.find(function(val){
            return val==dirName;
        });
        if(result){
            res.send({status:FAILED,msg:"已存在"});
            return;
        }
        res.send({status:SUCCESS,msg:"可以使用"});
    });
});
    // 获取参数

        // 如果没有数据, 则返回状态1

    // 获取所有文件夹, 检查其中有没有该名称的文件夹

        // 读取成功, 开始检查是否存在


            // 找到了
 
        // 没找到


// 处理/dir/delete 请求, 删除相册
router.get('/delete',function(req,res){
    var dirName = req.query.dirName.trim();
    file.delete("uploads/"+dirName,function(err){
        if(err){
            console.log(err);
            res.send({status:FAILED,msg:'删除失败'});
            return;
        }
        res.send({status:SUCCESS,msg:'删除成功'});
    });
});
    // 获取参数

    // 调用file的delete方法删除文件夹









//暴露路由
module.exports = router;
