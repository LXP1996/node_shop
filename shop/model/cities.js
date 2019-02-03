module.exports = (sequelize, DataTypes) =>
    sequelize.define('cities', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        cityid: {
            type: DataTypes.STRING,

        },
        city: {
            type: DataTypes.STRING,
        },

        provinceid: {
            type: DataTypes.STRING,
        },
    })