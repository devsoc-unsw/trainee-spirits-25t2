const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const port = 3000;

const dotenv = require("dotenv");
dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ message: "Hello Spirits! This is the Backend calling!" });
});

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});

const User = require("./models/User");
const Memo = require("./models/Memo");

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Add a new user to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               googleId:
 *                 type: string
 *                 example: "1234567890"
 *               name:
 *                 type: string
 *                 example: "Alice"
 *               email:
 *                 type: string
 *                 example: "alice@example.com"
 *               avatar:
 *                 type: string
 *                 example: "https://example.com/avatar.png"
 *     responses:
 *       200:
 *         description: User created successfully
 */
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 */
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @openapi
 * /memos:
 *   post:
 *     summary: Create a new memo
 *     description: Add a new travel memo with location, notes, and photos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: "66f123abc456def789012345"
 *               location:
 *                 type: object
 *                 properties:
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     example: [139.6917, 35.6895]
 *               country:
 *                 type: string
 *                 example: "Japan"
 *               city:
 *                 type: string
 *                 example: "Tokyo"
 *               title:
 *                 type: string
 *                 example: "Tokyo Tower"
 *               notes:
 *                 type: string
 *                 example: "Beautiful night view!"
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://cdn.mymemo.com/tokyo.jpg"]
 *     responses:
 *       200:
 *         description: Memo created successfully
 */
app.post("/memos", async (req, res) => {
  try {
    const memo = new Memo(req.body);
    await memo.save();
    res.json(memo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /memos:
 *   get:
 *     summary: Get all memos
 *     description: Retrieve a list of all travel memos, with user info populated
 *     responses:
 *       200:
 *         description: A list of memos
 */
app.get("/memos", async (req, res) => {
  const memos = await Memo.find().populate("user");
  res.json(memos);
});
