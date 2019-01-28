let goods = require("./../server/goods");

function goods_Type_add(obj) {
    return goods.goods_Type_add(obj);
}

function goods_Type_serach(obj) {
    return goods.goods_Type_serach(obj);
}

function goods_Type_delete(obj) {
    return goods.goods_Type_delete(obj);
}


function goods_Type_update(obj) {
    return goods.goods_Type_update(obj);
}

function goods_add_base(obj) {
    return goods.goods_add_base(obj);
}

function productSpec(obj) {
    return goods.productSpec(obj);
}



module.exports = {
    goods_Type_add,
    goods_Type_serach,
    goods_Type_delete,
    goods_Type_update,
    goods_add_base,
    productSpec
}

