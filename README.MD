# E-Commerce API Introduction

This E-Commerce API project serves as the backend for an e-commerce platform. The API is built using Node.js and Express, providing a robust and scalable solution for managing product data, user authentication, and order processing. MongoDB is used as the database, and Mongoose is utilized for object data modeling (ODM). The project is structured to handle various e-commerce functionalities, including product listing, user authentication (registration, login, and logout), and managing customer orders. The API also includes security enhancements like rate limiting and sanitization to prevent common vulnerabilities.

## 🔗 Backend API - Fully Developed & Ready to Use

The backend API is **completely developed** and operational with all e-commerce functionalities implemented. You can:

- **Live API**: Access the API at [http://54.199.131.100:3000](http://54.199.131.100:3000)
- **Explore & Test the API**: Visit my interactive Swagger UI documentation at [https://e-commerce-backend-s1h1.onrender.com/api-docs](https://e-commerce-backend-s1h1.onrender.com/api-docs) (Note: Currently using Render documentation URL while AWS Swagger integration is being configured)
- **Try All Endpoints**: Use the Swagger interface to test all available endpoints with the test accounts provided below

## Deployment

This API is deployed using Docker containers with AWS ECR and ECS:

1. Docker image is built and pushed to AWS ECR (Elastic Container Registry)
2. Application is deployed as a service on AWS ECS (Elastic Container Service)
3. The service runs on a Fargate cluster for serverless container management
4. Currently accessible at: [http://54.199.131.100:3000](http://54.199.131.100:3000)

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Image Storage**: Cloudinary
- **Payment Processing**: Stripe API
- **Containerization**: Docker
- **Deployment**: AWS ECR, AWS ECS

## System Architecture

![System Architecture](/public/E-Commerce%20API%20System%20Architecture.png)

## Database Schema

![DB Schema Diagram](/public/E-Commerce%20API%20DB%20Schema%20Diagram.png)

## ✨ Key Features

### Authentication

- User registration and login
- JWT-based authentication
- Role-based authorization (Admin/User)

### Products

- CRUD operations for products
- Advanced filtering and search
- Image upload via Cloudinary
- Product reviews and ratings

### Reviews

- Create product reviews (one review per user per product)
- Read all reviews or single review details
- Update user's own reviews (rating, title, comment)
- Delete user's own reviews
- View reviews for specific products
- Automatic product rating calculation

### Orders

- Order creation and management
- Payment processing with Stripe
- Order status tracking
- Order history

### Users

- User profile management
- Password updates
- Admin user management

## 🚀 Local Development Setup

### Prerequisites

- Node.js
- npm
- MongoDB

### Setup

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

### Docker Development

1. Build the Docker image: `docker build -t e-commerce-api .`
2. Run the container: `docker run -p 3000:3000 e-commerce-api`

## 🔑 Test Accounts

### Administrator

```
email: admin@example.com
password: 12345678
```

### Regular User

```
email: user1@example.com
password: 12345678
```

## 👨‍💻 Developer

### [Wei Lin](https://github.com/wego11ya)
