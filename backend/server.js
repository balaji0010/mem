const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require('path');
const videoRoutes = require("./routes/videoRoutes");
const cors = require('cors');

const app = express(); 
app.use(cors());
app.use(express.json());
app.use('/videos', express.static(path.join(__dirname, 'videos')));
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});





// Routes
app.use("/api/videos", videoRoutes);
app.use("/api/admin", videoRoutes);
app.get("/", (req, res) => {
  res.send("<h1>API is running</h1>");
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
