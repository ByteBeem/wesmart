import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./LoginModal.scss";
import axios from "axios";

const Modal = ({ onClose }) => {
    const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupPhoneNumber, setSignupPhoneNumber] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isSignupLoading, setIsSignupLoading] = useState(false);
    const [token , setToken] = useState('');

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

    const handleLogin = async () => {
      if (!loginPhoneNumber || !loginPassword) {
        alert("You forgot to fill in some important information.");
        return;
      }
    
      try {
        setIsLoginLoading(true);
    
        const loginData = {
          phoneNumber: loginPhoneNumber,
          password: loginPassword
        };
    
        try {
          const response = await axios.post(
            `https://wesmart-3b311bc60078.herokuapp.com/login`,
            loginData
          );
          const data = response.data;
    
          if (response.status === 200) {
            setToken(data);
          } else if (response.status === 401) {
            alert("Incorrect password");
          } else if (response.status === 409) {
            alert("Incorrect cellphone Number");
          }
        } catch (error) {
          alert("Something went wrong");
        } finally {
          setIsLoginLoading(false);
        }
    
        onClose();
      } catch (error) {
        console.error("Error logging in:", error);
        setIsLoginLoading(false);
        alert("You entered Something Incorrect!.");
      }
    };
    
      

    const handleSignup = async () => {
       
        if (!signupName || !signupPhoneNumber || !signupPassword) {
          alert("You forgot to fill in some important information.");
          return;
        }
      
        try {
          setIsSignupLoading(true);
      
       
          const postData = {
            name: signupName,
            phoneNumber: signupPhoneNumber,
            password: signupPassword
          };
      
          
          await axios.post(
            "https://wesmart-3b311bc60078.herokuapp.com/signup",
            postData
          );
      
          
          alert("Account Opened!");
      
         
          setSignupName("");
          setSignupPhoneNumber("");
          setSignupPassword("");
      
         
          onClose();
        } catch (error) {
          console.error("Error signing up:", error);
          setIsSignupLoading(false);
         
          alert("An error occurred during signup. Please try again later.");
        }
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
