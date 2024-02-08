import React, { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";
import "./Home.scss";

const Home = () => {
  const { active, closeSidebar } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const videoRefs = useRef({});

  const fetchPosts = async (pageNumber) => {
    try {
      const response = await axios.get(
        `https://mainp-server-c7a5046a3a01.herokuapp.com/posts?page=${pageNumber}`
      );
      const data = response.data;

      if (pageNumber === 1) {
        setPosts(data);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleVideoView = useCallback(
    async (postId) => {
      // You can define the logic for handling video view here
      // For now, I'm just logging the postId
      console.log("Video view for post:", postId);
    },
    []
  );

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <div className="home">
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <div className="home_container">
        <div className="posts_container">
          {loading ? (
            <p>Loading...</p>
          ) : posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post_card">
                {post.content_type === "image" ? (
                  <img src={post.content} alt="Post" />
                ) : post.content_type === "text" ? (
                  <p>{post.content}</p>
                ) : (
                  <video
                    ref={(el) => (videoRefs.current[post.id] = el)}
                    src={post.content}
                    controls={true}
                    autoPlay={false}
                    muted={false}
                    loop={true}
                    onPlay={() => handleVideoView(post.id)}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
