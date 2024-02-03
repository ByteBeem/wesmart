import React, { useState, useEffect } from "react";
import "./Reset.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios"; // Import Axios for making HTTP requests

function Reset({ active, closeSidebar }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const uploadVideo = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);

      if (!videoFile) {
        setError("Please select a video file.");
        return;
      }

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("video", videoFile);

      const response = await axios.post(
        "https://vista-server-b8e2152f15cf.herokuapp.com/upload-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSuccessMessage("Video uploaded successfully!");
      } else {
        setError("Error uploading video. Please try again.");
      }
    } catch (error) {
      setError("Error uploading video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Video File:", videoFile);
  }, [videoFile]);

  return (
    <div className="reset">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="reset_container">
        <div className="content">
          <h1>Upload Video</h1>
          <input type="file" onChange={handleChange} />
          <button onClick={uploadVideo} disabled={isLoading}>
            {isLoading ? "Uploading Video..." : "Upload Video"}
          </button>
          {error && <p className="error-message">Error: {error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Reset;
