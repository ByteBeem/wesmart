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
          <div className="input-container">
            <input
              type="text"
              value={textInput}
              onChange={handleTextInputChange}
              placeholder="Enter your answer..."
            />
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <button className="send-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          {image && <img src={image} alt="Preview" className="image-preview" />}
          <div className="example-answers">
            {/* Render example answers passed as props */}
            {exampleAnswers.map((answer, index) => (
              <p key={index}>{answer}</p>
            ))}
          </div>
          <div className="user-answers">
            {/* Render user's answers */}
            {answers.map((answer, index) => (
              <p key={index}>{answer}</p>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
