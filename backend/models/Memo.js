const mongoose = require("mongoose");

const MemoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },

    country: { type: String, required: true },
    city: { type: String, required: true },
    title: String,
    notes: String,
    photos: [String],
  },
  { timestamps: true }
);

MemoSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Memo", MemoSchema);
