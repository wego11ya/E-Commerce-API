const Product = require("../models/Product");

// Unsplash outdoor jacket images
const jacketImages = {
  men: [
    "https://images.unsplash.com/photo-1544441893-675973e31985",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    "https://images.unsplash.com/photo-1578948856697-db91d246b7b8",
    // Add more URLs as needed
  ],
  women: [
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3",
    "https://images.unsplash.com/photo-1525450824786-227cbef70703",
    "https://images.unsplash.com/photo-1555583743-d4140119ca4c",
    // Add more URLs as needed
  ],
  kids: [
    "https://images.unsplash.com/photo-1503919545889-aef636e10ad4",
    "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8",
    "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42",
    // Add more URLs as needed
  ],
};

const categories = ["hiking", "skiing", "climbing"];
const colors = [
  { name: "Midnight Blue", code: "#1B2838" },
  { name: "Forest Green", code: "#228B22" },
  { name: "Charcoal Gray", code: "#36454F" },
  { name: "Deep Red", code: "#8B0000" },
  { name: "Black", code: "#000000" },
];

const generateProduct = (gender, index, userId) => {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const imageUrls = jacketImages[gender.toLowerCase()];
  const imageUrl = `${imageUrls[index % imageUrls.length]}?w=800`;

  const productTypes = {
    hiking: ["Trail", "Mountain", "Alpine", "Explorer", "Summit"],
    skiing: ["Powder", "Slope", "Winter", "Snow", "Arctic"],
    climbing: ["Peak", "Boulder", "Cliff", "Ascent", "Ridge"],
  };

  const type = productTypes[category][Math.floor(Math.random() * 5)];
  const features = ["Waterproof", "Pro", "Elite", "Advanced", "Ultra"];
  const feature = features[Math.floor(Math.random() * features.length)];

  return {
    name: `${type} ${feature} ${
      category.charAt(0).toUpperCase() + category.slice(1)
    } Jacket`,
    price: Math.floor(Math.random() * (300 - 150) + 150),
    description: `Premium ${category} jacket designed for ${gender}'s outdoor adventures. Features advanced waterproof technology with 20,000mm water column rating, fully-sealed seams, and breathable membrane. Equipped with adjustable storm hood, waterproof YKK zippers, and multiple secure pockets. Perfect for extreme weather conditions with excellent wind protection and moisture management. Articulated sleeves for enhanced mobility and pit zips for ventilation.`,
    image: imageUrl,
    gender,
    category,
    variants: colors.slice(0, 3).map((color) => ({
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
    freeShipping: Math.random() < 0.3,
    userId,
  };
};

const seedProducts = async (adminUserId) => {
  const products = [];

  // Generate 20 products for each gender
  ["Men", "Women", "Kids"].forEach((gender) => {
    for (let i = 0; i < 20; i++) {
      products.push(generateProduct(gender, i, adminUserId));
    }
  });

  const createdProducts = await Product.create(products);
  return createdProducts;
};

module.exports = { seedProducts };
