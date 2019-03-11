module.exports = (sequelize, DataTypes) =>
    sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        userID: {
            type: DataTypes.STRING,
            validate: {
                //父级ID正则验证
                isInt: {
                    isNumeric: true,
                    msg: "{code:0,msg:'用户ID必须是数字'}"
                }
            }
        },
        addressID: {
            type: DataTypes.STRING,
            validate: {
                //父级ID正则验证
                isInt: {
                    isNumeric: true,
                    msg: "{code:0,msg:'必须是数字'}"
                }
            }
        },
        goodsID: {
            type: DataTypes.STRING,
            validate: {
                //父级ID正则验证
                isInt: {
                    isNumeric: true,
                    msg: "{code:0,msg:'必须是数字'}"
                }
            }
        },
        goodsNum: {//商品规格ID
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