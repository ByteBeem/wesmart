import React, { useState } from "react";
import "./Reset.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

function Reset({ active, closeSidebar }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const userId = localStorage.getItem("userId");

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!selectedFile) {
      setError("Please select a video file.");
      setIsLoading(false);
      return;
    }

    // Include userId in the unique file name
    const uniqueFileName = `${userId}-${uuidv4()}-${selectedFile.name}`;
    const videoRef = ref(storage, uniqueFileName);

    uploadBytes(videoRef, selectedFile)
      .then(() => {
        setSuccessMessage("Video uploaded successfully!");
      })
      .catch((uploadError) => {
        setError(`Upload failed: ${uploadError.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="reset">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="reset_container">
        <div className="content">
          <h1>Upload Video</h1>
          <input type="file" onChange={handleFileInput} />
          <button onClick={handleUpload} disabled={isLoading}>
            {isLoading
              ? "Processing, Please wait..."
              : "Upload Video"}
          </button>
          {error && <p className="error-message">Error: {error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reset;
