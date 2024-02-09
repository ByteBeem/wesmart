import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Materials.scss";
import "../../App.scss";

const Wallet = ({ showSidebar, active, closeSidebar }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
  }, []);


  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="wallet">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="wallet_container">
        <div className="book-list">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <h2>Grade12 Study Materials</h2>




          <div className="scroll-view">
            {loading ? (
              <p>Loading materials...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <ul>
                {filteredBooks.map((book) => (
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
