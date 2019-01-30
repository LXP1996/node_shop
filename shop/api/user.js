let router=require("koa-router")();
let controller=require("./../controller/user");
router.prefix("/api/user");
router.get("/serach",async(ctx,next)=>{
    var data='';
  await  controller.user_serach().then(res=>{
    ctx.body=res;
  });
 //响应数据
})

router.post("/changeState",async(ctx,next)=>{
  var obj=ctx.request.body;
await  controller.user_add_black(obj).then(res=>{
  ctx.body=res;
});
//响应数据
})


module.exports=router;