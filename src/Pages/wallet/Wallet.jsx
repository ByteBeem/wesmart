import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./wallet.scss";
import "../../App.scss";

const Wallet = ({ showSidebar, active, closeSidebar }) => {
  // Assuming you have a list of books
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch your book data using axios or any other method
    // For now, let's add some example books
    const exampleBooks = [
      { id: 1, title: "The Great Gatsby" },
      { id: 2, title: "To Kill a Mockingbird" },
      { id: 3, title: "1984" },
      { id: 4, title: "Pride and Prejudice" },
      { id: 5, title: "The Catcher in the Rye" },
      { id: 6, title: "One Hundred Years of Solitude" },
      { id: 7, title: "The Hobbit" },
      { id: 8, title: "Brave New World" },
      { id: 9, title: "The Lord of the Rings" },
      { id: 10, title: "The Chronicles of Narnia" },
      { id: 11, title: "The Great Gatsby" },
      { id: 12, title: "To Kill a Mockingbird" },
      { id: 13, title: "1984" },
      { id: 14, title: "Pride and Prejudice" },
      { id: 15, title: "The Catcher in the Rye" },
      { id: 16, title: "One Hundred Years of Solitude" },
      { id: 17, title: "The Hobbit" },
      { id: 18, title: "Brave New World" },
      { id: 19, title: "The Lord of the Rings" },
      { id: 20, title: "The Chronicles of Narnia" },
    ];

    // Update the 'books' state with the fetched data
    setBooks(exampleBooks);
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
          <div className="scroll-view">
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
    </div>
  );
};

export default Wallet;
