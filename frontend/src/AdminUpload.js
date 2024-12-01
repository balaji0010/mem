import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminUpload = () => {
  const [authenticated, setAuthenticated] = useState(false); // Track authentication
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");

  // Handle login check
  const handleLogin = () => {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");

    const adminUsername = process.env.REACT_APP_ADMIN_USERNAME;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
      setAuthenticated(true); // Grant access
    } else {
      alert("Invalid credentials. Redirecting to homepage...");
      window.location.href = "http://localhost:3000/"; // Redirect if invalid
    }
  };

  useEffect(() => {
    handleLogin();
  }, []); // Ensure it runs only once when the component mounts

  const handleVideoUpload = async (e) => {
    e.preventDefault();

    if (!video) {
      setMessage("Please select a video file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", video);

    try {
      const response = await axios.post("http://localhost:5000/api/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(`Video uploaded successfully: ${response.data.video.title}`);
    } catch (error) {
      console.error(error);
      setMessage("Failed to upload video. Please try again.");
    }
  };

  // Only show the admin upload form if authenticated
  if (!authenticated) {
    return null;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Admin Video Upload</h1>
      <form onSubmit={handleVideoUpload}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="title">Video Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="video">Select Video:</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
            style={{ marginTop: "10px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Upload Video
        </button>
      </form>
      {message && <p style={{ marginTop: "20px", color: "green" }}>{message}</p>}
    </div>
  );
};

export default AdminUpload;
