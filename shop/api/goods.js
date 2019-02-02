let router = require("koa-router")();
let goods = require("./../controller/goods");

router.prefix("/api");
//商品类型增加
router.post("/goodsType/add", async (ctx, next) => {
    let obj =ctx.request.body;
  await goods.goods_Type_add(obj).then((res)=>{
      ctx.body=res;
  }).catch(err=>{
      ctx.body=err.errors[0].message;
  })
     
})
//商品类型删除
router.post("/goodsType/delete", async (ctx, next) => {
    let obj =ctx.request.body;
  await goods.goods_Type_delete(obj).then((res)=>{
      ctx.body=res;
  }).catch(err=>{
      ctx.body=err.errors[0].message;
  })
     
})
//商品类型修改
router.post("/goodsType/update", async (ctx, next) => {
    let obj =ctx.request.body;
  await goods.goods_Type_update(obj).then((res)=>{
      ctx.body=res;
  }).catch(err=>{
      ctx.body=err.errors[0].message;
  })
     
})


//商品类型查询（根据父级ID查询）
router.get("/goodsType/serach",async (ctx,next)=>{
    let obj=ctx.request.query;
    await goods.goods_Type_serach(obj).then((res)=>{
        ctx.body=res;
    }).catch(err=>{
        ctx.body=err.errors[0].message;
    })
})
//商品基础信息添加
router.post("/goodsBase/add",async(ctx)=>{
    let obj=ctx.request.body;
    await goods.goods_add_base(obj).then((res)=>{
        ctx.body=res
    }).catch(err=>{
        ctx.body=err.errors[0].message;
    })
})

//商品规格信息添加
router.post("/goodsProduct/add",async(ctx)=>{
    let obj=ctx.request.body;
    await goods.productSpec(obj).then((res)=>{
        ctx.body=res
    }).catch(err=>{
        ctx.body=err.errors[0].message;
    })
})

//查询商品基础信息
router.get("/goodsProduct/serach",async(ctx)=>{
    let obj=ctx.request.query;
    await goods.productSpecSerachBase(obj).then((res)=>{
        ctx.body=res
    }).catch(err=>{
        ctx.body=err;
    })
})

//查询商品所有信息
router.get("/goodsProduct/serachall",async(ctx)=>{
    let obj=ctx.request.query;
    await goods.productSpecSerachall(obj).then((res)=>{
        ctx.body=res
    }).catch(err=>{
        ctx.body=err;
    })
})

//商品上下架
router.post("/goodsProduct/changeState",async(ctx)=>{
    let obj=ctx.request.body;
    await goods.goodsState(obj).then((res)=>{
        ctx.body=res
    }).catch(err=>{
        ctx.body=err.errors[0].message;
    })
})

//加入购物车
router.post("/car/add",async(ctx)=>{
    let obj=ctx.request.body;
    await goods.add_to_car(obj).then((res)=>{
        ctx.body=res
    }).catch(err=>{
        ctx.body=err;
    })
})
//获取购物车信息
router.get("/car/serach",async(ctx)=>{
    let obj=ctx.request.query;
    await goods.car_all_info(obj).then((res)=>{
        ctx.body=res
    }).catch(err=>{
        ctx.body=err;
    })
})


//获取购物车信息
router.post("/car/delete",async(ctx)=>{
    let obj=ctx.request.body;
    await goods.car_delet(obj).then((res)=>{
        ctx.body=res
    }).catch(err=>{
        ctx.body=err;
    })
})

module.exports=router;