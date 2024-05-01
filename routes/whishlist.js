import express from "express";
import { authorizedUser } from "../middleware/index.js";
import {
  addToWishlist,
  getWishlist,
  moveItemToCart,
  removeFromWishlist,
} from "../controller/wishlist.js";

const router = express.Router();

router.get("/", authorizedUser, getWishlist);

router.post("/addToWishlist/:id", authorizedUser, addToWishlist);

router.delete("/removeFromWishlist/:id", authorizedUser, removeFromWishlist);

router.get("/moveItemToCart/:id", authorizedUser, moveItemToCart);

export default router;
