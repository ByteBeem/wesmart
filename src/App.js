import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logo from "./components/Logo/Logo";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Wallet from "./Pages/wallet/Wallet";
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
    <AuthProvider>
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
              path="Search"
              element={
                <Profile
                  showSidebar={showSidebar}
                  closeSidebar={closeSidebar}
                  active={active}
                />
              }
            />
            <Route
              path="books"
              element={
                <Reset
                  showSidebar={showSidebar}
                  closeSidebar={closeSidebar}
                  active={active}
                />
              }
            />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
