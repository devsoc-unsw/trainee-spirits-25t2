const express = require("express");
const Memo = require("../models/Memo");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();
console.log("✅ memos.js loaded");

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
router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const memoData = {
      ...req.body,
      user: userId, //
    };
    const memo = new Memo(memoData);
    await memo.save();
    res.json(memo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /memos/{id}:
 *   delete:
 *     summary: Delete a memo by ID
 *     description: Delete a specific memo that belongs to the authenticated user.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the memo to delete
 *         schema:
 *           type: string
 *           example: 671255be8f40cc00cf7e68a4
 *     responses:
 *       200:
 *         description: Memo deleted successfully
 *       403:
 *         description: Not authorized to delete this memo
 *       404:
 *         description: Memo not found
 */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const memoId = req.params.id;
    const userId = req.user.id; // from verifyToken middleware

    const memo = await Memo.findById(memoId);
    if (!memo) {
      return res.status(404).json({ error: "Memo not found" });
    }

    if (memo.user.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this memo" });
    }

    await memo.deleteOne();
    res.json({ message: "✅ Memo deleted successfully", id: memoId });
  } catch (err) {
    console.error("❌ Error deleting memo:", err);
    res.status(500).json({ error: err.message });
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
router.get("/", verifyToken, async (req, res) => {
  try {
    const memos = await Memo.find({ user: req.user.id })
      .populate("user", "name email avatar")
      .sort({ createdAt: -1 });
    res.json(memos);
  } catch (err) {
    console.error("❌ Error fetching memos:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
