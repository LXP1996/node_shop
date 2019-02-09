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
    //判断用户是否已经存在
    let t = await user.User.findAll({
        where: {
            username: obj.username
        }
    })
    if (t.length > 0) {
        return { code: 1, msg: "改用户已经存在" }
    } else {

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
//添加用户详情信息
async function add_userinfo(obj) {
    let temp = await user.userinfo.create({
        sex: obj.sex,
        img: obj.img,
        age: obj.age,
        info: obj.info,
        name: obj.name
    })
    if (temp) {
        return { code: 1, msg: "success" }
    } else {
        return { code: 0, msg: "error" }
    }
}
//修改用户详情信息
async function update_userinfo(obj) {
    let temp = await user.userinfo.update({
        sex: obj.sex,
        age: obj.age,
        info: obj.info,
        name: obj.name,
    }, {
            where: {
                id: obj.userID
            }
        })
    if (temp) {
        return { code: 1, msg: "success" }
    } else {
        return { code: 0, msg: "error" }
    }
}
module.exports = {
    user_serach,
    user_add_black,
    user_add,
    user_login,
    add_userinfo,
    update_userinfo
}

