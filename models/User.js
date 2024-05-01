import {Sequelize} from "sequelize";
import db from '../database/db.js'

const User = db.sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type :Sequelize.STRING,
        allowNull:false
    },
    phone:Sequelize.STRING,
    address:Sequelize.STRING,
    gender:Sequelize.STRING,
    age:Sequelize.INTEGER
})

export default User;
