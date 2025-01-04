const bcrypt = require("bcryptjs");
const User = require("../models/User");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "12345678",
    role: "admin",
  },
  {
    name: "John Smith",
    email: "user1@example.com",
    password: "12345678",
    role: "user",
  },
  {
    name: "Emma Wilson",
    email: "user2@example.com",
    password: "12345678",
    role: "user",
  },
  {
    name: "Michael Chen",
    email: "user3@example.com",
    password: "12345678",
    role: "user",
  },
  {
    name: "Sarah Johnson",
    email: "user4@example.com",
    password: "12345678",
    role: "user",
  },
  {
    name: "David Brown",
    email: "user5@example.com",
    password: "12345678",
    role: "user",
  },
  {
    name: "Lisa Anderson",
    email: "user6@example.com",
    password: "12345678",
    role: "user",
  },
  {
    name: "James Wilson",
    email: "user7@example.com",
    password: "12345678",
    role: "user",
  },
  {
    name: "Emily Davis",
    email: "user8@example.com",
    password: "12345678",
    role: "user",
  },
  {
    name: "Robert Taylor",
    email: "user9@example.com",
    password: "12345678",
    role: "user",
  },
  {
    name: "Maria Garcia",
    email: "user10@example.com",
    password: "12345678",
    role: "user",
  },
];

const seedUsers = async () => {
  // Create users in database - password hashing will be handled by the User model's pre-save hook
  const createdUsers = await User.create(users);
  return createdUsers;
};

module.exports = { seedUsers };
