import React, { useState, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";

import {
  Box,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { FaPlay, FaMinus } from "react-icons/fa";

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await fetch(
          "https://tunesmusicapp.onrender.com/user",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setLikedSongs(data.likedSongs || []);
      } catch (err) {
        console.error("Error fetching liked songs", err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchLikedSongs();
  }, []);

  const handleDelete = async (index) => {
    try {
      const songToDelete = likedSongs[index];
      const response = await fetch(
        "https://tunesmusicapp.onrender.com/deleteLikedSong",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            songId: songToDelete._id,
          }),
        }
      );
      if (response.ok) {
        const updatedSongs = likedSongs.filter((_, i) => i !== index);
        setLikedSongs(updatedSongs);
      } else {
        console.error("Failed to delete song");
      }
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  return (
    <Container maxW="container.lg" mt={{ base: "8", md: "16" }}>
      <Box mt={{ base: "16", md: "32" }} mr={{ md: "4rem" }}>
        <Row className="mb-2 justify-content-center mr-[20px]">
          <Col md={6}>
            <Text
              fontSize={{ base: "2xl", md: "5xl" }}
              textColor="white"
              fontWeight="bold"
            >
              Liked Songs
            </Text>
          </Col>
        </Row>
      </Box>

      <Flex direction="column" align="center" mb={20}>
        {isLoading ? (
          <Skeleton height="4rem" width={{ base: "full", md: "55%" }} />
        ) : likedSongs.length > 0 ? (
          likedSongs.map((song, index) => (
            <Flex
              key={index}
              direction="row"
              align="center"
              justifyContent="flex-start"
              mb={1}
              width={{ base: "full", md: "55%" }}
            >
              <Flex
                bgGradient="linear(to-r, black, gray.800)"
                p={4}
                borderLeft="2px"
                borderBottom="1px"
                borderColor="gray.700"
                rounded="md"
                shadow="md"
                flex="1"
                justifyContent="space-between"
                align="center"
                height="4rem"
              >
                <Flex align="center" gap={2}>
                  <Image
                    src="/public/AlbumLogo.png"
                    alt="Logo"
                    rounded="md"
                    boxSize="12"
                    mr={2}
                  />
                  <Text fontSize="md" textColor="white" fontWeight="semibold">
                    {song.name}
                  </Text>
                </Flex>

                <Flex gap={4} align="center">
                  <Tooltip
                    hasArrow
                    label="Play"
                    placement="left"
                    ml={1}
                    openDelay={1200}
                  >
                    <IconButton
                      rounded="full"
                      aria-label="Play"
                      boxSize={10}
                      bg="#1DB954"
                      _hover={{ bg: "#1ED760", transform: "scale(1.1)" }}
                      icon={<FaPlay color="black" />}
                      onClick={() => window.open(song.link, "_blank")}
                    />
                  </Tooltip>
                  <Tooltip
                    hasArrow
                    label="Remove Song"
                    placement="right"
                    ml={1}
                    openDelay={500}
                  >
                    <IconButton
                      aria-label="Delete"
                      rounded="full"
                      icon={<FaMinus color="gray" />}
                      color="red.500"
                      boxSize={6}
                      p={1}
                      onClick={() => handleDelete(index)}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            </Flex>
          ))
        ) : (
          <Box mr={{ base: "13rem", md: "30rem" }}>
            <Box
              bg="gray.700"
              p={2}
              rounded="md"
              maxW="8rem"
              maxH="3rem"
              alignItems="center"
            >
              <Text textColor="white">No Liked Songs</Text>
            </Box>
          </Box>
        )}
      </Flex>
    </Container>
  );
};

export default LikedSongs;
