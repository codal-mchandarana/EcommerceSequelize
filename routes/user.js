import express from "express";

/**** Importing Middleware  ****/

import { authorizedUser } from "../middleware/index.js";

/**** Importing Controllers  ****/

import {
  updateUserPasswordController,
  updateUserProfileController,
} from "../controller/user.js";
import { loginController, signUpController } from "../controller/auth.js";

const router = express.Router();

router.post("/signUp", signUpController);

router.post("/login", loginController);

router.post("/profile", authorizedUser, updateUserProfileController);

router.put("/change-password", authorizedUser, updateUserPasswordController);

export default router;
