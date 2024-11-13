import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Skeleton } from "@chakra-ui/react";
import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { IconButton, Tooltip } from "@chakra-ui/react";

const SearchFavSongs = () => {
  const [userData, setUserData] = useState(null);
  const [liked, setLiked] = useState([]);
  const { email } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const handleLike = async (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);

    const song = userData.favouriteSongs[index];

    try {
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
        setUserData(data);

        if (data.favouriteSongs) {
          // Fetch the logged-in user's liked songs to set the initial liked state
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
          const likedSongs = userData.likedSongs || [];

          const newLiked = data.favouriteSongs.map((song) =>
            likedSongs.some(
              (likedSong) =>
                likedSong.name === song.name && likedSong.link === song.link
            )
          );
          setLiked(newLiked);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchUserData();
  }, [email]);

  if (!userData || userData.favouriteSongs.length === 0) {
    return (
      <Container maxW="full">
        <Row className="mt-4 justify-content-center">
          <Col md={8}>
            <Box ml={{ md: "7rem" }} my={{ md: "8rem" }}>
              <Box>
                <Text
                  fontSize={{ base: "2xl", md: "5xl" }}
                  textColor="white"
                  fontWeight="bold"
                >
                  Favourite Songs
                </Text>
              </Box>
              <Box
                bg="gray.700"
                p={2}
                rounded="md"
                maxW="10rem"
                maxH="3rem"
                alignItems="center"
              >
                <Text textColor="white">No Favourite Songs</Text>
              </Box>
            </Box>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container maxW="full" marginBottom="8rem">
      <Row className="  justify-content-center" style={{ marginTop: "8rem" }}>
        <Col md={6}>
          <Box border="none">
            <Card.Body>
              <Col md={8} style={{ marginBottom: "3.4rem" }}>
                <Text
                  fontSize={{ base: "2xl", md: "5xl" }}
                  textColor="white"
                  fontWeight="bold"
                >
                  Favourite Songs
                </Text>
              </Col>

              {userData.favouriteSongs.map((song, index) => (
                <div className="d-flex align-items-center mb-1" key={index}>
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
                      <Flex align="center" gap={2}>
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

export default SearchFavSongs;
