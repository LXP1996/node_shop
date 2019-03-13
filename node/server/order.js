let order = require("./../model/index");

//增加收获地址
async function add_address(obj) {
    //默认地址
    if (obj.defaultAddress == "true") {
        await order.address.update({
            defaultAddress: "false"
        }, {
                where: {
                    userID: obj.userID//待修改
                }
            })
    }

    let temp = await order.address.create({
        userID: obj.userID,//待修改
        pID: obj.pID,
        cID: obj.cID,
        aID: obj.aID,
        DetailedAddress: obj.DetailedAddress,
        defaultAddress: obj.defaultAddress,
        username:obj.username,
        phone:obj.phone
    })

    if (temp) {
        return { code: 1, msg: "success" }
    } else {
        return { code: 0, msg: "error" }
    }
}

//删除收获地址
async function delete_address(obj) {
    let temp = await order.address.destroy({
        where: {
            id: obj.addressID
        }
    })

    if (temp) {
        return { code: 1, msg: "success" }
    } else {
        return { code: 0, msg: "error" }
    }
}
//设置为默认地址

async function set_defaultAddress(obj) {

    await order.address.update({
        defaultAddress: "false"
    }, {
            where: {
                userID: obj.userID//待修改
            }
        })
    let temp = await order.address.update({
        defaultAddress: obj.defaultAddress
    }, {
            where: {
                id: obj.addressID
            }
        })

    if (temp) {
        return { code: 1, msg: "success" }
    } else {
        return { code: 0, msg: "error" }
    }
}

//修改收货地址
async function update_address(obj) {
    let temp = await order.address.update({
        pID: obj.pID,
        cID: obj.cID,
        aID: obj.aID,
        DetailedAddress: obj.DetailedAddress,
        defaultAddress: obj.defaultAddress
    }, {
            where: {
                id: obj.addressID
            }
        })

    if (temp) {
        return { code: 1, msg: "success" }
    } else {
        return { code: 0, msg: "error" }
    }
}

//查询省 数据
async function query_p(obj) {
    let temp = await order.provinces.findAll()
    if (temp) {
        return { code: 1, msg: "success", data: temp }
    } else {
        return { code: 0, msg: "error" }
    }
}

//根据省ID查询市数据
async function query_c(obj) {
    let temp = await order.cities.findAll({
        where: {
            provinceid: obj.provinceid
        }
    })
    if (temp) {
        return { code: 1, msg: "success", data: temp }
    } else {
        return { code: 0, msg: "error" }
    }
}

//根据市ID查询区县数据
async function query_a(obj) {
    let temp = await order.areas.findAll({
        where: {
            cityid: obj.cityid
        }
    })
    if (temp) {
        return { code: 1, msg: "success", data: temp }
    } else {
        return { code: 0, msg: "error" }
    }
}

//查询收获地址
async function query_address(obj) {
    order.address.belongsTo(order.provinces, { foreignKey: "pID", targetKey: "provinceid" });
    order.address.belongsTo(order.cities, { foreignKey: "cID", targetKey: "cityid" });
    order.address.belongsTo(order.areas, { foreignKey: "aID", targetKey: "areaid" });
    let temp = "";
    if (obj.addressID != null) {
        temp = await order.address.findAll({
            attributes: ["id", "userID", "pID", "cID", "aID", "DetailedAddress", "defaultAddress"],
            include: [{
                model: order.provinces
            }, { model: order.cities }, { model: order.areas }],
            where: {
                userID: obj.userID,
                id: obj.addressID
            }
        })
    } else {
        temp = await order.address.findAll({
            attributes: ["id", "userID", "pID", "cID", "aID", "DetailedAddress", "defaultAddress"],
            include: [{
                model: order.provinces
            }, { model: order.cities }, { model: order.areas }],
            where: {
                userID: obj.userID,
            }
        })
    }

    if (temp) {
        return { code: 1, msg: "success", data: temp }
    } else {
        return { code: 0, msg: "error" }
    }
}
//增加订单
async function add_order(obj) {
    let date = new Date();
    let temp = await order.order.create({
        addressID: obj.addressID,
        goodsID: obj.goodsID,
        userID: obj.userID,//待修改
        goodsNum: obj.goodsNum
    })
    console.log(temp.id)
    let temp2 = await order.orderDetails.create({
        id: new Date().getTime() + temp.id,
        orderID: temp.id,
        orderTime: `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}/${date.getHours()}/${date.getSeconds()}`,
        orderState: 1
    })
    if (temp && temp2) {
        return { code: 1, msg: "success" }
    } else {
        return { code: 0, msg: "error" }
    }
}

//订单列表
async function order_list(obj) {
    let limit_ = obj.limit || 10;//查询数据长度
    let offset_ = obj.offset || 0;//从那条数据开始查询
    let data = [];
    let count = 0;
    //多表联查
    order.orderDetails.belongsTo(order.order, { foreignKey: "orderID", targetKey: "id" })
    order.order.belongsTo(order.User, { foreignKey: "userID", targetKey: "id" })
    order.order.belongsTo(order.address, { foreignKey: "addressID", targetKey: "id" })
    order.order.belongsTo(order.goods, { foreignKey: "goodsID", targetKey: "id" })
    //根据订单状态查询
    let orderState = obj.orderState;
    if (orderState == undefined) {
        let temp = await order.orderDetails.findAndCountAll(
            {
                include: [{
                    model: order.order,
                    include:[{
                model:order.User
                    },{
                        model:order.address
                    },{
                        model:order.goods
                    }
                ]
                }],
                limit: parseInt(limit_),
                offset: parseInt(offset_)
            }).then(function (result) {
                count = result.count;
                data = result.rows;
            });
    } else {
        let temp = await order.orderDetails.findAndCountAll(
            {
                where: {
                    orderState: obj.orderState
                },
                include: [{
                    model: order.order,
                    include:[{
                model:order.User
                    },{
                        model:order.address
                    },{
                        model:order.goods
                    }
                ]
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

module.exports = {
    add_address,
    delete_address,
    set_defaultAddress,
    update_address,
    query_p,
    query_c,
    query_a,
    query_address,
    add_order,
    order_list
}