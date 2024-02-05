import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./wallet.scss";
import "../../App.scss";

const Wallet = ({ showSidebar, active, closeSidebar }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `https://mainp-server-c7a5046a3a01.herokuapp.com/books`
      );
      const data = response.data;

      setBooks(data);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching books.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

 

  return (
    <div className="wallet">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="wallet_container">
        <div className="book-list">
          <h2>Grade12 Study Materials</h2>
          <div className="scroll-view">
            {loading ? (
              <p>Loading materials...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <ul>
                {books.map((book) => (
                  <li key={book.id}>
                    <span>{book.name}</span>
                    <button onClick={() => window.location.href = book.downloadLink}>Download</button>

                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;