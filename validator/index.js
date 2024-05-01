import Joi from "joi";

/* Sign Up Validator */

const signUpValidator = (User) => {
  const joiSchema = Joi.object({
    email: Joi.string().required().email().min(10).max(50),
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^(?=.*[0-9])" +
            "(?=.*[a-z])(?=.*[A-Z])" +
            "(?=.*[@#$%^&+=])" +
            "(?=\\S+$).{8,20}$"
        )
      ),
    verifypassword: Joi.ref("password"),
  });
  return joiSchema.validate(User);
};

/* Login Validator */

const loginValidator = (User) => {
  const joiSchema = Joi.object({
    email: Joi.string().required().email().min(10).max(50),
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^(?=.*[0-9])" +
            "(?=.*[a-z])(?=.*[A-Z])" +
            "(?=.*[@#$%^&+=])" +
            "(?=\\S+$).{8,20}$"
        )
      ),
  });
  return joiSchema.validate(User);
};

/* Password Validator */

const passwordValidator = (newpassword) => {
  return Joi.string()
    .required()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])" +
          "(?=.*[a-z])(?=.*[A-Z])" +
          "(?=.*[@#$%^&+=])" +
          "(?=\\S+$).{8,20}$"
      )
    )
    .validate(newpassword);
};

/* Profile Validator */

const profileValidator = (profile) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(8).max(20).pattern(new RegExp("^[a-zA-Z]+$")),
    age: Joi.number().min(1).max(100),
    address: Joi.string().min(10).max(100).alphanum(),
    phone: Joi.string().length(10).pattern(new RegExp("^[0-9]*$")),
  });
  return joiSchema.validate(profile);
};

/* Product Validator */

const productValidator = (product) => {
  const joiSchema = Joi.object({
    title: Joi.string().min(5).max(40).required(),
    description: Joi.string().min(5).max(40),
    price: Joi.number().required(),
    discountpercentage: Joi.number(),
    stock: Joi.number(),
    brand: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")),
    category: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")),
    thumbnail: Joi.string(),
  });
  return joiSchema.validate(product);
};

export {
  signUpValidator,
  loginValidator,
  passwordValidator,
  profileValidator,
  productValidator,
};
