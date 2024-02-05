import React, { useState, useEffect } from "react";
import "./Profile.scss";
import "../../App.scss";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";

function Profile({ showSidebar, active, closeSidebar }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setIsLoading(true);
    setError(null); 

    
    axios.get(`https://mainp-server-c7a5046a3a01.herokuapp.com/search/${encodeURIComponent(searchQuery)}`)
        .then(response => {
            setVideos(response.data);
        })
        .catch(err => {
            setError("Something went wrong ,check your Video ID.");
        })
        .finally(() => {
            setIsLoading(false);
        });
};


  return (
    <div className="profile">
      <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
      <div className="profile-content">
        <div className="search-area">
          <input
            type="text"
            placeholder="Enter Requested Video ID here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        <div className="videos_container">
        <div className="video-list">
          {videos.map(video => (
            <div key={video.id} className="video_card">
            <video
              id={`video-${video.id}`}
              src={video.video}
              controls={true}
              autoPlay={false}
              muted={false}
              loop={true}
              
            />
          </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
