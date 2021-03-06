module.exports=(sequelize,DataTypes)=>
sequelize.define('userinfo',{
    id:{
        type:DataTypes.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    sex:{
        type:DataTypes.STRING,
        validate:{
            isEven:function(value){
             if(value!="男"&&value!="女"){
          throw new Error("{code:0,msg:'性别必须是男或者女'}")
             }
            }
        }
    },
    age:{
        type:DataTypes.STRING,
        validate:{
            isInt:{
                isNumeric:true,
                msg:"{code:0,msg:'年龄必须是数字'}"
              }
        }

    },
    name:{
        type:DataTypes.STRING,
        validate:{
            isEven:function(value){
                if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))){
                    throw new Error("{code:0,msg:'商品评论内容格式错误'}");
                      }
            }
        }
    },
    info:{
        type:DataTypes.STRING,
        allowNull:true
    },
    img:{
        type:DataTypes.STRING,
        allowNull:true 
    }
})