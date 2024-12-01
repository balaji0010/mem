const express = require("express");
const router = express.Router();
const Video = require("../models/video");
const upload = require("../middlewares/multe"); // Import Multer configuration

// Get all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find(); // Fetch all video metadata
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching videos", error: err });
  }
});

// Download a video
router.get("/download/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    res.redirect(video.url); // Redirect the user to the video URL for download
  } catch (err) {
    res.status(500).json({ message: "Error downloading video", error: err });
  }
});

router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No video file provided." });
    }

    // Extract the title from the request body
    const { title } = req.body;

    // Validate the title
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required." });
    }

    // Construct the video URL
    const videoUrl = `${req.protocol}://${req.get("host")}/videos/${req.file.filename}`;

    // Create a new Video document
    const newVideo = new Video({ title, url: videoUrl });

    // Save the document to the database
    await newVideo.save();

    // Respond with success
    res.status(201).json({
      message: "Video uploaded successfully.",
      video: newVideo,
    });
  } catch (error) {
    console.error("Error uploading video:", error.message);
    res.status(500).json({ message: "Failed to upload video." });
  }
});

module.exports = router;
