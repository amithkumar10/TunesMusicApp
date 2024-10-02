import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.100"
      textAlign="center"
    >
      <Box mb={4}>
        <h2>404 - Page Not Found</h2>
      </Box>
      <Button colorScheme="teal" onClick={handleClick}>
        Log in to Tunes
      </Button>
    </Box>
  );
};

export default NotFound;
