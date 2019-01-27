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

module.exports = {
    goods_Type_add,
    goods_Type_serach,
    goods_Type_delete,
    goods_Type_update
}