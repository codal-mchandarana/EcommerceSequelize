import {Sequelize} from "sequelize";
import db from '../database/db.js'

const Cart = db.sequelize.define('cart',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    }
});

export default Cart;