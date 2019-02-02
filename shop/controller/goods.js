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

function productSpecSerachBase(obj) {
    return goods.productSpecSerachBase(obj);
}

function productSpecSerachall(obj) {
    return goods.productSpecSerachall(obj);
}

function goodsState(obj) {
    return goods.goodsState(obj);
}

function add_to_car(obj) {
    return goods.add_to_car(obj);
}

function car_all_info(obj) {
    return goods.car_all_info(obj);
}

function car_delet(obj) {
    return goods.car_delet(obj);
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
    car_delet
}

