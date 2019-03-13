let goods = require("./../server/goods");
let jwt=require("./../pluigs/jwt")
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
 return jwt.jwt_comfirm(goods.add_to_car,obj)
}

function car_all_info(obj) {
    return jwt.jwt_comfirm(goods.car_all_info,obj);
}

function car_delet(obj) {
    return goods.car_delet(obj);
}

function goodsComments(obj) {
    return goods.goodsComments(obj);
}

function CommentsReply(obj) {
    return goods.CommentsReply(obj);
}

function query_comments(obj) {
    return goods.query_comments(obj);
}
function add_collection(obj) {
    return goods.add_collection(obj);
}
function query_collection(obj) {
    return goods.query_collection(obj);
}
function delete_collection(obj) {
    return goods.delete_collection(obj);
}
function updata_goods_base(obj) {
    return goods.updata_goods_base(obj);
}

function updata_productSpec(obj) {
    return goods.updata_productSpec(obj);
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

