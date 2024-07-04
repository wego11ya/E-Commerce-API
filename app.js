require("dotenv").config();
// express server
const express = require("express");
const app = express();

// database connection
const connectDB = require("./db/connect");

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
