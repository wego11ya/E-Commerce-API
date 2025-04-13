const mongoose = require("mongoose");
require("dotenv").config();

const { seedUsers } = require("./userSeeder");
const { seedProducts } = require("./productSeeder");
const { seedReviews } = require("./reviewSeeder");

const User = require("../models/User");
const Product = require("../models/Product");
const Review = require("../models/Review");

const seedDatabase = async () => {
  try {
    // Connect to MongoDB using MONGO_URI instead of MONGO_URL
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    console.log("Cleared existing data...");

    // Seed users
    const users = await seedUsers();
    console.log("Users seeded successfully");

    // Seed products (using admin user ID)
    const adminUser = users[0]; // First user is admin
    const products = await seedProducts(adminUser._id);
    console.log("Products seeded successfully");

    // Seed reviews
    await seedReviews(users.slice(1), products); // Exclude admin from reviews
    console.log("Reviews seeded successfully");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
