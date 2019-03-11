let order = require("./../server/order");

function add_address(obj) {
    return order.add_address(obj);
}

function delete_address(obj) {
    return order.delete_address(obj);
}

function set_defaultAddress(obj) {
    return order.set_defaultAddress(obj);
}
function update_address(obj) {
    return order.update_address(obj);
}

function query_p(obj) {
    return order.query_p(obj);
}

function query_c(obj) {
    return order.query_c(obj);
}
function query_a(obj) {
    return order.query_a(obj);
}

function query_address(obj) {
    return order.query_address(obj);
}

function add_order(obj) {
    return order.add_order(obj);
}
function order_list(obj) {
    return order.order_list(obj);
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