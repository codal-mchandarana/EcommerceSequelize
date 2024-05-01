import {Sequelize} from "sequelize";
import db from "../database/db.js";

const Payment = db.sequelize.define('payment',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    amount:{
      type:Sequelize.INTEGER,
      allowNull:false
    },
    method:{
        type:Sequelize.STRING,
        allowNull:false
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    payment_id:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    product_id:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
});

export default Payment;