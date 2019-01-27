let Sequelize =require("sequelize");
let config =require("../config/database.config");

let sequelize=new Sequelize(config);

  //引入User实体表
 const User = sequelize.import(__dirname + '/user');
 const goodsType=sequelize.import(__dirname+'/goodsType')


sequelize.sync();
module.exports={
    User,
    goodsType,
    // order,
}
// console.log(__filename);
// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.')
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err)
//   })