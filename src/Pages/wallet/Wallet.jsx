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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedCurrency = localStorage.getItem("currency");

    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken, storedCurrency);
    }
  }, [setToken]);

  const fetchUserData = (token, currency) => {
    setLoading(true);
    axios
      .get("https://mainp-server-c7a5046a3a01.herokuapp.com/balance", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        
const balance = response.data; 

      if (userData !== undefined) {
          setUserData({ ...userData, currency });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div className="wallet">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="wallet_container">
        <Navbar showSidebar={showSidebar} />

        <div className="account_info">
          {loading && (
            <div className="overlay">
              <FiLoader className="loading-spinner" />
            </div>
          )}

          <span>Account Balance:</span>
         <div className="balance">{`${userData.currency}${userData.balance || 0}`}</div>


          <Link className="form_btn" to="/deposit">
            Deposit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
