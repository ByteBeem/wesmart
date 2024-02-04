import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";
import "./Home.scss";

const Home = () => {
  const { active, closeSidebar } = useAuth();
  const [userVideos, setUserVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(3);

  const fetchVideos = async (pageNumber) => {
    try {
      const response = await axios.get(
        `https://mainp-server-c7a5046a3a01.herokuapp.com/videos?page=${pageNumber}`
      );
      const data = response.data;

      if (pageNumber === 1) {
        setUserVideos(data);
      } else {
        setUserVideos((prevVideos) => [...prevVideos, ...data]);
      }
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleVideoView = async (videoId) => {
    let startTime = Date.now();

    const videoElement = document.getElementById(`video-${videoId}`);

    const handleTimeUpdate = () => {
      const currentTime = videoElement.currentTime;
      if (currentTime >= 10) {
        axios.post(`https://mainp-server-c7a5046a3a01.herokuapp.com/videos/${videoId}/views`);
        console.log(videoId);
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    const handleVideoEnd = () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };

    videoElement.addEventListener("ended", handleVideoEnd);
    videoElement.addEventListener("pause", handleVideoEnd);

    // Update the local state or perform any additional actions if needed
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  return (
    <div className="home">
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <div className="home_container">
        <div className="videos_container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            userVideos.map((video) => (
              <div key={video.id} className="video_card">
                <video
                  id={`video-${video.id}`}
                  src={video.video}
                  controls={true}
                  autoPlay={false}
                  muted={false}
                  loop={true}
                  onPlay={() => handleVideoView(video.id)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
