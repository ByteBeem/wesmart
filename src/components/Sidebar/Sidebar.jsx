import "./sidebar.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaDownload } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { useState } from "react";
import { IoIosChatbubbles } from "react-icons/io";

const Sidebar = ({ active, closeSidebar }) => {
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState("home");


  return (
    <aside className={`sidebar ${active}`}>
     
      <div className="top">
        <h3>weSmart</h3>
        <div className="close_btn">&times;</div>
      </div>


      <div className="middle">
        <Link
          onClick={() => setActiveItem("home")}
          className={activeItem === "home" ? "link active" : "link"}
          to="/Home"
        >
          <PiTelevisionSimpleBold className="icon" />
          <span>Home</span>
        </Link>

        <Link
          onClick={() => setActiveItem("wallet")}
          className={activeItem === "wallet" ? "link active" : "link"}
          to="/wallets"
        >
          <FaSearch className="icon" />
          <span>Search</span>
        </Link>

      

        

        <Link className="link" to="/profile">
          <FaDownload className="icon" />
          <span>books</span>
        </Link>

        

        
      </div>
    </aside>
  );
};

export default Sidebar;
