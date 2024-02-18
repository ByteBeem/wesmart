import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Modal.scss";
import { storage } from "./firebase";

const Modal = ({ onClose, exampleAnswers, postId, fetchPosts, page }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isPostLoading, setIsPostLoading] = useState(false);

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

      await axios.post(
        "https://wesmart-3b311bc60078.herokuapp.com/PostComments",
        postData
      );

      alert("Post Posted");
      fetchPosts(page);

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

      await axios.post(
        "https://wesmart-3b311bc60078.herokuapp.com/TextComment",
        postData
      );

      alert("Post Posted!");
      fetchPosts(page);

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
          &times;
        </button>
        <div className="modal-content">
          {exampleAnswers.map((answer, index) => (
            <div key={index}>
              {answer.startsWith("data:image") ? (
                <img src={answer} alt="Answer" className="image-answer" />
              ) : (
                <p>{answer}</p>
              )}
            </div>
          ))}
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
                  style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }}
                />
              )}
              <button type="submit">
                {!isPostLoading ? "Post" : "Posting.."}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
