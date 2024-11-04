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

const About = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const iconColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <AppNavbar />
      <Box
        bgGradient="linear(to-r, black, gray.800)"
        py={10}
        px={5}
        minHeight="100vh"
      >
        <Container maxW="container.lg">
          <Center>
            <Box
              bg={cardBg}
              color={textColor}
              p={10}
              borderRadius="md"
              boxShadow="lg"
              textAlign="center"
            >
              <VStack spacing={5}>
                <Heading as="h1" size={{ base: "lg", md: "xl" }}>
                  About This Website
                </Heading>
                <Text fontSize={{ base: "md", md: "lg" }}>
                  This web app is a platform where users can log in, upload
                  their favorite songs, and search for friends' accounts. Users
                  can like their friends' favorite songs, explore music through
                  various genres, view the top charts, and listen to their
                  favorite artists. Built using modern web technologies, it
                  provides a seamless and interactive experience for music
                  enthusiasts.
                </Text>
                <Text fontSize={{ base: "md", md: "lg" }}>
                  <strong>Technologies Used:</strong> React, Node.js, Express,
                  MongoDB, React-Bootstrap, Chakra UI
                </Text>
                <HStack
                  justify={{ base: "center", md: "space-between" }}
                  width="full"
                  flexDirection={{ base: "column", md: "row" }}
                >
                  <Text
                    fontFamily="'Open Sans', sans-serif"
                    fontSize={{ base: "16px", md: "20px" }}
                    textAlign={{ base: "center", md: "right" }}
                  >
                    ~Amithkumar P Radhakrishnan
                  </Text>
                  <HStack spacing={5} mt={5}>
                    <Link href="https://github.com/amithkumar10" isExternal>
                      <Icon as={FaGithub} w={8} h={8} color={iconColor} />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/amithkumar-p-radhakrishnan-7179b8283/"
                      isExternal
                    >
                      <Icon as={FaLinkedin} w={8} h={8} color={iconColor} />
                    </Link>
                    <Link
                      href="https://www.instagram.com/amithkumar_10/"
                      isExternal
                    >
                      <Icon as={FaInstagram} w={8} h={8} color={iconColor} />
                    </Link>
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default About;
