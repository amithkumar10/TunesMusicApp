import React from "react";
import Signup from "./Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import NotFound from "./NotFound";
import SearchHome from "./SearchHome";
import About from "./About";
import UserNotFound from "./assets/components/UserNotFound";
import Explore from "./Explore";
import Genres from "./Genres";
import Genre from "./Genre";
import Artist from "./Artist";
import Artists from "./Artists";
import Charts from "./Charts";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:genreName" element={<Genre />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artistprofile" element={<Artist />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/:email" element={<Home />} />
        <Route path="/:email/search" element={<SearchHome />} />
        <Route path="/unf" element={<UserNotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
