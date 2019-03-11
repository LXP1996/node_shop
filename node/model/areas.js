module.exports = (sequelize, DataTypes) =>
    sequelize.define('areas', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        areaid: {
            type: DataTypes.STRING,
   
        },
        area: {
            type: DataTypes.STRING,
        },

        cityid: {
            type: DataTypes.STRING,
        },
    })