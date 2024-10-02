import React, { useState, useEffect } from "react";
import { Spinner, Box, Text } from "@chakra-ui/react";
import AppNavbar from "./AppNavbar";

const UserNotFound = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <div>
      <AppNavbar />
      <Box textAlign="center" mt={8}>
        <Text fontSize="4xl" fontWeight="bold">
          User Not Found
        </Text>
        <Text>The user you are looking for does not exist.</Text>
      </Box>
    </div>
  );
};

export default UserNotFound;
