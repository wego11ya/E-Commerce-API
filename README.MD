# E-Commerce API Introduction

This E-Commerce API project serves as the backend for an e-commerce platform. The API is built using Node.js and Express, providing a robust and scalable solution for managing product data, user authentication, and order processing. MongoDB is used as the database, and Mongoose is utilized for object data modeling (ODM). The project is structured to handle various e-commerce functionalities, including product listing, user authentication (registration, login, and logout), and managing customer orders. The API also includes security enhancements like rate limiting and sanitization to prevent common vulnerabilities.

# DB Schema Diagram

![E-Commerce API DB Schema Diagram](/public/E-Commerce%20API%20DB%20Schema%20Diagram.png)

# System Architecture

![System Architecture](/public/E-Commerce%20API%20System%20Architecture.png)

# Product Features

- User Authentication: Secure login and registration with JWT-based authentication.

- Product Management: Admin users can create, update, delete, and manage product listings.

- Order Management: Customers can place orders for products, and admin users can manage these orders.

- Product Reviews: Customers can leave reviews for products, helping other users make informed decisions.

- Image Uploads: Cloudinary integration allows admins to upload and manage product images.

- Security: Features like input sanitization, rate limiting, and data validation ensure a secure API.

# Install Locally

1. Install Node.js, npm, nodemon.
2. Clone this project to your local repository
3. Change directory to project folder
4. Install npm packages `npm install`
5. Create a .env file based on the instruction of .env.example
6. Run project `npm run start`
7. You will see this message when the project has been successfully executed

   ```
   Server is listening on port 3000
   ```

# Developer

### [Wei Lin](https://github.com/wego11ya)
