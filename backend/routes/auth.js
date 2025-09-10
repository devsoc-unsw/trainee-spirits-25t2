// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// helper: pick safe fields to return
const pickUser = (u) =>
  u ? { _id: u._id, name: u.name, email: u.email, avatar: u.avatar } : null;

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register with email & password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: "Alice" }
 *               email: { type: string, example: "alice@example.com" }
 *               password: { type: string, example: "secret123" }
 *     responses:
 *       200: { description: Registered successfully }
 *       409: { description: Email already exists }
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "name, email and password are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const existed = await User.findOne({ email });
    if (existed) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    // auto login after register (optional)
    req.session.userId = user._id.toString();

    return res.json({ ok: true, user: pickUser(user) });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login with email & password (session-based)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "alice@example.com" }
 *               password: { type: string, example: "secret123" }
 *     responses:
 *       200: { description: Logged in }
 *       401: { description: Invalid email or password }
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
      return res.status(401).json({ error: "Invalid email or password" });

    req.session.userId = user._id.toString();
    return res.json({ ok: true, user: pickUser(user) });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Get current logged-in user
 *     responses:
 *       200: { description: Current user (or null if not logged in) }
 */
router.get("/me", async (req, res) => {
  try {
    const id = req.session.userId;
    if (!id) return res.json({ user: null });
    const user = await User.findById(id);
    return res.json({ user: pickUser(user) });
  } catch (err) {
    console.error("Me error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout current session
 *     responses:
 *       200: { description: Logged out }
 */
router.post("/logout", (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      return res.json({ ok: true });
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
