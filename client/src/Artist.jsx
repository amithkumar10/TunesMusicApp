import React from "react";
import AppNavbar from "./assets/components/AppNavbar";
import { Box } from "@chakra-ui/react";
import Footer from "./assets/components/Footer";

const Artist = () => {
  return (
    <>
      <Box mb={20}>
        <AppNavbar />
      </Box>
      <Footer />
    </>
  );
};

export default Artist;
