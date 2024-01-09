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
    { label: "Phoenix", className: "glowButtonAviator redButton", onClick: () => decideButtons("Phoenix", "20") },
    { label: "Spectra", className: "glowButtonAviator redButton", onClick: () => decideButtons("Spectra", "40") },
    { label: "Aurora", className: "glowButtonAviator redButton",onClick: () => decideButtons("Aurora", "50") },
    { label: "Vortex", className: "glowButtonAviator redButton", onClick: () => decideButtons("Vortex", "100") },
    { label: "Infinity", className: "glowButtonAviator redButton", onClick: () => decideButtons("Infinity", "10") },
    { label: "Harmony", className: "glowButtonAviator redButton", onClick: () => decideButtons("Harmony", "200") },
    { label: "Quantum", className: "glowButtonAviator redButton", onClick: () => decideButtons("Quantum", "80") },  
  ];

  const blueMinesButtons = [
    { label: "Lapis", price: "20", className: "glowButton blueButton", onClick: () => decideButtons("Lapis", "20") },
    { label: "Sapphire", price: "40", className: "glowButton blueButton", onClick: () => decideButtons("Sapphire", "40") },
    { label: "Whispers", price: "50", className: "glowButton blueButton", onClick: () => decideButtons("Whispers", "50") },
    { label: "Cobalt", price: "100", className: "glowButton blueButton", onClick: () => decideButtons("Cobalt", "100") },
    { label: "Cascade", price: "10", className: "glowButton blueButton", onClick: () => decideButtons("Cascade", "10") },
    { label: "Royal", price: "200", className: "glowButton blueButton", onClick: () => decideButtons("Royal", "200") },
    { label: "Bluefall", price: "80", className: "glowButton blueButton", onClick: () => decideButtons("Bluefall", "80") },
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
const buttonStyle = {
    backgroundColor: 'green',
    padding: '15px 20px', 
    fontSize: '1.5rem',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    outline: 'none',
    fontFamily: 'Montserrat, sans-serif',
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    letterSpacing: '4px',
    transition: '0.5s',
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
        <button style={buttonStyle} onClick={() => console.log('Button clicked')}>
      Solo Mining
    </button>
      </div>
    </div>
  );
};

export default Home;
