import "./Navbar.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import { IoNotifications } from "react-icons/io5";
import { IoIosPaper } from "react-icons/io";

const Navbar = ({ showSidebar }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { setToken } = useAuth();

  const balance = userData.balance;
  const currency = userData.currency;


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    
    

    if (storedToken) {
      setToken(storedToken);
      
    }
  }, [setToken]);

 const fetchUserData = (token) => {
   const storedToken = localStorage.getItem("token");
  setLoading(true);
  axios
    .get(" https://mainp-server-c7a5046a3a01.herokuapp.com/balance", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => {
     const balance = response.data; 
      
      if (balance !== undefined ) {
        setUserData( balance ); 
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      alert("Go login now!");
      window.location.href = "https://peermine.vercel.app/login";
    })
    .finally(() => {
      setLoading(false);
    });
};

const getCurrencySymbol = () => {
  const symbol = currency === 'USD' ? '$' : 'R';
  localStorage.setItem("currency", currency);
  return symbol;
};



  return (
    <header>
      {/* <div className="menu_btn" onClick={() => showSidebar()}>
        &#9776;
      </div> */}
      <ul className="games_filter">
        <li>
          <div className="balance">
             {loading ? "Loading..." : `${getCurrencySymbol()}${balance.toString()}`}
          </div>
        </li>
      </ul>

     
    </header>
  );
};

export default Navbar;
