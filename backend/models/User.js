// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Make googleId optional since we support both OAuth and password auth
    avatar: { type: String, sparse: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
