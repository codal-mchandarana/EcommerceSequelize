import Product from "../models/Product.js";

export const addToWishlist = async (req, res, next) => {
  const product_id = req.params.id;

  try {
    const product = await Product.findByPk(product_id);
    const result = await req.user.addWishlistof(product);

    if (!result)
      throw new Error();

    res.status(200).json({ message: "PRODUCT HAS BEEN ADDED TO THE WISHLIST !!" });
  } catch (error) {
    return next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  const product_id = req.params.id;

  try {
    const product = await Product.findByPk(product_id);
    const result = await req.user.removeWishlistof(product);
    if (!result) throw new Error();

    return res.status(200).json({ message: "PRODUCT HAS BEEN REMOVED FROM THE WISHLIST !!!" });
  } catch (error) {
    return next(error);
  }
};

export const moveItemToCart = async (req, res, next) => {
  const user_id = req.user.id;
  const product_id = req.params.id;

  try {
    let result = false;

    const product = await Product.findByPk(product_id);
    const resultOfCart = await req.user.addCartof(product);

    if (resultOfCart) {
      const resultOfWishlist = await req.user.removeWishlistof(product);
      if (resultOfWishlist) result = true;
    }

    if (!result) throw new Error();

    return res.status(200).json({ message: "PRODUCT HAS BEEN ADDED TO THE CART FROM WISHLIST !!" });
  } catch (error) {
    return next(error);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
    const result = await req.user.getWishlistof();

    if (!result)
      return res.status(400).json({ message: "NO PRODUCT IN WISHLIST!!" });

    const arr = [];
    for(const element of result)
      arr.push(element.dataValues);

    return res.status(200).json({ "YOUR WISHLIST": arr });
  } catch (error) {
    return next(error);
  }
};
