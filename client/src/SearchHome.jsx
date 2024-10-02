import React from "react";
import { Box, Container } from "@chakra-ui/react";
import SearchProfile from "./assets/components/SearchProfile";
import SearchFavSongs from "./assets/components/SearchFavSongs";
import Footer from "./assets/components/Footer";
import SearchLikedSongs from "./assets/components/SearchLikedSongs";

const SearchHome = () => {
  return (
    <Box bgGradient="linear(to-r, black, gray.800)" minHeight="100vh">
      <Container border="none" maxW="100%">
        <SearchProfile />
        <SearchFavSongs />
        <SearchLikedSongs />
        <Footer />
      </Container>
    </Box>
  );
};

export default SearchHome;
