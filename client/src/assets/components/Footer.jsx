import React from "react";
import { Box, Container, Text, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  const gradientBg = useColorModeValue(
    "linear(to-r, gray.900, gray.700)",
    "linear(to-r, gray.900, gray.700)"
  );

  return (
    <Box
      as="footer"
      bgGradient={gradientBg}
      color="white"
      py={4}
      textAlign="center"
      width="100%"
    >
      <Container maxW="container.xl">
        <Text>&copy; 2024 Tunes. All rights reserved.</Text>
      </Container>
    </Box>
  );
};

export default Footer;
