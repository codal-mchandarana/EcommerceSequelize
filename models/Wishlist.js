import {Sequelize} from "sequelize";
import db from "../database/db.js";

const Wishlist = db.sequelize.define('wishlist',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    }
});

export default Wishlist;