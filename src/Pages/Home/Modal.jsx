import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

const Modal = ({ onClose }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
         
          {image && <img src={image} alt="Preview" className="image-preview" />}
         
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
