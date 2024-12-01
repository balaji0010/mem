require("dotenv").config();
const mongoose = require("mongoose");
const Video = require("./models/video"); // Import your video model

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Data to seed
const seedVideos = [
  { title: "Jack Sparrow", url: "http:localhost:5000/videos/1.mp4" },
  { title: "Funny Meme 2", url: "https://path/to/meme2.mp4" },
  { title: "Funny Meme 3", url: "https://path/to/meme3.mp4" },
  { title: "Funny Meme 4", url: "https://path/to/meme4.mp4" },
  { title: "Funny Meme 5", url: "https://path/to/meme5.mp4" },
];

// Seed function
const seedDatabase = async () => {
  try {
    // Delete all existing documents in the collection (optional)
    await Video.deleteMany({});
    console.log("Existing videos deleted");

    // Insert new seed data
    await Video.insertMany(seedVideos);
    console.log("Database seeded with meme videos");

    // Close the database connection
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.connection.close();
  }
};

// Call the seed function
seedDatabase();
