import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logo from "./components/Logo/Logo";
import Home from "./Pages/Home/Home";
import Search from "./Pages/Search/Search";
import Materials from "./Pages/Materials/Materials";
import Request from "./Pages/Request/Request";
import { Analytics } from '@vercel/analytics/react';


function App() {
  const [active, setActive] = useState("");

  const showSidebar = () => {
    setActive("active");
  };

  const closeSidebar = () => {
    setActive("");
  };

  return (

    <Router>
      <Logo />
      <Analytics />

      <Routes>
        <Route path="/">
          <Route index element={<Home />} />


          <Route
            path="Home"
            element={
              <Home
                showSidebar={showSidebar}
                closeSidebar={closeSidebar}
                active={active}
              />
            }
          />
          <Route
            path="books"
            element={
              <Materials
                showSidebar={showSidebar}
                closeSidebar={closeSidebar}
                active={active}
              />
            }
          />
          <Route
            path="search"
            element={
              <Search
                showSidebar={showSidebar}
                closeSidebar={closeSidebar}
                active={active}
              />


            }
          />

          <Route
            path="request"
            element={
              <Request
                showSidebar={showSidebar}
                closeSidebar={closeSidebar}
                active={active}
              />


            }
          />

        </Route>
      </Routes>
    </Router>

  );
}

export default App;
