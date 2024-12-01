const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }, // URL where the video is stored
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Video || mongoose.model("Video", VideoSchema);