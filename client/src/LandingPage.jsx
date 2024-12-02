import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, black, gray.800)"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="6xl" px={4}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={44}
        >
          {/* Left Content */}
          <VStack
            spacing={4}
            align={{ base: "center", md: "flex-start" }}
            w={{ base: "full", md: "50%" }}
          >
            <HStack spacing={4} justify={{ base: "center", md: "flex-start" }}>
              <Heading
                as="h1"
                size="2xl"
                bgGradient="linear(to-r, white, gray.300)"
                bgClip="text"
              >
                TUNES
              </Heading>
              <Image
                src="./TunesLogo.png"
                alt="Music Note"
                boxSize="5rem"
                objectFit="contain"
              />
            </HStack>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.300">
              Discover, Stream, and Enjoy Unlimited Music
            </Text>
            <Text
              fontSize="md"
              color="gray.400"
              textAlign={{ base: "center", md: "left" }}
              display={{ base: "none", md: "block" }}
            >
              Experience music like never before. Explore millions of tracks,
              create your perfect favlists, and connect with artists worldwide.
            </Text>
            <Button
              size="lg"
              variant="outline"
              borderColor="whiteAlpha.500"
              _hover={{ bg: "whiteAlpha.200" }}
              rightIcon={<ArrowForwardIcon />}
              textColor="white"
              onClick={handleClick}
            >
              Login to TUNES
            </Button>
          </VStack>

          {/* Right Content - Placeholder Image/Graphic */}
          <Box
            w={{ base: "full", md: "50%" }}
            textAlign="center"
            display={{ base: "none", md: "block" }}
          >
            <Image
              src="/AuthIMG.png"
              alt="Music App Illustration"
              borderRadius="lg"
              shadow="2xl"
              maxW="60%"
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default LandingPage;
