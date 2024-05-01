import { productValidator } from "../validator/index.js";
import Product from "../models/Product.js";

/* Fetching Product Controller */

export const fetchProducts = async (req, res, next) => {

  try {
   const result = await Product.findAll();
    if(!result)
       return res.status(400).json({message:"NO AVAILABLE PRODUCT"});

    return res.status(200).json({ result });
  } catch (error) {
    return next(error);
  }
};

/* Insert Product Controller */

export const insertProduct = async (req, res, next) => {
  const {
    title,
    description,
    price,
    discountpercentage,
    stock,
    brand,
    category,
    thumbnail,
  } = req.body;

  const response = productValidator({
    title,
    description,
    price,
    discountpercentage,
    stock,
    brand,
    category,
    thumbnail,
  });
  if (response.error)
    return res.status(400).json({ error: "SOME ERROR OCCURED!!" });

  try {
    const product = await Product.create({title, description, price, discountpercentage, stock, brand, category, thumbnail});
    return res.status(200).json({ message: "PRODUCT ADDED SUCCESSFULLY !!!" });
    if(!product)
       return res.status(400).json({message:"PRODUCT NOT ADDED SUCCESSFULLY!!"});
  } catch (error) {
    return next(error);
  }
};

/* Get Product by Id Controller */

export const fetchProductById = async (req, res, next) => {
  let productId = req.params.id;

  try {
    const result = await Product.findByPk(productId);
    if(!result)
       res.status(400).json({message:"NO PRODUCT FOUND WITH THIS ID !!"})
    const products = result.dataValues;
    return res.status(200).json({ products });
  } catch (error) {
    return next(error);
  }
};

/* Remove Product by Id Controller */

export const removeProductById = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if(!product)
       return res.status(400).json({message: " PRODUCT DOES NOT EXISTS!"})

    const result = await product.destroy();
    if (result)
      return res.status(200).json({ message: "PRODUCT DELETED SUCCESSFULLY !!!" });

    else
      throw new Error();
  } catch (error) {
    return next(error);
  }
};

/* Update Product by Id Controller */

export const updateProductById = async (req, res, next) => {
  const productId = req.params.id;
  const {
    title,
    description,
    price,
    discountpercentage,
    stock,
    brand,
    category,
    thumbnail,
  } = req.body;

  const response = productValidator({
    title,
    description,
    price,
    discountpercentage,
    stock,
    brand,
    category,
    thumbnail,
  });
  if (response.error)
    return res.status(400).json({ error: "SOME ERROR OCCURED!!" });

  try {

    const product = await Product.findByPk(productId);
    if(!product)
      return res.status(400).json({message: " PRODUCT DOES NOT EXISTS!"});


    product.set({title,description,price,discountpercentage,stock,brand,category,thumbnail});
    const result = await product.save();

    if(!result)
       return res.status(400).json({message:"PRODUCT NOT UPDATED !!"});

    return res.status(200).json({ message: "PRODUCT UPDATED SUCCESSFULLY !!" });

  } catch (error) {
    return next(error);
  }
};
