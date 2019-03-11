module.exports = (sequelize, DataTypes) =>
    sequelize.define('address', {
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
        pID: {
            type: DataTypes.STRING,
            validate: {
                //父级ID正则验证
                isInt: {
                    isNumeric: true,
                    msg: "{code:0,msg:'必须是数字'}"
                }
            }
        },
        cID: {
            type: DataTypes.STRING,
            validate: {
                //父级ID正则验证
                isInt: {
                    isNumeric: true,
                    msg: "{code:0,msg:'必须是数字'}"
                }
            }
        },
        aID: {//商品规格ID
            type: DataTypes.STRING,
            validate: {
                //父级ID正则验证
                isInt: {
                    isNumeric: true,
                    msg: "{code:0,msg:'必须是数字'}"
                }
            }
        },
        DetailedAddress: {
            type: DataTypes.STRING,
            validate: {
                isEven: function (value) {
                    if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))) {
                        throw new Error("{code:0,msg:'格式错误'}");
                    }
                }
            }
        },
        defaultAddress: {
            type: DataTypes.STRING,
            validate: {
                isEven: function (value) {
                    if (value != "true" && value != "false") {
                        throw new Error("{code:0,msg:'true或者false'}")
                    }
                }
            }
        }
    })