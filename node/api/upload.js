let router=require("koa-router")();
let fs=require("fs");
const path = require('path');
router.prefix("/api");
router.post("/upload",async(ctx,next)=>{
  //  // 上传多个文件
  //  const files = ctx.request.files.file; // 获取上传文件
  //  for (let file of files) {
  //    // 创建可读流
  //    const reader = fs.createReadStream(file.path);
  //    // 获取上传文件扩展名
  //    let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
  //    // 创建可写流
  //    const upStream = fs.createWriteStream(filePath);
  //    // 可读流通过管道写入可写流
  //    reader.pipe(upStream);
  //  }

  const file = ctx.request.files.file; // 上传的文件在ctx.request.files.file
  // 创建可读流
  console.log(path)
  const reader = fs.createReadStream(file.path);
  // 修改文件的名称
  var myDate = new Date();
  var newFilename = myDate.getTime()+'.'+file.name.split('.')[1];
  var targetPath = path.join(__dirname,'../public/uploads/') + `/${newFilename}`;
  //创建可写流
  const upStream = fs.createWriteStream(targetPath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  //返回保存的路径
  return ctx.body = { code: 200, data: { url: 'http://' + ctx.headers.host + '/uploads/' + newFilename } };
})

module.exports=router;