var user=require('./../model/index');

async function user_serach() {
    let data=[];
    var pets = await user.User.findAll({
        where: {
            username: 'lxp'
        }
    });
    for (let p of pets) {
       data.push(JSON.stringify(p));
    }
    return data;
}

module.exports={
    user_serach
}

