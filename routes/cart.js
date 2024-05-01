import express from "express";

/**** Importing Controllers  ****/

import { addToCart, getUserCart, removeFromCart } from "../controller/cart.js";

/**** Importing Middleware  ****/

import { authorizedUser } from "../middleware/index.js";

const router = express.Router();

router.post("/addToCart/:id", authorizedUser, addToCart);

router.get("/getUserCart", authorizedUser, getUserCart);

router.delete("/removeFromCart/:id", authorizedUser, removeFromCart);

export default router;
