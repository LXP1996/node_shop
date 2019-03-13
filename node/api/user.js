let router=require("koa-router")();
let controller=require("./../controller/user");
router.prefix("/api/user");
router.get("/serach",async(ctx,next)=>{
    var data='';
  await  controller.user_serach().then(res=>{
    ctx.body=res;
  }).catch(err => {
    ctx.body = err.errors[0].message
});;
 //响应数据
})

router.post("/changeState",async(ctx,next)=>{
  var obj=ctx.request.body;
await  controller.user_add_black(obj).then(res=>{
  ctx.body=res;
}).catch(err => {
  ctx.body = err.errors[0].message
});;
//响应数据
})

//增加用户user_add
router.post("/useradd",async(ctx,next)=>{
  var obj=ctx.request.body;
await  controller.user_add(obj).then(res=>{
  ctx.body=res;
}).catch(err => {
  ctx.body = err.errors[0].message
});;
//响应数据
})

//用户登陆user_login
router.get("/userlogin",async(ctx,next)=>{
  var obj=ctx.request.query;
await  controller.user_login(obj,ctx).then(res=>{
  ctx.body=res;
}).catch(err => {
  ctx.body = err.errors[0].message
});;
//响应数据
})

router.post("/add_userinfo",async(ctx,next)=>{
  var obj=ctx.request.body;
await  controller.add_userinfo(obj).then(res=>{
  ctx.body=res;
}).catch(err => {
  ctx.body = err.errors[0].message
});;
//响应数据
})

router.post("/update_userinfo",async(ctx,next)=>{
  var obj=ctx.request.body;
await  controller.update_userinfo(obj).then(res=>{
  ctx.body=res;
}).catch(err => {
  ctx.body = err.errors[0].message
});;
//响应数据
})





module.exports=router;