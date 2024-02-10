import React, { useState, useEffect , useRef} from "react";
import "./Profile.scss";
import "../../App.scss";
import axios from "axios";
import Modal from "../Home/Modal";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserProfile from "../../assets/smart.jpg";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import LoginModal from "../Home/LoginModal"


function Profile({ showSidebar, active, closeSidebar }) {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});
  const [modalOpenLogin, setModalOpenLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); 
  const videoRefs = useRef({});

  const fullName = userData.name;
  const cellphone = userData.cell;

  
  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  
  const handleCloseModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };


  const fetchPosts = async (token) => {
    try {
      const response = await axios.get(
        `https://wesmart-3b311bc60078.herokuapp.com/Userposts`,{
            headers: { Authorization: `Bearer ${token}` },
      }
      );
      const data = response.data;

      if (data) {
        setPosts(data);
      } 
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseModalLogin = () => {
    
    setModalOpenLogin(false);
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token" , token);

    if (!token) {
        setModalOpenLogin(true);
        return; 
      }
  
    if (token) {
      setLoading(true); 
  
      axios
        .get("https://wesmart-3b311bc60078.herokuapp.com/getUserData", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const info = response.data;
          if (info !== undefined) {
            setUserData(info); 
          }
        })
        .catch((error) => {
         
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoading(false); 
        });
    }
    fetchPosts(token);
  }, []); 
  

 

  

  return (
    <div className="profile">
      {loading && (
        <div className="overlay">
          <FiLoader className="loading-spinner" />
        </div>
      )}
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="profile_container">
       

        <div className="top">
          <div className="user_info">
            <div className="profile_pic">
              <img src={UserProfile} alt="" />
            </div>

            <div className="text">
              <span>Fullname:</span>
              <div className="text_item">{fullName}</div>


              <span>Phone:</span>
              <div className="text_item">{cellphone}</div>
            </div>
          </div>
        </div>

        <Link className="form_btn" to="#">
          Change Password
        </Link>

        <Link className="form_btn" to="#">
          Delete Account
        </Link>
      </div>

      <div className="posts_section">
        {loading ? (
          <div className="overlay">
            <FiLoader className="loading-spinner" />
          </div>
        ) : posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post) => (
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
                onClick={() => handleOpenModal(post)} 
              >
                Answers
              </button>
            </div>
          ))
        )} 
      </div>

      {modalOpen && selectedPost && (
        <>
          <Modal onClose={handleCloseModal} exampleAnswers={["No Answers Yet"]} />
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
}
