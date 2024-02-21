import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Modal.scss";
import { storage } from "./firebase";

const Modal = ({ onClose, postId }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [page, setPage] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments(page, postId);

    document.body.style.overflow = "hidden";
    return () => {

      document.body.style.overflow = "auto";
    };
  }, [page, postId]);

  const fetchComments = async (pageNumber, postId) => {
    try {
      const response = await axios.get(
        `https://wesmart-3b311bc60078.herokuapp.com/comments?page=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${postId}` },
        }
      );
      const data = response.data;

      if (pageNumber === 1) {
        setComments(data);
      } else {
        setComments((prevComments) => [...prevComments, ...data]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
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

  const handleTextChange = (event) => {
    setCaption(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setIsPostLoading(true);
  
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
  
      const imageUrl = await getDownloadURL(imageRef);
  
      if (!imageUrl) {
        alert("Put Something to Post");
        setIsPostLoading(false);
        return;
      }
  
      const postData = {
        imageUrl: imageUrl,
        timestamp: new Date().toISOString(),
        content_type: "image",
        postId: postId,
      };
  
      if (caption) {
        postData.caption = caption;
      }
  
      const response = await axios.post(
        "https://wesmart-3b311bc60078.herokuapp.com/PostComments",
        postData
      );
  
      alert("Comment Posted!");
      
     
      setComments(prevComments => [response.data, ...prevComments]);
  
      setCaption("");
      setImage(null);
      setImagePreview(null);
      setIsPostLoading(false);
    } catch (error) {
      console.error("Error creating post:", error);
      setIsPostLoading(false);
    }
  };
  

  const handleSubmitText = async (e) => {
    e.preventDefault();
    if (!caption) {
      alert("Enter Something to Post");
      return;
    }
  
    try {
      setIsPostLoading(true);
  
      const postData = {
        caption: caption,
        content_type: "text",
        timestamp: new Date().toISOString(),
        postId: postId,
      };
  
      const response = await axios.post(
        "https://wesmart-3b311bc60078.herokuapp.com/TextComment",
        postData
      );
  
      alert("Comment Posted!");
      
      
      setComments(prevComments => [response.data, ...prevComments]);
  
      setCaption("");
      setIsPostLoading(false);
    } catch (error) {
      console.error("Error creating post:", error);
      setIsPostLoading(false);
    }
  };
  

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times; Close
        </button>
        <div className="post_form">
          <form onSubmit={image ? handleSubmit : handleSubmitText}>
            <textarea
              placeholder="Say Something..."
              value={caption}
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
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginTop: "10px",
                }}
              />
            )}
            <button type="submit" disabled={isPostLoading}>
              {isPostLoading ? "Posting..." : "Post"}
            </button>
          </form>
        </div>

        <div className="comments_container">
          {loading ? (
            <p>Loading...</p>
          ) : comments.length === 0 ? (
            <p>No comments available</p>
          ) : (
            comments.reverse().map((comment) => (
              <div key={comment.id} className="comment_card">
                {comment.content_type === "image" ? (
                  <div>
                    <p>{comment.caption}</p>
                    <img
                      src={comment.imageUrl}
                      alt="Post"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                ) : comment.content_type === "text" ? (
                  <p>{comment.caption}</p>
                ) : null}
              </div>
            ))
          )}
        </div>


      </div>
    </div>,
    document.body
  );
};

export default Modal;
