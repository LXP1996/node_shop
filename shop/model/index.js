let Sequelize = require("sequelize");
let config = require("../config/database.config");

let sequelize = new Sequelize(config);

//引入User实体表
const User = sequelize.import(__dirname + '/user');
const goodsType = sequelize.import(__dirname + '/goodsType')
const goods = sequelize.import(__dirname + '/goods')
const productSpec = sequelize.import(__dirname + '/productSpec')
const car = sequelize.import(__dirname + '/car')
const address = sequelize.import(__dirname + '/address')
const provinces = sequelize.import(__dirname + '/provinces')
const cities = sequelize.import(__dirname + '/cities')
const areas = sequelize.import(__dirname + '/areas')
const order = sequelize.import(__dirname + "/order")
const orderDetails = sequelize.import(__dirname + '/orderDetails')
const comments = sequelize.import(__dirname + '/comments')
const reply = sequelize.import(__dirname + '/reply')

const collection = sequelize.import(__dirname + '/collection')
const userinfo = sequelize.import(__dirname + '/userinfo')
sequelize.sync();


module.exports = {
    User,
    goodsType,
    goods,
    productSpec,
    car,
    address,
    provinces,
    cities,
    areas,
    order,
    orderDetails,
    comments,
    reply,
    collection,
    userinfo
}
