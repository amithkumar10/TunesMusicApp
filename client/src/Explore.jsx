import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Center,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import AppNavbar from "./assets/components/AppNavbar";

import Genres from "./Genres";
import FilteredGenres from "./assets/components/FilterGenres";
import FilterCharts from "./assets/components/FilterCharts";
import Footer from "./assets/components/Footer";
import FilterArtists from "./assets/components/FilterArtists";

const Explore = () => {
  return (
    <>
      <AppNavbar />
      <Box
        bgGradient="linear(to-r, black, gray.800)"
        py={10}
        px={5}
        minHeight="100vh"
      >
        {/* <FilterCharts />
        <FilterArtists /> */}
        <FilteredGenres />
      </Box>
      <Footer />
    </>
  );
};

export default Explore;
