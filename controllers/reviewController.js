const Review = require("../models/Review");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createReview = async (req, res) => {
  const { productId } = req.body;
  const isValidProduct = await Product.findById(productId);
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  const alreadyReviewed = await Review.findOne({
    productId,
    userId: req.user.userId,
  });
  if (alreadyReviewed) {
    throw new CustomError.BadRequestError(
      "You have already reviewed this product"
    );
  }
  req.body.userId = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};
const getAllReviews = async (req, res) => {
  res.send("Get All Reviews");
};
const getSingleReview = async (req, res) => {
  res.send("Get Single Review");
};
const updateReview = async (req, res) => {
  res.send("Update Review");
};
const deleteReview = async (req, res) => {
  res.send("Delete Review");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
