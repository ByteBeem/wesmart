import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./LoginModal.scss";
import { IoSend } from "react-icons/io5";

const Modal = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with phone number:", phoneNumber, "and password:", password);
    onClose();
  };

  const handleSignup = () => {
    // Handle signup logic here
    console.log("Signing up with name:", name, "phone number:", phoneNumber, "and password:", password);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
            <h2>Login Now</h2>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter your cellphone number..."
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password..."
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <h2>Or Open Account</h2>
          <div className="signup-container">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name..."
            />
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your cellphone..."
            />
             <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your password..."
            />
            <button className="signup-button" onClick={handleSignup}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
