import React from "react";
import Signup from "./Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import NotFound from "./NotFound"; // Create this component
import SearchHome from "./SearchHome";
import About from "./About";
import UserNotFound from "./assets/components/UserNotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/:email" element={<Home />} />
        <Route path="/:email/search" element={<SearchHome />} />
        <Route path="/unf" element={<UserNotFound />} />
        <Route path="*" element={<NotFound />} /> {/* Fallback route */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
