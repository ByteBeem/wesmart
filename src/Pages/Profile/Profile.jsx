import React, { useState, useEffect } from "react";
import "./Profile.scss";
import "../../App.scss";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import UserProfile from "../../assets/user.png";
import { Link } from "react-router-dom";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import Activities from "../../Data/Activities";

function Profile({ showSidebar, active, closeSidebar }) {
  const { setToken } = useAuth();
  const [userData, setUserData] = useState({});
  const [activities, setActivities] = useState(Activities);
  const [Dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fullName = userData.name;
  const cellphone = userData.cell;
  const surname = userData.surname;
  const ID = "Unverified";

  const handleWithdraw = () => {
    navigate("/withdraw");
  };

  const handleDeposit = () => {
    navigate("/deposit");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      alert("Token not found. Please login!");
      navigate("/login");
    } else {
      setToken(storedToken);
      fetchActivities(storedToken);
      fetchUserData(storedToken);
    }
  }, [setToken, navigate]);

  const fetchActivities = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://spinz-servers-17da09bbdb53.herokuapp.com/activities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 206) {
        alert("Token Expired. Please login again!");
        setLoading(false);
      } else {
        setActivities(response.data[0]);

        const formattedDates = response.data.map((activity) => {
          const date = activity.date_time;
          const originalDate = new Date(date);
          return originalDate.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });
        });
        setDates(formattedDates);
      }
    } catch (error) {
      // Handle errors
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = (token) => {
    setLoading(true);
    axios
      .get("https://mainp-server-c7a5046a3a01.herokuapp.com/getUserData", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const info = response.data;
        if (info !== undefined) {
          setUserData(info);
        }
        setLoading(false);
      })
      .catch((error) => {
        alert("Something went wrong. Please login again!");
        window.location.href = "login";
      });
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

              <span>Surname:</span>
              <div className="text_item">{surname}</div>

              <span>Phone:</span>
              <div className="text_item">{cellphone}</div>
            </div>
          </div>
        </div>

        <Link className="form_btn" to="/reset">
          Post Video
        </Link>

        <Link className="form_btn" to="#">
          Delete Account
        </Link>
      </div>
    </div>
  );
}

export default Profile;
