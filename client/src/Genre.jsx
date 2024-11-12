import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import SongCard from "./assets/components/SongCard";
import AppNavbar from "./assets/components/AppNavbar";
import Footer from "./assets/components/Footer";
import {
  Box,
  Text,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react"; // Add Skeleton and SkeletonText

const Genre = () => {
  const { genreName } = useParams(); // Get the genre name from the URL
  const [songs, setSongs] = useState([]);
  const [liked, setLiked] = useState([]); // Track liked state per song
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate(); // For redirection

  // Map of genres to their corresponding gradient backgrounds
  const genreGradients = {
    pop: "linear(to-b, orange.600, yellow.300)",
    "rap-hip-hop": "linear(to-b, gray.700, red.400)",
    rock: "linear(to-b, blue.900, gray.200)",
    dance: "linear(to-b, red.500, yellow.300)",
    "r&b": "linear(to-b, purple.900, blue.300)",
    alternative: "linear(to-b, purple.900, pink.400)",
  };

  const genreDisplayName = genreName
    .split("-") // Handle genre names like "hip-hop"
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true); // Set loading to true when fetching starts
      try {
        const response = await fetch(
          `https://tunesmusicapp.onrender.com/api/songs?genre=${genreName}`
        );
        const data = await response.json();
        setSongs(data); // Adjust according to your API response structure

        // Initialize liked state for all songs to 'false'
        setLiked(new Array(data.length).fill(false));
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchSongs();
  }, [genreName]);

  // Handle liking/unliking a song
  const handleLike = async (index) => {
    const song = songs[index];
    const isLiked = liked[index];

    try {
      let response;
      if (isLiked) {
        // Unlike the song
        response = await fetch(
          "https://tunesmusicapp.onrender.com/deleteLikedSong",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              songId: song._id, // Use the song's unique ID
            }),
          }
        );
      } else {
        // Like the song
        response = await fetch("https://tunesmusicapp.onrender.com/likedSong", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            songName: song.title,
            songLink: song.link,
          }),
        });
      }

      // Check if the response is a 403 Forbidden
      if (response.status === 403) {
        alert("Please login to like a song.");
        navigate("/login"); // Redirect to login page
      } else {
        // Update local liked state after the API call
        const newLiked = [...liked];
        newLiked[index] = !newLiked[index];
        setLiked(newLiked);
      }
    } catch (err) {
      console.error("Error toggling like for song", err);
    }
  };

  return (
    <>
      <Box bgGradient="linear(to-r, black, gray.800)" h="auto">
        <AppNavbar />

        {/* Genre card with background gradient */}
        <Box
          width={{ base: "90%", md: "80%" }}
          mx="auto" // Center the card horizontally
          mt={8}
          bgGradient={
            genreGradients[genreName.toLowerCase()] ||
            "linear(to-b, gray.800, gray.600)" // Default fallback gradient
          }
          bgSize="cover"
          bgPosition="center"
          height="20rem"
          borderRadius="lg"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color="white"
            textAlign="center"
            textTransform="capitalize"
            bg="rgba(0, 0, 0, 0.6)" // Background overlay for readability
            p={4}
            borderRadius="md"
          >
            {genreDisplayName} Genre
          </Text>
        </Box>

        {/* Song cards */}
        <Box mt={8} width={{ base: "90%", md: "80%" }} mx="auto">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
            {isLoading ? (
              // Display skeletons while loading
              Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} height="9.5rem" borderRadius="md">
                  <SkeletonText mt="4" noOfLines={4} spacing="4" />
                </Skeleton>
              ))
            ) : songs.length > 0 ? (
              // Display the song cards once the data is loaded
              songs.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  liked={liked[index]}
                  onToggleLike={() => handleLike(index)}
                />
              ))
            ) : (
              <Text color="white" textAlign="center" fontSize="lg">
                No songs available for this genre.
              </Text>
            )}
          </SimpleGrid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Genre;
