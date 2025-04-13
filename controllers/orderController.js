const Order = require("../models/Order");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { items: cartItems, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("Cart items cannot be empty");
  }

  if (!shippingFee) {
    throw new CustomError.BadRequestError("Shipping fee is required");
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.productId });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id : ${item.productId}`
      );
    }
    if (!item.variantId) {
      throw new CustomError.BadRequestError(
        `Variant ID is required for product: ${dbProduct.name}`
      );
    }
    if (!item.size) {
      throw new CustomError.BadRequestError(
        `Size is required for product: ${dbProduct.name}`
      );
    }
    if (!item.color || !item.colorCode) {
      throw new CustomError.BadRequestError(
        `Color and color code are required for product: ${dbProduct.name}`
      );
    }

    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      name,
      price,
      image,
      amount: item.amount,
      productId: _id,
      variantId: item.variantId,
      size: item.size,
      color: item.color,
      colorCode: item.colorCode,
    };

    // add item to orderItems
    orderItems.push(singleOrderItem);
    // calculate subtotal
    subtotal += item.amount * price;
  }
  const total = shippingFee + subtotal;
  // get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });
  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    userId: req.user.userId,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.userId);
  res.status(StatusCodes.OK).json({ order });
};
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.userId);

  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
};
