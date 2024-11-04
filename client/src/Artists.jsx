import React from "react";
import FilterArtists from "./assets/components/FilterArtists";
import AppNavbar from "./assets/components/AppNavbar";
import Footer from "./assets/components/Footer";
import { Box } from "@chakra-ui/react";

const Artists = () => {
  return (
    <>
      <Box
        bgGradient="linear(to-r, black, gray.800)"
        py={1}
        px={1}
        minHeight="100vh"
      >
        <AppNavbar />
        <FilterArtists />
      </Box>
      <Footer />
    </>
  );
};

export default Artists;
