const Product = require("../models/Product");
const productImages = require("../mockData/productImages");
const productColors = require("../mockData/productColors");
const productNames = require("../mockData/productNames");

const categories = ["hiking", "skiing", "climbing", "running", "cycling"];

const generateProduct = (gender, index, userId) => {
  const category = categories[index % categories.length];
  const imageUrls = productImages[gender.toLowerCase()];
  const imageUrl = `${imageUrls[index % imageUrls.length]}?w=800`;

  // Get a unique product name for this category
  const productName =
    productNames[category][index % productNames[category].length];

  return {
    name: productName,
    price: Math.floor(Math.random() * (300 - 150) + 150),
    description: `Premium ${category} jacket designed for ${gender}'s outdoor adventures. Features advanced waterproof technology with 20,000mm water column rating, fully-sealed seams, and breathable membrane. Equipped with adjustable storm hood, waterproof YKK zippers, and multiple secure pockets. Perfect for extreme weather conditions with excellent wind protection and moisture management. Articulated sleeves for enhanced mobility and pit zips for ventilation.`,
    image: imageUrl,
    gender,
    category,
    variants: productColors.map((color) => ({
      color: color.name,
      colorCode: color.code,
      sizes: [
        { size: "S", inventory: Math.floor(Math.random() * 20) + 10 },
        { size: "M", inventory: Math.floor(Math.random() * 30) + 15 },
        { size: "L", inventory: Math.floor(Math.random() * 25) + 10 },
        { size: "XL", inventory: Math.floor(Math.random() * 20) + 5 },
      ],
    })),
    featured: Math.random() < 0.2,
    userId,
  };
};

const seedProducts = async (adminUserId) => {
  const products = [];

  // Generate products for each gender
  ["Men", "Women", "Kids"].forEach((gender) => {
    // Generate enough products to cover all categories
    for (let i = 0; i < categories.length * 3; i++) {
      products.push(generateProduct(gender, i, adminUserId));
    }
  });

  const createdProducts = await Product.create(products);
  return createdProducts;
};

module.exports = { seedProducts };
