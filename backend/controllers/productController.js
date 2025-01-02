const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

const createProduct = async (req, res) => {
  req.body.userId = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const { gender, category, featured, rating } = req.query;
  const queryObject = {};

  // Filter by gender
  if (gender) {
    queryObject.gender = gender;
  }

  // Filter by category
  if (category) {
    queryObject.category = category;
  }

  // Filter by featured
  if (featured === "true") {
    queryObject.featured = true;
  }

  // Filter by rating (exact match)
  if (rating) {
    // Convert rating to a number and create a range for floating point comparison
    const ratingNum = Number(rating);
    queryObject.averageRating = {
      $gte: ratingNum,
      $lt: ratingNum + 1,
    };
  }

  const products = await Product.find(queryObject);

  // Calculate rating counts for all products (不考慮其他篩選條件)
  const allProducts = await Product.find(gender ? { gender } : {});
  const ratingCounts = allProducts.reduce((acc, product) => {
    const rating = Math.floor(product.averageRating);
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  res.status(StatusCodes.OK).json({
    products,
    count: products.length,
    ratingCounts, // 添加評分統計信息
  });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate("reviews");
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  await product.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

const uploadImage = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  if (!req.files) {
    throw new CustomError.BadRequestError("Please upload a file");
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an image file");
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload an image less than 1MB"
    );
  }
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  // update the product with the image url
  product.image = result.secure_url;
  await product.save();
  // delete the temp file
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
