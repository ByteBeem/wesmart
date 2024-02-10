import React, { useState, useEffect } from "react";
import "./Profile.scss";
import "../../App.scss";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserProfile from "../../assets/smart.jpg";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";


function Profile({ showSidebar, active, closeSidebar }) {
  const { setToken } = useAuth();
  const [userData, setUserData] = useState({});

  const [loading, setLoading] = useState(false);



  const fullName = userData.name;
  const cellphone = userData.cell;

 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      fetchUserData(storedToken);
    }
  }, [setToken, setToken]);

 

  const fetchUserData = (token) => {
    setLoading(true);
    axios
      .get("https://spinz-server-100d0276d968.herokuapp.com/getUserData", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
         const info = response.data; 

      if (info !== undefined) {
        setUserData(info ); 
      }
        setLoading(false);
      })
      .catch((error) => {});
  };

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
    </div>
  );
}

export default Profile;