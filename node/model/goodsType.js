
module.exports= (sequelize, DataTypes) =>
  // define() 方法接受三个参数
  // 表名，表字段的定义和表的配置信息
  sequelize.define('goodsType', {
    id: {
      // Sequelize 库由 DataTypes 对象为字段定义类型
      type: DataTypes.INTEGER(11),
      // 允许为空
      allowNull: false,
      // 主键
      primaryKey: true,
      // 自增
      autoIncrement: true,
    },
    tname: {
      validate:{
         //商品类型正则验证(自定义验证)
        isEven:function(value){
          if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))){
        throw new Error("{code:0,msg:'商品类型格式错误'}");
          }
        }
      },
      type: DataTypes.STRING,
      allowNull: false,
      // 唯一
      unique: false,
    },
    fid: {
      validate:{
        //父级ID正则验证
        isInt:{
          isNumeric:true,
          msg:"{code:0,msg:'商品上一级fid格式错误'}"
        }
      },
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  })