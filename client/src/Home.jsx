import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Container, Spinner } from "@chakra-ui/react";
import AppNavbar from "./assets/components/AppNavbar";
import Profile from "./assets/components/Profile";
import FavouriteSongs from "./assets/components/FavouriteSongs";
import LikedSongs from "./assets/components/LikedSongs";
import Footer from "./assets/components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [authStatus, setAuthStatus] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      // .get("https://tunesmusicapp.onrender.com/", { withCredentials: true })
      .get("http://localhost:3000/", { withCredentials: true })
      .then((result) => {
        if (result.data === "Success") {
          setAuthStatus("Authenticated");
        } else {
          setAuthStatus("Not authenticated");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        setAuthStatus("Error");
        navigate("/login");
      });
  }, [navigate]);

  if (authStatus === null) {
    return (
      <Box
        bgGradient="linear(to-r, black, gray.800)"
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" color="white" />
      </Box>
    );
  }

  return (
    <Box
      bgGradient="linear(to-r, black, gray.800)"
      minHeight="100vh"
      justifyContent="center"
      overflowX="hidden"
    >
      <AppNavbar />
      <Container maxW="100%" px={{ base: 4, md: 8 }}>
        <Profile />
        <FavouriteSongs />
        <LikedSongs />
        <Footer />
      </Container>
    </Box>
  );
};

export default Home;
