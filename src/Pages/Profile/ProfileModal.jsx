import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../Home/Modal.scss";
import axios from "axios";


const Modal = ({ onClose, postId }) => {


  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);


  useEffect(() => {
    fetchComments(page, postId);

    console.log("post id", postId);

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

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">

        <button className="close-button" onClick={onClose}>
          &times; Close
        </button>



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
