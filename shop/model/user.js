module.exports= (sequelize, DataTypes) =>
  // define() 方法接受三个参数
  // 表名，表字段的定义和表的配置信息
  sequelize.define('user', {
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // 唯一
      unique: false,
      validate:{
        isEven:function(value){
            if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))){
                throw new Error("{code:0,msg:'用户名称格式错误'}");
                  }
        }
    }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isEven:function(value){
            if(!(/^[A-Za-z0-9]+$/.test(value))){
                throw new Error("{code:0,msg:'用户密码格式错误'}");
                  }
        }
    }
    },
    black:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isEven:function(value){
          if(value!="true"&&value!="false"){
       throw new Error("{code:0,msg:'用户状态true或者false'}")
          }
        }
    }
    },
    userinfo:{
      type:DataTypes.STRING,
      validate:{
        //父级ID正则验证
        isInt:{
          isNumeric:true,
          msg:"{code:0,msg:'用户详情ID必须是数字'}"
        }
      }
    }
  })
