module.exports={
    database:"shop",//数据库名称
    username:"root",
    password:"wshiliupeng1996",
    dialect:"mysql",
    host:"132.232.115.224",
    port:"3306",
    pool:{
        max:10,
        min:0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        // 是否冻结表名
        // 默认情况下，表名会转换为复数形式
        freezeTableName: true,
        // 是否为表添加 createdAt 和 updatedAt 字段
        // createdAt 记录表的创建时间
        // updatedAt 记录字段更新时间
        timestamps: false,
        // 是否为表添加 deletedAt 字段
        // 默认情况下, destroy() 方法会删除数据，
        // 设置 paranoid 为 true 时，将会更新 deletedAt 字段，并不会真实删除数据。
        paranoid: false
      }
}