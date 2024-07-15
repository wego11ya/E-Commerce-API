const Review = require("../models/Review");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const createReview = async (req, res) => {
  res.send("Create Review");
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
