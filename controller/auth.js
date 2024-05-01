import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signUpValidator, loginValidator } from "../validator/index.js";

import User from "../models/user.js";

/* Sign Up controller */

export const signUpController = async (req, res, next) => {
  const { email, password, verifypassword } = req.body;

  let response = signUpValidator({ email, password, verifypassword });

  if (response.error || password !== verifypassword)
    return res.status(400).json({ msg: "INVALID CREDENTIALS" });

  try {
    const result = await User.findOne({where:{email:email}})
    if (result) {
      return res.status(403).json("USER ALREADY EXISTS");
    }
  } catch (error) {
    return next(error);
  }

  try {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);

    const result = await User.create({
      name:null,
      email,
      password:hash,
      phone:null,
      address:null,
      gender:null
    });
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ message: "USER CREATED SUCCESSFULLY!!" });
};

/* Login controller */

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const response = loginValidator({ email, password });

  if (response.error)
    return res.status(400).json({ msg: "INVALID CREDENTIALS" });

  try {
    const result = await User.findOne({where:{email:email}});

    if (!result)
      return res.status(401).json({ message: "NO USER EXISTS" });

    const user = result.dataValues;

    const compare_result = await bcrypt.compare(password, user.password);

    if (!compare_result) {
      return res.status(401).json({ message: "INVALID CREDENTIAL!!" });
    }

    const jwtSecretKey = process.env.SECRET_KEY;
    delete user.password;
    const token = jwt.sign(user, jwtSecretKey);

    return res.status(200).json({ msg: "AUTHORISED USER !", token });
  } catch (error) {
    return next(error);
  }
};
