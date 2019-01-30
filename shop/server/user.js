var user = require('./../model/index');

//查看用户信息
async function user_serach() {
    let data = [];
    var pets = await user.User.findAll();
    for (let p of pets) {
        data.push(p);
    }

    return { code: 1, msg: "success", data: data };
}

//用户加入黑白名单
async function user_add_black(obj) {
    let temp = await user.User.update({
        black: obj.state
    }, {
            where: {
                id: obj.id
            }
        })

    if (temp) {
        return { code: 1, msg: "success" };
    } else {
        return { code: 0, msg: "error" };
    }
}

module.exports = {
    user_serach,
    user_add_black
}

