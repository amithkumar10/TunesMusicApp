import React, { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import FavCard from "./FavCard";

const FavouriteSongs = () => {
  const location = useLocation();
  const { email } = useParams();

  return (
    <Box mt={{ base: "16", md: "32" }}>
      <Row className="mb-2 justify-content-center">
        <Col md={6}>
          <Text
            fontSize={{ base: "2xl", md: "5xl" }}
            textColor="white"
            fontWeight="bold"
          >
            Favourite Songs
          </Text>
        </Col>
      </Row>

      <FavCard />
    </Box>
  );
};

export default FavouriteSongs;

// import React from "react";
// import { Container, Box, Heading, Flex } from "@chakra-ui/react";
// import { useLocation, useParams } from "react-router-dom";
// import FavCard from "./FavCard";

// const FavouriteSongs = () => {
//   // return (
//   //   <Container
//   //     maxW="container.lg"
//   //     justifyContent="start"
//   //     mt={{ base: "8", md: "28" }}
//   //   >
//   //     <Box alignContent="center" mb={{ md: "8", sm: "40" }}>
//   //       <Heading color="white" size="2xl">
//   //         Favourite Songs
//   //       </Heading>
//   //     </Box>

//   //     <FavCard />
//   //   </Container>
//   // );

//   return (
//     <Container
//       justifyContent="center"
//       alignItems="center"
//       maxW="container.lg"
//       mt={{ base: "8", md: "28" }}
//       px={{ base: "4", md: "8" }} // Add padding to adjust alignment
//     >
//       <Box mb={{ md: "8", sm: "40" }} justifyContent="center">
//         <Heading color="white" size="2xl">
//           Favourite Songs
//         </Heading>
//       </Box>

//       <FavCard />
//     </Container>
//   );
// };

// export default FavouriteSongs;
