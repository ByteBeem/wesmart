import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body // Render the modal directly into the document body
  );
};

export default Modal;
