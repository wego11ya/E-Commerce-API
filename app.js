require("dotenv").config();
require("express-async-errors");
// express server
const express = require("express");
const fs = require("fs");
const yaml = require("js-yaml");
const app = express();

// 引入 Swagger UI Express
const swaggerUi = require("swagger-ui-express");
// Load base OpenAPI document
const baseOpenApiDocument = yaml.load(
  fs.readFileSync("./openapi.yaml", "utf8")
);

// morgan for logging
const morgan = require("morgan");

// cookie parser
const cookieParser = require("cookie-parser");

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// extra security packages
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const { xss } = require("express-xss-sanitizer");
// database connection
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// security middleware
app.set("trust proxy", 1);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 60 }));
app.use(helmet());
app.use(
  xss({
    allowedTags: [],
    allowedAttributes: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script"],
  })
);
app.use(mongoSanitize());
const allowedOrigins = [
  "http://localhost:3000", // 本地開發
  "http://localhost:5000",
  "https://e-commerce-backend-s1h1.onrender.com",
  process.env.FRONTEND_URL, // Render 上的前端 URL（從環境變數讀取）
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} is not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 86400,
  })
);

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
// 當使用者進入 /api-docs 時，呈現 Swagger UI，並動態設置 server URL
app.use(
  "/api-docs",
  (req, res, next) => {
    // Create a copy of the document to avoid modifying the original
    const openapiDocument = JSON.parse(JSON.stringify(baseOpenApiDocument));

    // Get host from request
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;
    const host = req.get("host");
    const baseUrl = `${protocol}://${host}/api/v1`;

    // Add current server to the beginning of the servers array
    openapiDocument.servers.unshift({
      url: baseUrl,
      description: "Current environment",
    });

    req.openapiDocument = openapiDocument;
    next();
  },
  swaggerUi.serve,
  (req, res) => swaggerUi.setup(req.openapiDocument)(req, res)
);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
