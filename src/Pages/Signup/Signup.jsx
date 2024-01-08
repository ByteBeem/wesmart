import React, { useState , useEffect } from "react";
import "./Signup.scss";
import logo from "../../assets/new.png";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Typed from 'typed.js';

function Signup() {

  useEffect(() => {
    var typed = new Typed(".typing", {
      strings: ["Sign up Now!", "Welcome to Peermine"],
      typeSpeed: 90,
      backSpeed: 50,
      loop: true
    });
  }, []);

  const [formData, setFormData] = useState({
    full: "",
    surname: "",
    cellphone: "",
    ID: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    full: "",
    surname: "",
    cellphone: "",
    ID: "",
    password: "",
    confirmPassword: "",
  });

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

 

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    } else if (
      password.length < 6 ||
      !/[0-9]/.test(password) ||
      !/[a-zA-Z]/.test(password)
    ) {
      return "Password must be at least 6 characters long and contain both letters and numbers";
    }
    return "";
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      username: "",
      full: "",
      surname: "",
      cellphone: "",
      ID: "",
      password: "",
      confirmPassword: "",
    });

    // Validate the cellphone number
    if (!validateCellphone(formData.cellphone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cellphone: "Invalid cellphone number",
      }));
      setIsLoading(false);
      return;
    }

    

    // Validate the full name
    if (!validateName(formData.full)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        full: "Invalid full name. Use letters and spaces only",
      }));
      setIsLoading(false);
      return;
    }

    // Validate the surname
    if (!validateName(formData.surname)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        surname: "Invalid surname. Use letters and spaces only",
      }));
      setIsLoading(false);
      return;
    }

    // Validate the password
    const passwordError = validatePassword(
      formData.password,
      formData.confirmPassword
    );
    if (passwordError) {
      setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
      setIsLoading(false);
      return;
    }

    const { username, full, surname, cellphone, ID, password } = formData;

    try {
      const response = await axios.post(
        "https://spinz-servers-17da09bbdb53.herokuapp.com/signup",
        {
          fullName: full,
          surname: surname,
          cell: cellphone,
          idNumber: ID,
          password: password,
        },
        { withCredentials: true }
      );

      setIsLoading(false);

      if (response.status === 200) {
        // Handle successful registration
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Account Opened Successfully! Login Now",
        }));
      } else if (response.status === 201) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cellphone: "Cellphone Already registered!",
        }));
      } else if (response.status === 208) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ID: "ID number Already registered!",
        }));
      }
    } catch (error) {
      setIsLoading(false);

      setErrors("Registration Error. Please try again later.");
    }
  };

  return (
    <div className="form">
      <div className="typing"></div>

      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="full">Full Name(s): </label>
            <input
              type="text"
              id="full"
              name="full"
              value={formData.full}
              onChange={handleChange}
              required
            />
            {errors.full && <p className="error-message">{errors.full}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="surname">Surname: </label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
            {errors.surname && (
              <p className="error-message">{errors.surname}</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="cellphone">Cellphone: </label>
            <input
              type="text"
              id="cellphone"
              name="cellphone"
              value={formData.cellphone}
              onChange={handleChange}
              required
              inputMode="numeric"
            />
            {errors.cellphone && (
              <p className="error-message">{errors.cellphone}</p>
            )}
          </div>
         
          <div className="input-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="form_btn" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <div className="loading-spinner" />}
        </form>

        <div className="bottom">
          <span>
            Already have an account?{" "}
            <Link className="link" to="/login">
              Log In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
