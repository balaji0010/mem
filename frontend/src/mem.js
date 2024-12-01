import React, { useState } from "react";
import "./mem.css";
import Bg from "./Assets/Bg.jpg";
import { useEffect } from "react";

const MemeVideoDownloader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [memeVideos, setMemeVideos] = useState([]); 

  useEffect(() => {
    const fetchMemeVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/videos");
        if (response.ok) {
          const data = await response.json();
          setMemeVideos(data); 
        } else {
          console.error("Failed to fetch meme videos");
        }
      } catch (error) {
        console.error("Error fetching meme videos:", error);
      }
    };

    fetchMemeVideos();
  }, []); 

  const filteredVideos = memeVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = async (url, title, id) => {
    setLoadingId(id);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const blobURL = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobURL;
      link.download = `${title}.mp4`;
      link.click();

      window.URL.revokeObjectURL(blobURL);
    } catch (error) {
      alert("Failed to download the video. Please try again.");
      console.error("Error downloading the video:", error);
    }
    setLoadingId(null);
  };

  return (
    <div className="video-gallery">
      <h2>Meme Video Gallery</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="video-grid">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div key={video.id} className="video-card">
              <video className="video-player" controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h4>{video.title || "Untitled Video"}</h4>
              <button
                onClick={() => handleDownload(video.url, video.title, video.id)}
                disabled={loadingId === video.id}
                className={`download-button ${
                  loadingId === video.id ? "loading" : ""
                }`}
              >
                {loadingId === video.id ? "Downloading..." : "Download"}
              </button>
            </div>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default MemeVideoDownloader;
