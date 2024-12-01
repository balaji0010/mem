// SearchVideos.js
import React, { useState } from "react";
import "./SearchVideos.css";

// Sample video data
const videoData = [
  { id: 1, title: "Funny Meme 1", url: "./assets/videos/meme1.mp4" },
  { id: 2, title: "Funny Meme 2", url: "./assets/videos/meme2.mp4" },
  { id: 3, title: "Funny Meme 3", url: "./assets/videos/meme3.mp4" },
];

const SearchVideos = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter videos based on search query
  const filteredVideos = videoData.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-videos">
      <h1>Search Videos</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search for videos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="video-list">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div key={video.id} className="video-card">
              <video className="video-player" controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h4>{video.title}</h4>
            </div>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchVideos;
