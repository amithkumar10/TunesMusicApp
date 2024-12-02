import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import { Container, Box, Flex, Text, Skeleton } from "@chakra-ui/react";
import { Row, Col } from "react-bootstrap";
import NotFound from "../../LandingPage";

const SearchProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://tunesmusicapp.onrender.com/searchUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ query: email }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setIsLoading(false); // Set loading to false after the data is fetched
      }
    };

    const timer = setTimeout(() => {
      fetchUserData();
      setIsLoading(false);
    }, 2000); // Simulate loading time of 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [email]);

  if (isLoading) {
    return (
      <>
        <AppNavbar style={{ marginBottom: "20px" }} />
        <Container maxW="100%">
          <Row className="justify-content-center">
            <Col md={12}>
              <Skeleton minH={{ base: "20rem", md: "34rem" }} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  if (!userData) {
    return <NotFound />;
  }

  return (
    <>
      <AppNavbar />
      <Container maxW="100%">
        <Row className="justify-content-center">
          <Col md={12}>
            <Box
              bgImage="url('./TunesProfileBg.jpeg')"
              bgSize="cover"
              bgPosition="center"
              objectFit="cover"
              borderRadius="md"
              boxShadow="md"
              minH={{ base: "20rem", md: "34rem" }}
              w="100%"
              color="white"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
            >
              <Flex
                alignItems="center"
                flexWrap={{ base: "wrap", md: "nowrap" }}
              >
                <Box flex="1" p={10}>
                  <Box className="h3" fontSize="2xl" fontWeight="bold">
                    <Text
                      fontSize={{ base: "2xl", md: "8xl" }}
                      fontWeight="extrabold"
                    >
                      {userData.name}
                    </Text>
                  </Box>
                  <Box mt={2} ml={{ md: "6" }}>
                    <Text fontSize={{ md: "lg" }} mt={{ base: "0", md: "2" }}>
                      {userData.bio}
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchProfile;
