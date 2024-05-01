import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Error middleware */

export const errormiddleware = (error, req, res, next) => {
  res.status(500).json({ message: "INTERNAL SERVER ERROR OCCURED" });
  next();
};

/* Token verification middleware */

export const authorizedUser = async (req, res, next) => {
  const token = req.headers["token"];

  if(!token)
    return res.status(401).json({"message": "UNAUTHORIZED"});

  try {
    const decode_user = await jwt.verify(token, process.env.SECRET_KEY);

    if (decode_user) {
        const result = await User.findByPk(decode_user.id);
        if (result) {
          req.user = result;
          next();
        } else {
          return res.status(400).json({"message":"NO USER FOUND !"});
        }
    }else{
      throw new Error();
    }
  } catch (error) {
    return next(error);
  }
};
