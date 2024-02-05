import "./sidebar.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaDownload } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Sidebar = ({ active, closeSidebar }) => {
  
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
          to="/books"
        >
          <FaDownload className="icon" />
          
          <span>books</span>
        </Link>

      

        

        <Link className="link" to="/search">
          <FaSearch className="icon" />
          <span>Search</span>
        </Link>

        

        
      </div>
    </aside>
  );
};

export default Sidebar;
