const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide a rating between 1 and 5"],
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
      required: [true, "Please provide a title for the review"],
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment for the review"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
// only one review per user per product
ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: { productId: productId },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Product").findByIdAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.productId);
});
ReviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await this.constructor.calculateAverageRating(this.productId);
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
