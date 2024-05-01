import express from "express";
import db from './database/db.js';
import { configDotenv } from "dotenv";

/**** Importing Modules ****/

import User from './models/User.js';
import Product from './models/Product.js';
import Cart from './models/Cart.js';
import Wishlist from "./models/Wishlist.js";
import Payment from "./models/Payment.js";

/**** Importing Routes ****/
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import paymentRoute from "./routes/payment.js";
import wishlistRoute from "./routes/whishlist.js";

/**** Importing Controllers  ****/
import { urlNotFound } from "./controller/error.js";

/**** Importing Middleware  ****/
import { errormiddleware } from "./middleware/index.js";

configDotenv();
const app = express();

/**** Using MiddleWare  ****/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/payment", paymentRoute);
app.use("/wishlist", wishlistRoute);

app.get("/", (req, res) => {
  res.send("Hello Mann here");
});

/***** Path for 404 page not found *****/
app.use(urlNotFound);

/***** Handling internal server error *****/
app.use(errormiddleware);

/***** Associations *****/

User.belongsToMany(Product, { through: Cart, as: 'cartof' });
Product.belongsToMany(User, { through: Cart, as: 'userCart' });

User.belongsToMany(Product, { through: Wishlist, as: 'wishlistof' });
Product.belongsToMany(User, { through: Wishlist, as: 'userWishlist' });

User.hasMany(Payment);
Payment.belongsTo(User);

/***** Database Connection *****/

db.sequelize
  .sync()
  // .sync({force:true})
  .then(() => {
    return "Successfully Connected with postgresql database";
  })
  .then((message) => {
    console.log(message);
    app.listen(8080, () => {
      console.log("SERVER STARTED ON PORT 8080");
    });
  });
