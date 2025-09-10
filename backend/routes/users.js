const express = require("express");
const User = require("../models/User");

const router = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users (admin only)
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/", async (_req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
s;
