import express from "express";
import { authorizedUser } from "../middleware/index.js";
import { accept_payment } from "../controller/payment.js";

const router = express.Router();

router.post("/:productId", authorizedUser, accept_payment);

export default router;
