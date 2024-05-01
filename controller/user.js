import bcrypt from "bcryptjs";
import { passwordValidator, profileValidator } from "../validator/index.js";
import User from "../models/User.js";

/* User Profile Controller */

export const updateUserProfileController = async (req, res, next) => {
  const { name, age, address, phone,gender } = req.body;
  const currentUser = req.user;

  let user_values = {name: name.replace(" ", ""), age, address: address.replace(" ", ""), phone};

  const response = profileValidator(user_values);

  if (response.error) return res.status(400).json({ msg: "INVALID VALUES" });

  try {
    const result = await User.findByPk(currentUser.id);

    if (!result)
      return res.status(403).json({ message: "NO USER FOUND!!" });

    result.name = user_values.name;
    result.age = user_values.age;
    result.address = user_values.address;
    result.phone = user_values.phone;
    result.gender = gender;

    await result.save();

    res.status(200).json({ message: "User updated successfully", user: result });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* Change Password Controller */

export const updateUserPasswordController = async (req, res, next) => {
  const { newPassword } = req.body;
  console.log(newPassword)
  const currentUser = req.user;

  try {
    let response = passwordValidator(newPassword);
    if (response.error) return res.status(400).json({ msg: "INVALID VALUES" });

    const hash = await bcrypt.hash(newPassword, 5);

    const user = await User.findByPk(currentUser.id);

    const compare_result = await bcrypt.compare(newPassword, user.dataValues.password);
    if (compare_result)
      return res
        .status(400)
        .json({ message: "NEW PASSWORD SAME AS PREVIOUS PASSWORD" });

    user.password = hash;
    await user.save();

  } catch (error) {
    return next(error);
  }
  return res.status(200).json({ message: "PASSWORD CHANGES SUCCESSFULLY!!" });
};
