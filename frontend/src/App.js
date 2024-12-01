import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import MemeVideoDownloader from "./mem";
import AdminUpload from "./AdminUpload"; // Import the AdminUpload component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar is displayed on all pages */}
        <Routes>
          {/* Main route for MemeVideoDownloader */}
          <Route path="/" element={<MemeVideoDownloader />} />
          
          {/* Separate route for Admin Upload */}
          <Route path="/admin/upload" element={<AdminUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
