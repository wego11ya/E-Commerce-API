const Review = require("../models/Review");

const reviewTitles = [
  "Great outdoor jacket!",
  "Perfect for extreme weather",
  "Excellent quality and fit",
  "Impressive performance",
  "Worth every penny",
  "Highly recommended",
  "Amazing durability",
  "Superior protection",
  "Best jacket I own",
  "Outstanding quality",
];

const reviewComments = [
  "This jacket exceeded my expectations. The waterproofing is excellent and it keeps me warm in harsh conditions.",
  "Perfect fit and great functionality. All the pockets are well placed and the hood is fully adjustable.",
  "The quality of materials and construction is outstanding. Definitely worth the investment.",
  "Used this jacket in heavy rain and strong winds - performed flawlessly. Very impressed with the weather protection.",
  "The breathability is excellent during high-intensity activities. No overheating issues at all.",
  "Love the design and functionality. The zippers are smooth and the jacket looks great.",
  "This jacket has become my go-to for all outdoor activities. Versatile and reliable.",
  "The attention to detail is impressive. Every feature serves a purpose and works well.",
  "Excellent wind protection and the insulation is perfect for cold weather activities.",
  "The durability is impressive - still looks and performs like new after heavy use.",
];

const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const generateReview = (userId, productId) => ({
  rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
  title: getRandomItem(reviewTitles),
  comment: getRandomItem(reviewComments),
  userId,
  productId,
});

const seedReviews = async (users, products) => {
  const reviews = [];

  // Ensure each product has at least 3 reviews
  products.forEach((product) => {
    // Randomly select 3-5 users for each product
    const numReviews = Math.floor(Math.random() * 3) + 3;
    const shuffledUsers = users.sort(() => 0.5 - Math.random());
    const selectedUsers = shuffledUsers.slice(0, numReviews);

    selectedUsers.forEach((user) => {
      reviews.push(generateReview(user._id, product._id));
    });
  });

  const createdReviews = await Review.create(reviews);
  return createdReviews;
};

module.exports = { seedReviews };
