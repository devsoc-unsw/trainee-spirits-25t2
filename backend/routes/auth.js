const express = require("express");
const User = require("../models/User");

const router = express.Router();

/**
 * @openapi
 * /auth/google:
 *   post:
 *     summary: Login or register user via Google OAuth
 *     description: >
 *       This endpoint handles user authentication using Google OAuth.
 *       The frontend sends user information (name, email, avatar) obtained from Firebase Google sign-in.
 *       If the user does not exist in the database, a new user record will be created automatically.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Johnny Zhou"
 *               email:
 *                 type: string
 *                 example: "johnny@gmail.com"
 *               avatar:
 *                 type: string
 *                 example: "https://lh3.googleusercontent.com/a/abc123"
 *     responses:
 *       200:
 *         description: Login successful, returning user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "66f3440b57fbbd00122aab90"
 *                     name:
 *                       type: string
 *                       example: "Johnny Zhou"
 *                     email:
 *                       type: string
 *                       example: "johnny@gmail.com"
 *                     avatar:
 *                       type: string
 *                       example: "https://lh3.googleusercontent.com/a/abc123"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Missing email field in request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email is required"
 *       500:
 *         description: Server error while processing login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.post("/google", async (req, res) => {
  try {
    // Extract user info from request body
    const { name, email, avatar } = req.body;

    // Email is required (Google always returns it)
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find existing user by email
    let user = await User.findOne({ email });

    // If not found, create a new one
    if (!user) {
      user = new User({ name, email, avatar });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return success response
    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
