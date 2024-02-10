import React, { useState, useEffect } from "react";
import "./Profile.scss";
import "../../App.scss";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserProfile from "../../assets/smart.jpg";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import LoginModal from "./LoginModal"


function Profile({ showSidebar, active, closeSidebar }) {
  
  const [userData, setUserData] = useState({});
  const [modalOpenLogin, setModalOpenLogin] = useState(false);
  const [loading, setLoading] = useState(false);



  const fullName = userData.name;
  const cellphone = userData.cell;

  

  
  const handleCloseModalLogin = () => {
    
    setModalOpenLogin(false);
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token" , token);

    if (!token) {
        setModalOpenLogin(true);
        return; 
      }
  
    if (token) {
      setLoading(true); 
  
      axios
        .get("https://wesmart-3b311bc60078.herokuapp.com/getUserData", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const info = response.data;
          if (info !== undefined) {
            setUserData(info); 
          }
        })
        .catch((error) => {
         
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoading(false); 
        });
    }
  }, []); 
  

 

  

  return (
    <div className="profile">
      {loading && (
        <div className="overlay">
          <FiLoader className="loading-spinner" />
        </div>
      )}
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="profile_container">
       

        <div className="top">
          <div className="user_info">
            <div className="profile_pic">
              <img src={UserProfile} alt="" />
            </div>

            <div className="text">
              <span>Fullname:</span>
              <div className="text_item">{fullName}</div>


              <span>Phone:</span>
              <div className="text_item">{cellphone}</div>
            </div>
          </div>
        </div>

        <Link className="form_btn" to="#">
          Change Password
        </Link>

      <Link className="form_btn" to="#">
          Delete Account
        </Link>


      </div>

      {modalOpenLogin  && (
        <>
          <LoginModal onClose={handleCloseModalLogin} />
          <button onClick={handleCloseModalLogin}>Close</button>
        </>
      )}
    </div>
  );
}

export default Profile;