import React, { useState, useEffect } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import Typed from "typed.js";
import DOMPurify from 'dompurify';

function Login() {
  const {setToken, setUserData } = useAuth();

  const navigate = useNavigate();

  const sanitizeText = (text) => {
    return DOMPurify.sanitize(text);
  };

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };


  useEffect(() => {
    var typed = new Typed(".typing", {
      strings: [sanitizeText("Login Now!"), "Welcome to Peermine"],
      typeSpeed: 90,
      backSpeed: 50,
      loop: true,
    });
  }, []);
  

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    cellphone: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    cellphone: "",
    password: "",
  });

  const storeTokenInLocalStorage = (token) => {
    localStorage.setItem("token", token);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateCellphone = (cellphone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(cellphone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      cellphone: "",
      password: "",
    });

    if (!validateCellphone(formData.cellphone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cellphone: "Invalid cellphone number",
      }));
      setIsLoading(false);
      return;
    }

    const { cellphone, password } = formData;

    try {
      const response = await axios.post(
        "https://mainp-server-c7a5046a3a01.herokuapp.com/login",
        {
          cell: cellphone,
          password: password,
        },
        
        { withCredentials: true }
      );

      setIsLoading(false);

      if (response.status === 200) {
        setToken(response.data.token);
        storeTokenInLocalStorage(response.data.token);
        console.log(response.data.token);

        setUserData(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("token", response.token);
       console.log(response.token);
        navigate("/dashboard");

        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Login Successful!",
        }));
      } else if (response.status === 201) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cellphone: "Incorrect Cellphone number",
        }));
      } else if (response.status === 202) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Incorrect Password",
        }));
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login Error:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "An error occurred. Please try again later.",
      }));
    }
  };

  return (
    <div className="login">
      <div className="typing"></div>

      <div className="login_container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cellphone">Cellphone</label>
            <input
              type="text"
              id="cellphone"
              name="cellphone"
              value={sanitizeInput(formData.cellphone)}
              onChange={handleChange}
              required
              inputMode="numeric"
            />

            {errors.cellphone && (
              <p className="error-message">{errors.cellphone}</p>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={sanitizeInput(formData.password)}
              onChange={handleChange}
              required
            />

            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="form_btn" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Log In"}
          </button>

          {isLoading && <div className="loading-spinner" />}
        </form>

        <div className="bottom">
          <span>
            Don't have an account?{" "}
            <Link className="link" to="/signup">
              Signup
            </Link>
          </span>

          <span>
            Forgot Password?{" "}
            <Link className="link" to="#">
              Reset
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
