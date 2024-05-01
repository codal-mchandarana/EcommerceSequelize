import  {Sequelize}  from "sequelize";

const sequelize = new Sequelize('ECOMMERCE','postgres','123456',{
    host:'localhost',
    dialect:'postgres'
})

const db = {}
db.sequelize = sequelize

export default db;
