const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxLength: [100, "Name cannot be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxLength: [1000, "Description cannot be more than 1000 characters"],
    },
    image: {
      type: String,
      required: [true, "Please provide product image"],
    },
    gender: {
      type: String,
      required: [true, "Please provide product gender"],
      enum: {
        values: ["Men", "Women", "Kids"],
        message: "{VALUE} is not a valid gender category",
      },
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: {
        values: [
          "hiking",
          "skiing",
          "climbing",
          "running",
          "cycling",
          "casual",
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    variants: [
      {
        color: {
          type: String,
          required: [true, "Please provide color"],
        },
        colorCode: {
          type: String,
          required: [true, "Please provide color code (hex)"],
          match: [
            /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            "Please provide valid hex color code",
          ],
        },
        sizes: [
          {
            size: {
              type: String,
              required: [true, "Please provide size"],
              enum: {
                values: ["XS", "S", "M", "L", "XL", "XXL"],
                message: "{VALUE} is not a valid size",
              },
            },
            inventory: {
              type: Number,
              required: [true, "Please provide inventory amount"],
              min: [0, "Inventory cannot be negative"],
              default: 0,
            },
          },
        ],
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
  justOne: false,
});

ProductSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await this.model("Review").deleteMany({ productId: this._id });
    next();
  }
);

module.exports = mongoose.model("Product", ProductSchema);
