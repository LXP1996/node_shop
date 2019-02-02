let Sequelize =require("sequelize");
let config =require("../config/database.config");

let sequelize=new Sequelize(config);

  //引入User实体表
 const User = sequelize.import(__dirname + '/user');
 const goodsType=sequelize.import(__dirname+'/goodsType')
 const goods=sequelize.import(__dirname+'/goods')
 const productSpec=sequelize.import(__dirname+'/productSpec')
 const car=sequelize.import(__dirname+'/car')
sequelize.sync();
//    goods.hasOne(goodsType,{foreignKey:"goodsTypeID",sourceKey: 'id'})
// goodsType.hasMany(goods,{foreignKey:"goodsTypeID",targetKey:"id"})
// goods.belongsTo(goodsType,{foreignKey:"goodsTypeID",targetKey:"id"})
    
     

module.exports={
    User,
    goodsType,
    goods,
    productSpec,
    car
    // order,
}
