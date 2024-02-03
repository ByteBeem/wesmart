// Import statements
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import { FiLoader } from "react-icons/fi";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./wallet.scss";
import "../../App.scss";

const Wallet = ({ showSidebar, active, closeSidebar }) => {
  const { setToken } = useAuth();
  const [userData, setUserData] = useState({ balance: 0 });
  const [loading, setLoading] = useState(false);
  const currency = userData.currency;
  const balance = userData.balance;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if(!storedToken){
      alert("Something went wrong. Please login again!");
        window.location.href = "login";
    }
    

    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, [setToken]);

  const fetchUserData = (token) => {
    setLoading(true);
    axios
      .get("https://mainp-server-c7a5046a3a01.herokuapp.com/balance", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        
const balance = response.data; 

      if (balance !== undefined) {
          setUserData(balance);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const getCurrencySymbol = () => {
    
    return currency === 'USD' ? '$' : 'R';
  };

  return (
    <div className="wallet">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="wallet_container">


        <div className="account_info">
          {loading && (
            <div className="overlay">
              <FiLoader className="loading-spinner" />
            </div>
          )}

          <span>Account Balance:</span>
         <div className="balance">{`${getCurrencySymbol()}${balance.toString()}`}</div>


          <Link className="form_btn" to="/withdraw">
            Withdraw
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
