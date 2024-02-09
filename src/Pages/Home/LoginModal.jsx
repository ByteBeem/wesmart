import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./LoginModal.scss";

const Modal = ({ onClose }) => {
    const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupPhoneNumber, setSignupPhoneNumber] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isSignupLoading, setIsSignupLoading] = useState(false);

    const handleLoginPhoneNumberChange = (event) => {
        setLoginPhoneNumber(event.target.value);
    };

    const handleLoginPasswordChange = (event) => {
        setLoginPassword(event.target.value);
    };

    const handleSignupNameChange = (event) => {
        setSignupName(event.target.value);
    };

    const handleSignupPhoneNumberChange = (event) => {
        setSignupPhoneNumber(event.target.value);
    };

    const handleSignupPasswordChange = (event) => {
        setSignupPassword(event.target.value);
    };

    const handleLogin = () => {
        setIsLoginLoading(true);
        console.log("Logging in with phone number:", loginPhoneNumber, "and password:", loginPassword);
        onClose();
    };

    const handleSignup = () => {
        setIsSignupLoading(true);
        console.log("Signing up with name:", signupName, "phone number:", signupPhoneNumber, "and password:", signupPassword);
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
                        value={loginPhoneNumber}
                        onChange={handleLoginPhoneNumberChange}
                        placeholder="Enter your cellphone number..."
                    />
                    <input
                        type="password"
                        value={loginPassword}
                        onChange={handleLoginPasswordChange}
                        placeholder="Enter your password..."
                    />
                    <button className="login-button" onClick={handleLogin}>
                        {!isLoginLoading ?
                            "Login"
                            :
                            "Logging in..."
                        }
                    </button>
                    <h2>Or Open Account</h2>
                    <input
                        type="text"
                        value={signupName}
                        onChange={handleSignupNameChange}
                        placeholder="Enter your name..."
                    />
                    <input
                        type="tel"
                        value={signupPhoneNumber}
                        onChange={handleSignupPhoneNumberChange}
                        placeholder="Enter your cellphone number..."
                    />
                    <input
                        type="password"
                        value={signupPassword}
                        onChange={handleSignupPasswordChange}
                        placeholder="Enter your password..."
                    />
                    <button className="signup-button" onClick={handleSignup}>
                        {!isSignupLoading ?
                            "Create account"
                            :

                            "Creating account..."
                        }
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
