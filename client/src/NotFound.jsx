import React from "react";
import { Button, Text, VStack, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear-gradient(to bottom, #f7f7f7, #e7e7e7)"
    >
      <VStack spacing={8} align="center">
        <Text fontSize="6xl" fontWeight="bold" color="#333">
          404
        </Text>
        <Text fontSize="lg" color="#666" textAlign="center">
          Sorry, the page you are looking for does not exist.
        </Text>
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={handleLogin}
          px={8}
          py={4}
          fontSize="lg"
          borderRadius="md"
          boxShadow="md"
        >
          Login to TUNES
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
