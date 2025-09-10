const express = require("express");
const Memo = require("../models/Memo");

const router = express.Router();

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
router.post("/", async (req, res) => {
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
router.get("/", async (_req, res) => {
  try {
    const memos = await Memo.find().populate("user");
    res.json(memos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
