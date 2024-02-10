import "./sidebar.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { useState } from "react";
import { TfiWrite } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
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
          <FaHome className="icon" />
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





        <Link className="link" to="/request">
          <TfiWrite className="icon" />
          <span>Request</span>
        </Link>


        <Link className="link" to="/profile">
          <CgProfile  className="icon" />
          <span>Profile</span>
        </Link>




      </div>
    </aside>
  );
};

export default Sidebar;
