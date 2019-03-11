module.exports = (sequelize, DataTypes) =>
    sequelize.define('orderDetails', {
        id: {
            type: DataTypes.CHAR(36),
            primaryKey: true,

        },
        orderID: {
            type: DataTypes.STRING,
            validate: {
                //父级ID正则验证
                isInt: {
                    isNumeric: true,
                    msg: "{code:0,msg:'用户ID必须是数字'}"
                }
            }
        },
        orderTime: {
            type: DataTypes.STRING,
          
        },
        orderState: {
            type: DataTypes.STRING,
            validate: {
                //父级ID正则验证
                isInt: {
                    isNumeric: true,
                    msg: "{code:0,msg:'必须是数字'}"
                }
            }
        }
    })