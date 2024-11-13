import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  Container,
  Image,
  Box,
  Text,
  Flex,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Skeleton } from "@chakra-ui/react";

const SearchLikedSongs = () => {
  const [userData, setUserData] = useState(null);
  const [liked, setLiked] = useState([]);
  const { email } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const handleLike = async (index) => {
    const song = userData.likedSongs[index];
    const isLiked = liked[index];

    try {
      if (isLiked) {
        // Unlike the song
        await fetch("https://tunesmusicapp.onrender.com/deleteLikedSong", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            songId: song._id,
          }),
        });
      } else {
        // Like the song
        await fetch("https://tunesmusicapp.onrender.com/likedSong", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            songName: song.name,
            songLink: song.link,
          }),
        });
      }

      // Update local state after the API call
      const newLiked = [...liked];
      newLiked[index] = !newLiked[index];
      setLiked(newLiked);
    } catch (err) {
      console.error("Error toggling like for song", err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://tunesmusicapp.onrender.com/searchUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ query: email }),
          }
        );
        const data = await response.json();
        console.log("Fetched user data:", data); // Debug log

        setUserData(data);

        if (data.likedSongs) {
          const userResponse = await fetch(
            "https://tunesmusicapp.onrender.com/user",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const userData = await userResponse.json();
          console.log("Logged-in user data:", userData); // Debug log

          const likedSongs = userData.likedSongs || [];
          const newLiked = data.likedSongs.map((song) =>
            likedSongs.some(
              (likedSong) =>
                likedSong.name === song.name && likedSong.link === song.link
            )
          );
          console.log("New liked state:", newLiked); // Debug log
          setLiked(newLiked);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  if (isLoading) {
    return (
      <Container>
        <Row className="mt-4 justify-content-center">
          <Col md={6}>
            <Skeleton height="4rem" width="100%" />
            <Skeleton height="4rem" width="100%" />
            <Skeleton height="4rem" width="100%" />
          </Col>
        </Row>
      </Container>
    );
  }

  if (!userData || !userData.likedSongs || userData.likedSongs.length === 0) {
    return (
      <Container maxW="full" ml={{ md: "8rem" }}>
        <Row className="mt-4 justify-content-center">
          <Col md={8}>
            <Box>
              <Box>
                <Text
                  fontSize={{ base: "2xl", md: "5xl" }}
                  textColor="white"
                  fontWeight="bold"
                >
                  Liked Songs
                </Text>
              </Box>
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
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container maxW="full" mb={20}>
      <Row className="mt-4 justify-content-center">
        <Col md={6}>
          <Box>
            <Card.Body>
              <Col md={8} style={{ marginBottom: "3.4rem" }}>
                <Text
                  fontSize={{ base: "2xl", md: "5xl" }}
                  textColor="white"
                  fontWeight="bold"
                >
                  Liked Songs
                </Text>
              </Col>

              {userData.likedSongs.map((song, index) => (
                <div
                  className="d-flex align-items-center gap-1 mb-1"
                  key={song._id} // Use song._id as the key
                >
                  {isLoading ? (
                    <Skeleton height="4rem" width="100%" />
                  ) : (
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
                      <Flex className="d-flex justify-content-between">
                        <Image
                          src="/AlbumLogo.png"
                          alt="Logo"
                          rounded="md"
                          boxSize="12"
                          mr={2}
                        />
                        <Text
                          fontSize="md"
                          textColor="white"
                          fontWeight="semibold"
                        >
                          {song.name}
                        </Text>
                      </Flex>

                      <Flex gap={3}>
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
                            _hover={{
                              bg: "#1ED760",
                              transform: "scale(1.1)",
                            }}
                            icon={<FaPlay color="black" />}
                            onClick={() => window.open(song.link, "_blank")}
                          />
                        </Tooltip>

                        <Tooltip
                          hasArrow
                          label="Like"
                          placement="right"
                          ml={1}
                          openDelay={1200}
                        >
                          <IconButton
                            bg="transparent"
                            border="none"
                            _hover={{
                              transform: "scale(1.2)",
                            }}
                            onClick={() => handleLike(index)}
                          >
                            {liked[index] ? (
                              <FaHeart size={25} color="#1DB954" />
                            ) : (
                              <FaRegHeart size={25} color="white" />
                            )}
                          </IconButton>
                        </Tooltip>
                      </Flex>
                    </Flex>
                  )}
                </div>
              ))}
            </Card.Body>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchLikedSongs;
