import {Sequelize} from "sequelize";
import db from '../database/db.js'

const Product = db.sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:Sequelize.STRING,
    price:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    discountPercentage:Sequelize.INTEGER,
    stock:Sequelize.INTEGER,
    brand:Sequelize.STRING,
    category:Sequelize.STRING,
    thumbnail:Sequelize.STRING
});

export default Product;