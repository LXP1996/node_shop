let router = require("koa-router")();
let goods = require("./../controller/goods");

router.prefix("/api");

router.post("/goodsType/add", async (ctx, next) => {
    let obj =ctx.request.body;
  await goods.goods_Type_add(obj).then((res)=>{
      ctx.body=res;
  }).catch(err=>{
      ctx.body=err.errors[0].message;
  })
     
})

router.post("/goodsType/delete", async (ctx, next) => {
    let obj =ctx.request.body;
  await goods.goods_Type_delete(obj).then((res)=>{
      ctx.body=res;
  }).catch(err=>{
      ctx.body=err.errors[0].message;
  })
     
})

router.post("/goodsType/update", async (ctx, next) => {
    let obj =ctx.request.body;
  await goods.goods_Type_update(obj).then((res)=>{
      ctx.body=res;
  }).catch(err=>{
      ctx.body=err.errors[0].message;
  })
     
})



router.get("/goodsType/serach",async (ctx,next)=>{
    let obj=ctx.request.query;
    await goods.goods_Type_serach(obj).then((res)=>{
        ctx.body=res;
    }).catch(err=>{
        ctx.body=err.errors[0].message;
    })
})

module.exports=router;