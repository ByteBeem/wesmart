import React, { Component } from "react";
import axios from "axios";
import "./Request.scss";
import "../../App.scss";
import Sidebar from "../../components/Sidebar/Sidebar";

class Request extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        name: "",
        surname: "",
        whatsappNumber: "",
        topic: "",
        additionalInfo: "",
      },
      isLoading: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
  };

  validatePhoneNumber = (number) => {
    const phoneNumberRegex = /^[0-9]{10}$/; 
    return phoneNumberRegex.test(number);
  };

  handleSubmit = async () => {
    const { formData } = this.state;

    // Stronger validations
    if (
      !formData.name.trim() ||
      !formData.surname.trim() ||
      !formData.whatsappNumber.trim() ||
      !formData.topic.trim() ||
      !formData.additionalInfo.trim() ||
      !this.validatePhoneNumber(formData.whatsappNumber)
    ) {
      alert("Check Your Inputs please!");
      return;
    }

    this.setState({ isLoading: true });

    try {
      const response = await axios.post(
        "https://mainp-server-c7a5046a3a01.herokuapp.com/request",
        formData
      );
      alert("Requested Successfully. You will be notified on your WhatsApp number!");

      
      this.setState({
        formData: {
          name: "",
          surname: "",
          whatsappNumber: "",
          topic: "",
          additionalInfo: "",
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { showSidebar, closeSidebar } = this.props;
    const { formData, isLoading } = this.state;

    return (
    
      <div className="form">
        <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
        <div className="form-content">
          <div className="form-area">

            <h2>Tell us what you need</h2>
  
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="whatsappNumber">WhatsApp Number:</label>
                <input
                  type="tel"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="additionalInfo">Additional Information:</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={this.handleChange}
                  required
                ></textarea>
              </div>

              <button type="button" onClick={this.handleSubmit}>
                {isLoading ? "Requesting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    
    );
  }
}

export default Request;
