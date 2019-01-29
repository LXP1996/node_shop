let goods = require("./../model/index");

//新增商品类型
async function goods_Type_add(obj) {
    let temp = await goods.goodsType.create({
        'tname': obj.tname,
        'fid': obj.fid
    });
    if (temp) {
        return { code: 1, msg: "success" };
    } else {
        return { code: 0, msg: "error" }
    }
}

//根据FID查询商品类型
async function goods_Type_serach(obj) {
    let data = [];
    let temp = await goods.goodsType.findAll({
        where: {
            "fid": obj.fid
        }
    })

    if (temp) {
        for (const i of temp) {
            data.push(i);
        }
        return { code: 1, msg: "success", data: data };
    } else {
        return { code: 0, msg: "error", data: data }
    }

}

//根据ID删除商品类型
async function goods_Type_delete(obj) {
    let temp = await goods.goodsType.destroy({
        where: {
            "id": obj.id
        }
    })
    if (temp) {
        return { code: 1, msg: "success" };
    } else {
        return { code: 0, msg: "error" }
    }
}
//根据ID修改商品类型名称和父级ID
async function goods_Type_update(obj) {
    let temp = await goods.goodsType.update({
        "tname": obj.tname,
        "fid": obj.fid
    },
        {
            where: {
                "id": obj.id
            }
        })
    if (temp) {
        return { code: 1, msg: "success" };
    } else {
        return { code: 0, msg: "error" }
    }
}

//添加商品基础信息
async function goods_add_base(obj) {
    let temp = await goods.goods.create({
        'goodsName': obj.goodsName,
        'goodsState': obj.goodsState,
        'goodsTypeID': obj.goodsTypeID,
        'imgText': obj.imgText
    });
    if (temp) {
        return { code: 1, msg: "success" };
    } else {
        return { code: 0, msg: "error" }
    }
}

//添加商品基础信息
async function productSpec(obj) {
    let temp = await goods.productSpec.create({
        'goodsName': obj.goodsName,
        'goodsID': obj.goodsID,
        'costPrice': obj.costPrice,
        'salesPrice': obj.salesPrice,
        'inventory': obj.inventory,
        'inventoryWarning': obj.inventoryWarning,
        'goodsImg': obj.goodsImg,
    });
    if (temp) {
        return { code: 1, msg: "success" };
    } else {
        return { code: 0, msg: "error" }
    }
}

//商品列表 查询商品基础信息
async function productSpecSerachBase() {
    let data = [];
    let temp = await goods.goods.findAll({
        include: [{
            model: goods.goodsType
        }]
    });
    if (temp) {
        for (const i of temp) {
            data.push(i);
        }
        return { code: 1, msg: "success", data: data };
    } else {
        return { code: 0, msg: "error", data: data }
    }
}

//查看商品所有信息
async function productSpecSerachall(obj) {
    let data = [];
    let temp = await goods.goods.findAll({
        include: [{
            model: goods.goodsType
        }, {
            model: goods.productSpec
        }],
        where: {
            id: obj.id
        }
    });
    if (temp) {
        for (const i of temp) {
            data.push(i);
        }
        return { code: 1, msg: "success", data: data };
    } else {
        return { code: 0, msg: "error", data: data }
    }
}
//商品上下架
async function goodsState(obj) {
    let data = [];
    let temp = await goods.goods.update({
        goodsState: obj.state
    }, {
        where: {
            id: obj.id
        }
        });
    if (temp) {
        for (const i of temp) {
            data.push(i);
        }
        return { code: 1, msg: "success", data: data };
    } else {
        return { code: 0, msg: "error", data: data }
    }
}
//商品下架
module.exports = {
    goods_Type_add,
    goods_Type_serach,
    goods_Type_delete,
    goods_Type_update,
    goods_add_base,
    productSpec,
    productSpecSerachBase,
    productSpecSerachall,
    goodsState
}