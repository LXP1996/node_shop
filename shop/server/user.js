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

//增加用户
async function user_add(obj) {
    let temp = await user.User.create({
        username: obj.username,
        password: obj.password,
        black: "true"
    })
    if (temp) {
        return { code: 1, msg: "success" }
    } else {
        return { code: 0, msg: "error" }
    }
}

//用户登陆
async function user_login(obj) {
    let username = await user.User.findOne({
        where: { username: obj.username }
    })
    let password = await user.User.findOne({
        where: { password: obj.password }
    })
    if (username) {

        if (password) {
            return { code: 0, msg: "success", data: password }

        } else {
            return { code: 0, msg: "密码错误" }
        }

    } else {
        return { code: 0, msg: "账号错误" }
    }
}

module.exports = {
    user_serach,
    user_add_black,
    user_add,
    user_login
}

