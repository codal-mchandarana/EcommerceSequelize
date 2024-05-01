import Product from "../models/Product.js";

/* Getting User Cart Controller */

export const getUserCart = async (req, res, next) => {
  try {
    const result = await req.user.getCartof();

    if (!result)
      return res.status(400).json({ message: "NO PRODUCT IN CART" });

    const arr = [];
    for(const element of result)
      arr.push(element.dataValues);

    return res.status(200).json({ message: arr });

  } catch (error) {
    return next(error);
  }
};

/* Adding Product to Cart Controller */

export const addToCart = async (req, res, next) => {
  const product_id = req.params.id;

  try {
    const product = await Product.findByPk(product_id);

    const count = await req.user.countCartof();

    if (count>10)
      return res
        .status(200)
        .json({
          message:
            "CART IS FULL. PLEASE REMOVE ITEMS IF YOU WANT TO ADD MORE ITEMS",
        });

    const result = await req.user.addCartof(product_id)
    if (!result) throw new Error();

  } catch (error) {
    return next(error);
  }

  res.status(200).json({ message: "PRODUCT HAS BEEN ADDED TO THE CART !!" });
};

/* Remove Product from Cart Controller */

export const removeFromCart = async (req, res, next) => {
  const user_id = req.user.id;
  const product_id = req.params.id;

  try {
    const product = await Product.findByPk(product_id);
    const result = await req.user.removeCartof(product);

    if (!result) throw new Error();

    return res.status(200).json({ message: "PRODUCT HAS BEEN REMOVED FROM THE CART !!!" });
  } catch (error) {
    return next(error);
  }
};
