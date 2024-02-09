import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

const Modal = ({ onClose }) => {
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
    // Assuming you have some logic to handle submitting text input and image
    // Here, I'm just pushing text input into answers array
    setAnswers([...answers, textInput]);
    // Clearing text input and image after submission
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
          {/* Text input section */}
          <div className="input-container">
            <input
              type="text"
              value={textInput}
              onChange={handleTextInputChange}
              placeholder="Enter your answer..."
            />
            {/* Image upload input */}
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {/* Submit button */}
            <button className="send-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          {/* Image preview */}
          {image && <img src={image} alt="Preview" className="image-preview" />}
          {/* Display answers */}
          <div className="example-answers">
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
