import React, { useState, useEffect } from "react";
import "./Profile.scss";
import "../../App.scss";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";


function Request({ showSidebar, active, closeSidebar }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="profile">
      <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
      <div className="profile-content">
        
        <div className="search-area">
          <input
            type="text"
            placeholder="Search Videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        
      </div>
    </div>
  );
}

export default Request;
