const mongoose = require("mongoose");

const MemoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 关联用户

    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },

    country: { type: String, required: true }, // 国家
    city: { type: String, required: true }, // 城市

    title: String, // 地点标题
    notes: String, // 笔记
    photos: [String], // 图片 URL 数组
  },
  { timestamps: true }
);

MemoSchema.index({ location: "2dsphere" }); // 地理索引

module.exports = mongoose.model("Memo", MemoSchema);
