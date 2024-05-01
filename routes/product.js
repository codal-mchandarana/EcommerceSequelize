import express from "express";

/**** Importing Middleware  ****/

import { authorizedUser } from "../middleware/index.js";

/**** Importing Controllers  ****/

import {
  fetchProductById,
  fetchProducts,
  insertProduct,
  removeProductById,
  updateProductById,
} from "../controller/product.js";

const router = express.Router();

router.get("/", authorizedUser, fetchProducts);

router.post("/addProduct", authorizedUser, insertProduct);

router.get("/getProduct/:id", authorizedUser, fetchProductById);

router.delete("/deleteProduct/:id", authorizedUser, removeProductById);

router.patch("/updateProduct/:id", authorizedUser, updateProductById);

export default router;
