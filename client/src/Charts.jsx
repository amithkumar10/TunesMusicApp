import React from "react";
import FilterCharts from "./assets/components/FilterCharts";
import AppNavbar from "./assets/components/AppNavbar";
import Footer from "./assets/components/Footer";
import { Box } from "@chakra-ui/react";
import Genre from "./Genre";

const Charts = () => {
  return (
    <>
      <Box
        bgGradient="linear(to-r, black, gray.800)"
        py={1}
        px={1}
        minHeight="100vh"
      >
        <AppNavbar />
        <FilterCharts />
      </Box>
      <Footer />
    </>
  );
};

export default Charts;
