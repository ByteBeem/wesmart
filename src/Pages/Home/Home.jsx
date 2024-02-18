import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";
import "./Home.scss";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import Modal from "./Modal";
import LoginModal from "./LoginModal"


const Home = () => {
  const { active, closeSidebar } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [textPost, setTextPost] = useState("");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenLogin, setModalOpenLogin] = useState(false);

  const videoRefs = useRef({});

  const stream = localStorage.getItem("stream");

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };


  const handleCloseModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };



  const handleCloseModalLogin = () => {

    setModalOpenLogin(false);
  };

  const fetchPosts = async (pageNumber) => {
    const stream = localStorage.getItem("stream") || "";
   
    try {
      const response = await axios.get(
        `https://wesmart-3b311bc60078.herokuapp.com/posts?page=${pageNumber}`, {
        headers: { Authorization: `Bearer ${stream}` },
      }
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

  const handleTextChange = (e) => {
    setTextPost(e.target.value);
    setCaption(e.target.value);
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

  const handleSubmitText = async (e) => {
    e.preventDefault();
    if (!caption) {
      alert("Enter Something to Post");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setModalOpenLogin(true);
      return;
    }

    try {
      setIsPostLoading(true);

      const postData = {
        caption: caption,
        content_type: "text",
        timestamp: new Date().toISOString(),
        token: token,
        stream: stream,
      };

      await axios.post(
        "https://wesmart-3b311bc60078.herokuapp.com/uploadText",
        postData
      );

      alert("Post Posted!");
      fetchPosts(page);

      setCaption("");
      setImage(null);
      setImagePreview(null);
      setIsPostLoading(false);
      setTextPost("");
    } catch (error) {
      console.error("Error creating post:", error);
      setIsPostLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();



    const token = localStorage.getItem("token");


    if (!token) {
      setModalOpenLogin(true);
      return;
    }

    try {
      setIsPostLoading(true);

      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);

      const imageUrl = await getDownloadURL(imageRef);

      if (!imageUrl) {
        alert("Put Something to Post");
        return;
      }


      const postData = {
        imageUrl: imageUrl,
        timestamp: new Date().toISOString(),
        content_type: "image",
        token: token,
        stream: stream,
      };

      if (caption) {
        postData.caption = caption;
      }

      await axios.post(
        "https://wesmart-3b311bc60078.herokuapp.com/upload",
        postData
      );

      alert("Post Posted");
      fetchPosts(page);

      setCaption("");
      setImage(null);
      setImagePreview(null);
      setIsPostLoading(false);
      setTextPost("");
    } catch (error) {
      console.error("Error creating post:", error);
      setIsPostLoading(false);
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
          <form onSubmit={image ? handleSubmit : handleSubmitText}>
            <textarea
              placeholder="Say Something..."
              value={textPost}
              onChange={handleTextChange}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }}
              />
            )}
            <button type="submit">
              {!isPostLoading ? "Post" : "Posting.."}
            </button>
          </form>
        </div>
        <div className="posts_container">
          {loading ? (
            <p>Loading...</p>
          ) : posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.reverse().map((post) => (
              <div key={post.id} className="post_card">
                {post.content_type === "image" ? (
                  <div>
                    <p>{post.caption}</p>
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                ) : post.content_type === "text" ? (
                  <p>{post.caption}</p>
                ) : (
                  <video
                    ref={(el) => (videoRefs.current[post.id] = el)}
                    src={post.content}
                    controls={true}
                    autoPlay={false}
                    muted={false}
                    loop={true}
                  />
                )}
                <button
                  className="answer_button"
                  onClick={() => handleOpenModal(post.id)}
                >
                  Comments
                </button>
              </div>
            ))
          )}
        </div>

      </div>

      {modalOpen && selectedPost && (
        <>
          <Modal onClose={handleCloseModal} exampleAnswers={["No Comments Yet"]} postId= {selectedPost} />
          <button onClick={handleCloseModal}>Close</button>
        </>
      )}

      {modalOpenLogin && (
        <>
          <LoginModal onClose={handleCloseModalLogin} />
          <button onClick={handleCloseModalLogin}>Close</button>
        </>
      )}

    </div>
  );
};

export default Home;
