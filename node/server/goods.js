let goods = require("./../model/index");

//新增商品类型
async function goods_Type_add(obj) {
    let temp = await goods.goodsType.create({
        'tname': obj.tname,
        'fid': obj.fid
    });
    if (temp) {
        return { code: 1, msg: "success", data: temp };
    } else {
        return { code: 0, msg: "error" }
    }
}

//根据FID查询商品类型
async function goods_Type_serach(obj) {
    let data = [];
    let temp = null;
    console.log(obj.fid)
    if (obj.fid == undefined) {
        temp = await goods.goodsType.findAll();
    } else {
        temp = await goods.goodsType.findAll({
            where: {
                "fid": obj.fid
            }
        })
    }


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
        'imgText': obj.imgText,
        'img': obj.img,
        "desc": obj.desc,
        "integral": obj.integral
    });
    if (temp) {
        return { code: 1, msg: "success", data: temp };
    } else {
        return { code: 0, msg: "error" }
    }
}
//修改商品基础信息
async function updata_goods_base(obj) {
    let temp = await goods.goods.update({
        'goodsName': obj.goodsName,
        'goodsState': obj.goodsState,
        'goodsTypeID': obj.goodsTypeID,
        'imgText': obj.imgText,
        'img': obj.img,
        "desc": obj.desc,
        "integral": obj.integral
    }, {
            where: {
                id: obj.id
            }
        });
    if (temp) {
        return { code: 1, msg: "success", data: temp };
    } else {
        return { code: 0, msg: "error" }
    }
}

//添加商品规格基础信息
async function productSpec(obj) {
    let temp = await goods.productSpec.create({
        'goodsName': obj.goodsName,
        'goodsID': parseInt(obj.goodsID),
        'costPrice': parseInt(obj.costPrice),
        'salesPrice': parseInt(obj.salesPrice),
        'inventory': parseInt(obj.inventory),
        'inventoryWarning': parseInt(obj.inventoryWarning),
        'goodsImg': obj.goodsImg,

    });
    if (temp) {
        return { code: 1, msg: "success" };
    } else {
        return { code: 0, msg: "error" }
    }
}

//商品规格修改
async function updata_productSpec(obj) {
    let temp = await goods.productSpec.update({
        'goodsName': obj.goodsName,
        'costPrice': parseInt(obj.costPrice),
        'salesPrice': parseInt(obj.salesPrice),
        'inventory': parseInt(obj.inventory),
        'inventoryWarning': parseInt(obj.inventoryWarning),
        'goodsImg': obj.goodsImg,
    }, {
            where: {
                id: obj.id
            }
        });
    if (temp) {
        return { code: 1, msg: "success" };
    } else {
        return { code: 0, msg: "error" }
    }
}

//商品列表 查询商品基础信息
async function productSpecSerachBase(obj) {
    let limit_ = obj.limit || 10;//查询数据长度
    let offset_ = obj.offset || 0;//从那条数据开始查询
    let type = obj.type || null//选择商品的类型
    let data = [];
    let count = 0;
    goods.goods.hasMany(goods.productSpec, { foreignKey: "goodsid", targetKey: "id" })
    goods.goods.belongsTo(goods.goodsType, { foreignKey: "goodsTypeID", targetKey: "id" })
    if (type == null) {
        await goods.goods.findAndCountAll(
            {
                include: [{
                    model: goods.goodsType
                }, {
                    model: goods.productSpec
                }],
                limit: parseInt(limit_),
                offset: parseInt(offset_)
            }).then(function (result) {
                count = result.count;
                data = result.rows;

            });
    } else {
        await goods.goods.findAndCountAll(
            {
                include: [{
                    model: goods.goodsType,
                    where: {
                        tname: type
                    }
                }, {
                    model: goods.productSpec
                }],
                limit: parseInt(limit_),
                offset: parseInt(offset_)
            }).then(function (result) {
                count = result.count;
                data = result.rows;

            });
    }


    if (count >= 0) {
        return { code: 1, msg: "success", data: data, count: count };
    } else {
        return { code: 0, msg: "error", data: data }
    }

}

