var fs = require('fs');
var path = require('path');

var url = path.resolve('./');
//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve(url);
var all = [];//所有文件名
//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
            files = files.filter(item => !(/^.*?\.(js|css|md)/g).test(item));
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                // var filedir = path.join(filePath,filename);
                var filedir = path.join(filename);
                all.unshift(filedir)
                // console.log(filedir)
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            console.log(filedir);
                            
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });

                // # 判断目录是否存在，如果不存在就创建目录
                        // exists = fs.existsSync( `${filePath}/index.html`); 
                        // if(!exists){
                        // fs.mkdirSync(`${filePath}/index.html`);
                        // }
                        // # 将富文本写入html
                        console.log("all",all)
                        let dizhi = '';
                        let html5 = '';
                        for(let item of all){
                           dizhi = dizhi + `<a href="./${item}" target="_self" style="height: 20px;width: auto;text-decoration: none;color: #888;">${item}</a><br />`
                        }
                        html5 = `<!DOCTYPE html>
                        <html lang="Han-s">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <meta http-equiv="X-UA-Compatible" content="ie=edge">
                            <title>Document</title>
                            <link rel="stylesheet" href="./index.css">
                        </head>
                        <body>
                        <div>小刘的网页收藏</div>
                            ${dizhi}
                        </body>
                        </html>`
                        // console.log("地址=",dizhi)
                        url = `${filePath}/index.html`  // index是文件名
                        console.log(url)
                        fs.writeFileSync(url, html5)
        }
    });
}

