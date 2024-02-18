import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../Home/Modal.scss";


const Modal = ({ onClose, exampleAnswers }) => {
  const [image, setImage] = useState(null);
  

 

 

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">

      <button className="close-button" onClick={onClose}>
          &times;
        </button>
      
        <div className="modal-content">
       
       
         
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
