const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
const port = 3000;

const dotenv = require("dotenv");
dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello Spirits! This is the Backend calling!" });
});

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});

const User = require("./models/User");
const Memo = require("./models/Memo");

// 新增用户
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 查询所有用户
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/memos", async (req, res) => {
  try {
    const memo = new Memo(req.body);
    await memo.save();
    res.json(memo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/memos", async (req, res) => {
  const memos = await Memo.find().populate("user");
  res.json(memos);
});
