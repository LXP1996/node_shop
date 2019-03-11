module.exports = (sequelize, DataTypes) =>
    sequelize.define('provinces', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        provinceid: {
            type: DataTypes.STRING,
   
        },
        province: {
            type: DataTypes.STRING,
        }
       
    })