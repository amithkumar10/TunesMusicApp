// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Footer = () => {
//   const footerStyle = {
//     backgroundColor: "#343a40",
//     color: "#ffffff",
//     padding: "1rem",
//     marginTop: "6rem",
//     textAlign: "center",
//     height: "full",
//   };

//   return (
//     <footer style={footerStyle}>
//       <Container>
//         <Row>
//           <Col>
//             <p>&copy; 2024 Tunes. All rights reserved.</p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;

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
      mt={24}
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
