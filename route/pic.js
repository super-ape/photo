// 创建相册相关的路由
const express = require('express');
const router = express.Router();
const file = require('../model/file.js');
const fd = require('formidable');//实现上传图片与视频

// 处理 /pic/show 请求, 展示某个相册里面的内容
router.get('/show',function(req,res){
    // 获取请求参数得到被点击的相册名称
    var dir = req.query.dirName;
    // 调用file里面的getDirs方法获取文件
    var dirName = 'uploads/'+dir;
    file.getDirs(dirName,function(err,files){
        if(err){
            console.log(err);
            return;
        }
        res.render('show',{dir:dir,pics:files});
    });
});
// 处理 get方式的/pic/upload 请求,跳转到上传页面
router.get('/upload',function(req,res){
    // 再上传图片是需要知道将图片传到哪个相册中
    file.getDirs('uploads/',function(err,docs){
        if(err){
            console.log(err);
            res.render("error",{errMsg:"获取相册出错"});
            return;
        }
        // 获取相册, 将其传递给上传页面
        res.render('upload',{dirs:docs});
    });    
});

// 处理 post 方式的 /pic/upload 请求, 上传图片
router.post('/upload',function(req,res){
    // 处理图片的上传
    // 创建表单对象
    var form  = new fd.IncomingForm();
    // 设置上传临时保存路径
    form.uploadDir = 'temp';
    // 解析请求
    form.parse(req,function(err,fields,files){// fields: 一个对象(包含所有文本域的内容)  files: 一个对象(包含所有上传文件的内容)  
                                              // name名取到对应值
        if(err){
            console.log(err);
            res.render("error",{errMsg:"上传图片失败"});
            return;
        }
        // 获取表单中的数据
        // 文本域数据: 选择的文件夹名称
        var dirName = fields.dirName;
        console.log(fields);
        console.log(files);
        // 获取图片文件
        var pic = files.pic; // 整个pic对象
        // 调用file处理图片
        file.updata(dirName,pic,function(err){
            if(err){
                console.log(err);
                res.render('error',{errMsg:"上传图片失败"});
                return;
            }
            // 上传成功, 跳转上传图片的文件夹中
            res.redirect('/pic/show?dirName='+dirName);
        });      
    });
});


//暴露路由
module.exports = router;