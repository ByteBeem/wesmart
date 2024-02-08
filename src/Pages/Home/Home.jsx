import React, { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";
import "./Home.scss";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase"; // Assuming "firebase" is imported as "db" and "storage"

const Home = () => {
  const { active, closeSidebar } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [textPost, setTextPost] = useState("");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleTextChange = (e) => {
    setTextPost(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);

      // Get download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Save caption and image URL to Firestore
      const postsCollectionRef = collection(db, "posts");
      await addDoc(postsCollectionRef, {
        caption: caption,
        imageUrl: imageUrl,
        timestamp: new Date()
      });

      
      setCaption("");
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <div className="home">
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <div className="home_container">
        <div className="post_form">
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Post your questions..."
              value={textPost}
              onChange={handleTextChange}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }} />
            )}
            <button type="submit">Post</button>
          </form>
        </div>
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
