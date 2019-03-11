module.exports=(sequelize,DataTypes)=>
sequelize.define('productSpec',{
    id:{
        type:DataTypes.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    goodsName:{//商品规格名称
        type:DataTypes.STRING,
        validate:{
            isEven:function(value){
                if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))){
                    throw new Error("{code:0,msg:'商品规格名称格式错误'}");
                      }
            }
        }
    },
    
    goodsID:{//商品ID
        type:DataTypes.STRING,
        validate:{
            //商品ID正则验证
            isInt:{
            
              msg:"{code:0,msg:'商品ID必须是数字'}"
            }
          }
    },
    costPrice:{//成本价格
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            //商品成本价格正则验证
            isInt:{
         
              msg:"{code:0,msg:'成本价格必须是数字'}"
            }
          }
    },
    salesPrice:{//销售价格
        type:DataTypes.STRING,
        validate:{
            //商品销售价格正则验证
            isInt:{
            
              msg:"{code:0,msg:'销售价格必须是数字'}"
            }
          }
    },
    inventory:{//商品库存
        type:DataTypes.STRING,
        validate:{
            //商品库存正则验证
            isInt:{
           
              msg:"{code:0,msg:'商品库存必须是数字'}"
            }
          }
    },
    inventoryWarning:{//商品库存预警
        type:DataTypes.STRING,
        validate:{
            //商品库存预警正则验证
            isInt:{
             
              msg:"{code:0,msg:'商品库存预警必须是数字'}"
            }
          } 
    },
    goodsImg:{//商品图片格式验证(数组)
        type:DataTypes.STRING,
    //     validate:{
    //        isEven: function(value){
    //     value=JSON.parse(value);
    //    for(let i=0;i<value.length;i++){
    //     if (!(/[^\S](.[png||jpeg||jpg])$/.test(value[i]))) {
    //         throw new Error(`{code:0,msg:'第${i+1}图片格式错误'}`);
    //     }
    //    }
    //     }
    // }
    }

})