//查看商品所有信息
async function productSpecSerachall(obj) {
    goods.goods.belongsTo(goods.goodsType, { foreignKey: "goodsTypeID", targetKey: "id" })
    goods.goods.hasMany(goods.productSpec, { foreignKey: "goodsID", targetKey: "id" })

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

//加入购物车
async function add_to_car(obj) {
    let temp = await goods.car.findAll({//判断购物车表中该商品是否已经存在
        where: {
            goodsID: obj.goodsID,
            userID: obj.userID
        }
    })
    if (temp.length != 0) {//如果商品存在数量加一
        let temp1 = goods.car.update({
            goodsNum: parseInt(temp[0].goodsNum) + 1
        }, {
                where: {
                    id: temp[0].id
                }
            })
        if (temp1) {
            return { code: 1, msg: "此商品已存在购物车,商品数量+1" }
        } else {
            return { code: 0, msg: "error" }
        }
    }

    if (temp.length == 0) {//如果不存在加入购物车
        let add = await goods.car.create({
            goodsID: obj.goodsID,
            goods_ID: obj.goods_ID,
            userID: obj.userID,
            goodsNum: obj.goodsNum
        })

        if (add) {
            return { code: 1, msg: "成功加入购物车" }
        } else {
            return { code: 0, msg: "error" }
        }
    }
}
//查询购物车所有信息
async function car_all_info(obj) {
    //表之间建立关系
    goods.car.belongsTo(goods.goods, { foreignKey: "goodsID", targetKey: "id" })
    goods.car.belongsTo(goods.productSpec, { foreignKey: "goods_ID", targetKey: "id" })
    let data = [];
    let temp = await goods.car.findAll({
        attributes: ["id", "goodsNum"],//只查询ID和GOODSNAME
        include: [{
            model: goods.goods,
            attributes: ["id", "goodsName","integral"]//只查询ID和GOODSNAME
        }, {
            model: goods.productSpec
        }],
        where: {
            userID: obj.userID
        }
    }

    );
    if (temp) {
        for (const i of temp) {
            data.push(i);
        }
        return { code: 1, msg: "success", data: data };
    } else {
        return { code: 0, msg: "error", data: data }
    }
}

//删除购物车数据
async function car_delet(obj) {

    let temp = await goods.car.destroy({
        where: {
            id: {
                $in: obj.carID.split(",")
            }
        }
    })
    if (temp > 0) {
        return { code: 1, msg: "success" };
    } else {
        return { code: 0, msg: "error" }
    }
}

//商品评论
async function goodsComments(obj) {
    let date = new Date();
    let temp = await goods.comments.create({
        userID: obj.userID,
        goodsID: obj.goodsID,
        commentsContent: obj.commentsContent,
        commentsTime: `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}/${date.getHours()}/${date.getSeconds()}`,
        img: obj.imgUrl
    })
    if (temp) {
        return { code: 1, msg: "success" };
    } else {
        return { code: 0, msg: "error" }
    }
}

//评论回复
async function CommentsReply(obj) {
    let date = new Date();
    let temp = await goods.reply.create({
        userID: obj.userID,
        commentsID: obj.commentsID,
        replyContent: obj.replyContent,
        replyTime: `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}/${date.getHours()}/${date.getSeconds()}`
    })
    if (temp) {
        return { code: 1, msg: "success" };
    } else {
        return { code: 0, msg: "error" }
    }
}
//根据商品ID查询评论内容和回复内容
async function query_comments(obj) {
    //表之间建立关系
    //  goods.car.belongsTo(goods.goods, { foreignKey: "goodsID", targetKey: "id" })
    //  goods.car.belongsTo(goods.productSpec, { foreignKey: "goods_ID", targetKey: "id" })
    goods.comments.hasMany(goods.reply, { foreignKey: "commentsID", targetKey: "id" })
    goods.comments.belongsTo(goods.User, { foreignKey: "userID", targetKey: "id" })
    goods.reply.belongsTo(goods.User, { foreignKey: "userID", targetKey: "id" })
    let temp = await goods.comments.findAll({
        attributes: ["commentsContent", "commentsTime", "img", "goodsID"],
        where: {
            goodsID: obj.goodsID
        },
        include: [{
            attributes: ["commentsID", "replyContent", "id", "replyTime"],
            model: goods.reply,
            include: [{
                model: goods.User,
                attributes: ["username"]
            }]
        }, {
            model: goods.User,
            attributes: ["username"]
        }]

    })
    if (temp.length > 0) {
        return { code: 1, msg: "success", data: temp };
    } else {
        return { code: 0, msg: "error" }
    }
}

//新增收藏商品
async function add_collection(obj) {
    let temp = await goods.collection.create({
        userID: obj.userID,
        goodsID: obj.goodsID,
    })
    if (temp) {
        return { code: 1, msg: "success" };
    } else {
        return { code: 0, msg: "error" }
    }
}
//查询收藏的商品
async function query_collection(obj) {
    goods.collection.belongsTo(goods.goods, { foreignKey: "goodsID", targetKey: "id" })
    let temp = await goods.collection.findAll({
        attributes: ["goodsID", "id"],
        include: [{
            model: goods.goods
        }],
        where: {
            userID: obj.userID
        }
    })
    if (temp) {
        return { code: 1, msg: "success", data: temp };
    } else {
        return { code: 0, msg: "error" }
    }
}
//删除收藏的商品
async function delete_collection(obj) {
    let temp = await goods.collection.destroy({
        where: {
            id: obj.id
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
    goods_Type_update,
    goods_add_base,
    productSpec,
    productSpecSerachBase,
    productSpecSerachall,
    goodsState,
    add_to_car,
    car_all_info,
    car_delet,
    goodsComments,
    CommentsReply,
    query_comments,
    add_collection,
    query_collection,
    delete_collection,
    updata_goods_base,
    updata_productSpec
}