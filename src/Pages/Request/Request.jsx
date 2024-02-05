import React, { useState } from "react";
import axios from "axios";
import "./Request.scss";
import "../../App.scss";
import Sidebar from "../../components/Sidebar/Sidebar";

function Request({ showSidebar, active, closeSidebar }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    whatsappNumber: "",
    topic: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = () => {
    // Add your form submission logic using axios or any other method here
    console.log("Form Data:", formData);
  };

  return (
    <div className="form">
      <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
      <div className="form-content">
        <div className="form-area">
          <h2>Request a Video</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="surname">Surname:</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="whatsappNumber">WhatsApp Number:</label>
              <input
                type="text"
                id="whatsappNumber"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="topic">Topic:</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="additionalInfo">Additional Information:</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="button" onClick={handleSearch}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Request;
