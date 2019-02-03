let router = require("koa-router")();
let controller = require("./../controller/order")
router.prefix("/api")

//增加收货地址
router.post("/address_add",async (ctx) => {
    let obj = ctx.request.body;
    await controller.add_address(obj).then(res => {
        ctx.body = res;
    }).catch(err => {
        ctx.body = err.errors[0].message
    });

})
//删除收获地址
router.post("/delete_address",async (ctx) => {
    let obj = ctx.request.body;
    await controller.delete_address(obj).then(res => {
        ctx.body = res;
    }).catch(err => {
        ctx.body = err.errors[0].message
    });

})
//设置默认收获地址
router.post("/set_defaultAddress",async (ctx) => {
    let obj = ctx.request.body;
    await controller.set_defaultAddress(obj).then(res => {
        ctx.body = res;
    }).catch(err => {
        ctx.body = err.errors[0].message
    });

})



//修改收货地址
router.post("/update_address",async (ctx) => {
    let obj = ctx.request.body;
    await controller.update_address(obj).then(res => {
        ctx.body = res;
    }).catch(err => {
        ctx.body = err.errors[0].message
    });

})
//查询省 数据
router.get("/query_p",async (ctx) => {
    let obj = ctx.request.body;
    await controller.query_p(obj).then(res => {
        ctx.body = res;
    }).catch(err => {
        ctx.body = err.errors[0].message
    });

})
//根据省ID查询市 数据
router.get("/query_c",async (ctx) => {
    let obj = ctx.request.query;
    await controller.query_c(obj).then(res => {
        ctx.body = res;
    }).catch(err => {
        ctx.body = err.errors[0].message
    });

})
//根据省ID查询市 数据
router.get("/query_a",async (ctx) => {
    let obj = ctx.request.query;
    await controller.query_a(obj).then(res => {
        ctx.body = res;
    }).catch(err => {
        ctx.body = err.errors[0].message
    });

})
//查询收货地址数据
router.get("/query_address",async (ctx) => {
    let obj = ctx.request.query;
    await controller.query_address(obj).then(res => {
        ctx.body = res;
    }).catch(err => {
        ctx.body = err
    });

})

//增加订单
router.post("/add_order",async (ctx) => {
    let obj = ctx.request.body;
    await controller.add_order(obj).then(res => {
        ctx.body = res;
    }).catch(err => {
        ctx.body = err.errors[0].message
    });

})






module.exports=router;