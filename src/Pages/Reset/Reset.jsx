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
  const [selectFile, setSelectFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const userId = localStorage.getItem("userId");

  const handleFileInput = (event) => {
    setSelectFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);

      if (!selectFile) {
        setError("Please select a video file.");
        return;
      }

      // Include userId in the unique file name
      const uniqueFileName = `${userId}-${uuidv4()}-${selectFile.name}`;
      const videoRef = ref(storage, uniqueFileName);

      uploadBytes(videoRef, selectFile, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
       
      })
        .then(() => {
          setSuccessMessage("Video uploaded successfully!");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setError("Error uploading video. Please try again.");
        });
    } catch (error) {
      console.error("Error uploading video:", error);
      setError("Error uploading video. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
              ? uploadProgress < 100
                ? `Uploading Video (${uploadProgress}%)`
                : "Processing, Please wait..."
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
