import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";
import "./Home.scss";
import { useNavigate } from 'react-router-dom';
import Modal from "./model";
import ModalAviator from "./ModalAviator";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MinesTable = ({ redMinesButtons, blueMinesButtons }) => {
  return (
    <table className="minesTable">
      <tbody>
        <tr>
          <td>
            <MinesSection title="Red Mines" buttons={redMinesButtons} />
          </td>
          <td className="verticalLine"></td>
          <td>
            <MinesSection title="Blue Mines" buttons={blueMinesButtons} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const MinesSection = ({ title, buttons }) => {
  return (
    <div className="minesSection">
      <div className="minesTitle">{title}</div>
      <div className="minesButtons">
        {buttons.map((button, index) => (
          <button key={index} className={button.className} onClick={button.onClick}>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const EasyWinSection = ({  decideButtons   }) => {
  
  const redMinesButtons = [
    { label: "XAUUSD", className: "glowButtonAviator redButton", onClick: () => decideButtons("XAUUSD", "1") },
    { label: "GBPJPY", className: "glowButtonAviator redButton", onClick: () => decideButtons("GBPJPY", "1") },
    { label: "USDJPY", className: "glowButtonAviator redButton",onClick: () => decideButtons("USDJPY", "1") },
    { label: "NASDAQ", className: "glowButtonAviator redButton", onClick: () => decideButtons("NASDAQ", "1") },
    { label: "EURUSD", className: "glowButtonAviator redButton", onClick: () => decideButtons("EURUSD", "1") },
    { label: "NZDJPY", className: "glowButtonAviator redButton", onClick: () => decideButtons("NZDJPY", "1") },
    { label: "EURCHF", className: "glowButtonAviator redButton", onClick: () => decideButtons("EURCHF", "1") },  
  ];

  const blueMinesButtons = [
    { label: "USDJPY", price: "20", className: "glowButton blueButton", onClick: () => decideButtons("USDJPY", "1") },
    { label: "USDCHF", price: "40", className: "glowButton blueButton", onClick: () => decideButtons("USDCHF", "1") },
    { label: "AUDJPY", price: "50", className: "glowButton blueButton", onClick: () => decideButtons("AUDJPY", "1") },
    { label: "CADJPY", price: "100", className: "glowButton blueButton", onClick: () => decideButtons("CADJPY", "1") },
    { label: "EURGBP", price: "10", className: "glowButton blueButton", onClick: () => decideButtons("EURGBP", "1") },
    { label: "USDCAD", price: "200", className: "glowButton blueButton", onClick: () => decideButtons("USDCAD", "1") },
    { label: "CADCHF", price: "80", className: "glowButton blueButton", onClick: () => decideButtons("CADCHF", "1") },
  ];

  const redMinesButtonsUSD = [
    { label: "XAUUSD", className: "glowButtonAviator redButton", onClick: () => decideButtons("XAUUSD", "10") },
    { label: "GBPJPY", className: "glowButtonAviator redButton", onClick: () => decideButtons("GBPJPY", "10") },
    { label: "USDJPY", className: "glowButtonAviator redButton",onClick: () => decideButtons("USDJPY", "10") },
    { label: "NASDAQ", className: "glowButtonAviator redButton", onClick: () => decideButtons("NASDAQ", "10") },
    { label: "EURUSD", className: "glowButtonAviator redButton", onClick: () => decideButtons("EURUSD", "10") },
    { label: "NZDJPY", className: "glowButtonAviator redButton", onClick: () => decideButtons("NZDJPY", "10") },
    { label: "EURCHF", className: "glowButtonAviator redButton", onClick: () => decideButtons("EURCHF", "10") },  
  ];

  const blueMinesButtonsUSD = [
    { label: "USDJPY", price: "20", className: "glowButton blueButton", onClick: () => decideButtons("USDJPY", "1") },
    { label: "USDCHF", price: "40", className: "glowButton blueButton", onClick: () => decideButtons("USDCHF", "1") },
    { label: "AUDJPY", price: "50", className: "glowButton blueButton", onClick: () => decideButtons("AUDJPY", "1") },
    { label: "CADJPY", price: "100", className: "glowButton blueButton", onClick: () => decideButtons("CADJPY", "1") },
    { label: "EURGBP", price: "10", className: "glowButton blueButton", onClick: () => decideButtons("EURGBP", "1") },
    { label: "USDCAD", price: "200", className: "glowButton blueButton", onClick: () => decideButtons("USDCAD", "1") },
    { label: "CADCHF", price: "80", className: "glowButton blueButton", onClick: () => decideButtons("CADCHF", "1") },
  ];
  
  
  
  return (
    <div className="easyWin_section">
      <MinesTable redMinesButtons={redMinesButtons} blueMinesButtons={blueMinesButtons} />
    </div>
  );
};

const Home = ({ showSidebar, active, closeSidebar }) => {
  const token = localStorage.getItem('token');
  const [modalContent, setModalContent] = useState({ label: "", price: "" });
  const [showModal, setShowModal] = useState(false);
 

  const decideButtons = (label, price) => {
    setModalContent({ label, price });
    setShowModal(true);
  };
  

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
    
  };


  return (
    <div className="home">
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <div className="home_container">
        <Navbar showSidebar={showSidebar} />
        <div className="content">
          <div className="games_slider">
            {showModal ? null : <div className="div"></div>}
          </div>
          <EasyWinSection showModal={openModal} decideButtons={decideButtons} showModalAviator={ModalAviator} />
          {showModal && <Modal visible={showModal} closeModal={closeModal} content={{ label: modalContent.label, price: modalContent.price}} />}
          
        </div>
        
      </div>
    </div>
  );
};

export default Home;
