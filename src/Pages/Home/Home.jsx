import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";
import "./Home.scss";

const Home = () => {
  const { active, closeSidebar } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePostId, setActivePostId] = useState("");
  const [page, setPage] = useState(3);

  const fetchVideos = async (pageNumber) => {
    try {
      const response = await axios.get(
        `https://mainp-server-c7a5046a3a01.herokuapp.com/videos?page=${pageNumber}`
      );
      const data = response.data;

      if (pageNumber === 1) {
        setVideos(data);
        setActivePostId(data.length > 0 ? data[0].id : "");
      } else {
        setVideos((prevVideos) => [...prevVideos, ...data]);
      }
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  return (
    <div className="home">
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <div className="home_container">

        
          <div className="videos-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="videos">
                {videos.map((video) => (
                  <div key={video.id} className="video-item">
                    <video
                      controls
                      width="100%"
                      height="200"
                      autoPlay={video.id === activePostId}
                    >
                      <source src={video.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <p>{video.title}</p>
                  </div>
                ))}
              </div>
            )}
         
        </div>
      </div>
    </div>
  );
};

export default Home;
