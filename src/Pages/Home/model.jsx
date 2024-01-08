import React, { useState } from 'react';
import axios from 'axios';

import './Modal.scss';

export default function Modal({ visible, closeModal, content }) {
  const [showPayment, setShowPayment] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  if (!visible) return null;

  const handleContinue = () => {
    setShowPayment(true);
  };

  const handlePay = () => {
    const storedToken = localStorage.getItem('token');
    console.log("token", storedToken);
    setShowLoadingSpinner(true);

    axios.post(
      'https://spinz-servers-17da09bbdb53.herokuapp.com/pay',
      {
        label: content.label,  
        price: content.price, 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
          'Origin': 'https://www.shopient.co.za',
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          alert("Insufficient balance");
          throw new Error('Payment failed');
        }
      })
      .then((data) => {
        setShowLoadingSpinner(false);
        alert('Payment successful!');
        closeModal();
        window.location.href = data.gameLink;
      })
      .catch((error) => {
        setShowLoadingSpinner(false);
        alert('Payment failed');
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Disclaimer</h2>
        <p className="modal-text">
          Hola, today you decided to choose <b>{content.label}</b> as your mining pool. To continue, you agree to pay a fee of <b>R{content.price}</b>.
        </p>
  
        {showLoadingSpinner ? (
  <div className="loading-spinner"></div>
) : showPayment ? (
  <div className="payment-box">
    <div className="modal-buttons">
      
        <button
              className="modal-button modal-button-red"
              onClick={closeModal}
            >
              Back
            </button>
        <button
         
          className="modal-button modal-button-green "
          onClick={() => handlePay(content.label, content.price)}
        >
          Pay
        </button>
      
    </div>
  </div>
        ) : (
          <div className="modal-buttons">
            <button
              className="modal-button modal-button-red"
              onClick={closeModal}
            >
              Back
            </button>
            <button
              className="modal-button modal-button-green"
              onClick={handleContinue}
            >
              Continue (R{content.price})
            </button>
          </div>
        )}
      </div>
    </div>
  );
        }
