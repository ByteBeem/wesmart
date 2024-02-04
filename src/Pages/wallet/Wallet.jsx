// Import statements
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./wallet.scss";
import "../../App.scss";

const Wallet = ({ showSidebar, active, closeSidebar }) => {
  // Assuming you have a list of books
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch your book data using axios or any other method
    // Update the 'books' state with the fetched data
  }, []);

  const handleDownload = (bookId) => {
    // Implement your download logic here
    console.log("Downloading book with ID:", bookId);
  };

  return (
    <div className="wallet">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="wallet_container">
        
        <div className="book-list">
          <h2>Available Books</h2>
          {books.length === 0 ? (
            <p>Loading books...</p>
          ) : (
            <ul>
              {books.map((book) => (
                <li key={book.id}>
                  <span>{book.title}</span>
                  <button onClick={() => handleDownload(book.id)}>Download</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
