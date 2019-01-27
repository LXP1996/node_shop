let router=require("koa-router")();
let controller=require("./../controller/user");
router.prefix("/api/user");
router.get("/serach",async(ctx,next)=>{
    var data='';
  await  controller.user_serach().then(res=>{
   data=res;
  });
  ctx.body=JSON.parse(data);//响应数据
})

module.exports=router;