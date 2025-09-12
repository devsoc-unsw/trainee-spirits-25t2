require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// Routers
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const memoRoutes = require("./routes/memos");

const app = express();
const port = process.env.PORT || 3000;

// CORS
const allowedOrigins = process.env.CLIENT_URL.split(",");
app.use(
  cors({
    origin: allowedOrigins, // e.g. http://localhost:5173
    credentials: true,
  })
);

console.log("CORS origin:", process.env.CLIENT_URL);


// Connect to MongoDB
connectDB();

// Parse JSON request bodies
app.use(express.json());


// Sessions (cookie-based)
app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/auth", authRoutes); // /auth/register, /auth/login, /auth/me, /auth/logout
app.use("/users", userRoutes);
app.use("/memos", memoRoutes);

// Health check
app.get("/", (_req, res) => {
  res.json({ message: "Hello Spirits! Backend is up." });
});

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});

module.exports = app;
