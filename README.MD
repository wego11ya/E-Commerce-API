# E-Commerce Project (Backend Fully Developed, Frontend In Development)

A full-stack e-commerce clothing platform built with Next.js frontend and Node.js/Express.js backend. Features include user authentication, product management, shopping cart functionality, Stripe payment integration, review system, and comprehensive admin management capabilities.

## 🔗 Backend API - Fully Developed & Ready to Use

The backend API is **completely developed** and operational with all e-commerce functionalities implemented. You can:

- **Explore & Test the API**: Visit my interactive Swagger UI documentation at [https://e-commerce-backend-s1h1.onrender.com/api-docs](https://e-commerce-backend-s1h1.onrender.com/api-docs)
- **Try All Endpoints**: Use the Swagger interface to test all available endpoints with the test accounts provided below

## 🌐 Live Demo (Frontend Under Development)

Visit the live site: https://e-commerce-tau-azure.vercel.app

> **Development Status:**
>
> - **Backend**: ✅ **FULLY DEVELOPED** and operational with complete API functionality
> - **Frontend**: 🚧 Currently in active development. Only the features shown in the screenshots below are implemented.

## 🚀 Tech Stack

### Frontend

- **Framework**: Next.js
- **Styling**: TailwindCSS
- **State Management**: React Context
- **Deployment**: Vercel

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Image Storage**: Cloudinary
- **Payment Processing**: Stripe API
- **Deployment**: Render

## ✨ Key Features

### User Features

- User authentication (login/register)
- Browse products by gender categories
- Filter products by category, rating, and featured status
- Detailed product pages with size/color selection
- Shopping cart management
- Secure checkout with Stripe
- Product reviews and ratings
- Order history tracking

### Admin Features

- Product management (CRUD operations)
- Order management
- User management
- Image upload and management via Cloudinary

## 📸 Screenshots

> **Note**: The following screenshots represent the currently implemented frontend features. While the frontend is still under active development, the backend API fully supports all e-commerce functionalities including user authentication, product management, order processing, reviews CRUD operations and more.

### Home Page

Gender-based product categorization
![Home Page](/frontend/public/readme/E-Commerce%20home%20page.png)

### Login Page

Secure user authentication
![Login Page](/frontend/public/readme/E-Commerce%20login%20page.png.png)

### Products Page

Advanced filtering by Category, Rating, and Featured status
![Products Page](/frontend/public/readme/E-Commerce%20products%20page.png)

### Product Details

Detailed product information with reviews and size/color selection
![Product Page](/frontend/public/readme/E-Commerce%20product%20page.png)

### Shopping Cart

Cart management with quantity adjustment
![Cart Page](/frontend/public/readme/E-Commerce%20cart%20page.png)

## 🏗 System Architecture

![System Architecture](/frontend/public/readme/E-Commerce%20API%20System%20Architecture.png)

## 📊 Database Schema

![DB Schema Diagram](/frontend/public/readme/E-Commerce%20API%20DB%20Schema%20Diagram.png)

## 🛠 API Features

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

### Backend Setup

1. Clone the repository

   ```bash
   git clone [repository-url]
   ```

2. Navigate to backend directory

   ```bash
   cd backend
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Create .env file (based on .env.example)

5. Start the server
   ```bash
   npm run start
   ```

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
