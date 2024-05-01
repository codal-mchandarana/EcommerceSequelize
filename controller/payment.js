import Product from "../models/Product.js";

export const accept_payment = async (req, res, next) => {
  const productId = req.params.productId;
  const { method, times, payment_id } = req.body;

  try {
    console.log("Hello")
    const product_detail = await Product.findByPk(productId);

    if (!product_detail)
      return res.status(400).json({ message: "NO PRODUCT FOUND !!" });

    let price = product_detail.dataValues.price;

    if (product_detail.dataValues.discountpercentage)
      price -= price * (product_detail.dataValues.discountpercentage / 100);

    const quantity = times ? times : 1;
    price *= quantity;

    const result = await req.user.createPayment({amount:price, method, product_id:productId, quantity, payment_id})

    if (!result) return res.status(400).json({message:"PAYMENT UNSUCCESSFUL !!"})
  } catch (error) {
    return next(error);
  }

  return res.status(200).json({ message: "PAYMENT SUCCESSFULL !!!" });
};
