import "./Navbar.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import { IoNotifications } from "react-icons/io5";
import { IoIosPaper } from "react-icons/io";

const Navbar = ({ showSidebar }) => {
  const [userData, setUserData] = useState({});
  const [currencyData, setcurrencyData] = useState({});
  const [loading, setLoading] = useState(true);
  const { setToken } = useAuth();

  const balance = userData.balance;
  const currency = currencyData.currency;


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    
    

    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
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

      if(balance.currency === "USD"){
        const currency="$";
        setcurrencyData(currency);
      } else{
        const currency="R";
        setcurrencyData(currency);
      }
      
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


  return (
    <header>
      {/* <div className="menu_btn" onClick={() => showSidebar()}>
        &#9776;
      </div> */}
      <ul className="games_filter">
        <li>
          <div className="balance">
            {loading ? "Loading..." : `${currency}${balance.toString()}`}
          </div>
        </li>
      </ul>

      <ul className="right">
        <div className="notification">
          <IoNotifications className="icon" />
          <div className="count">5</div>
        </div>
        <Link className="profile" to="/profile">
          <img src="" alt="" />
        </Link>
        
      </ul>
    </header>
  );
};

export default Navbar;
