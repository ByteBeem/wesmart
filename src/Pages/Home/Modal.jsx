import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

const Modal = ({ onClose, exampleAnswers }) => {
  const [image, setImage] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [answers, setAnswers] = useState([]);

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

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = () => {
    setAnswers([...answers, textInput]);
    setTextInput("");
    setImage(null);
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          <div className="example-answers">
            {exampleAnswers.map((answer, index) => (
              <p key={index}>{answer}</p>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={textInput}
              onChange={handleTextInputChange}
              placeholder="Enter your answer..."
            />
            <button className="send-button" onClick={handleSubmit}>
              <IoSend />
            </button>
          </div>
          <div className="file-input-container">
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {image && <img src={image} alt="Preview" className="image-preview" />}
          </div>
          <button className="submit-file-button" onClick={handleSubmit}>
            Submit File
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
