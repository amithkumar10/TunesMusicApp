import React, { useEffect, useState } from "react";
import GenreCard from "./assets/components/GenreCard";
import {
  Box,
  SimpleGrid,
  Text,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import AppNavbar from "./assets/components/AppNavbar";
import Footer from "./assets/components/Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize navigate

  const coverImages = [
    "./pop.jpeg",
    "./hiphop.jpeg",
    "./rock.jpeg",
    "./dance.jpeg",
    "./rnb.jpeg",
    "./alternateMusic.jpeg",
    "./electro.jpeg",
    "./folk.jpeg",
    "./reggae.jpeg",
    "./jazz.jpeg",
    "./classical.jpeg",
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://tunesmusicapp.onrender.com/genres"
        );

        const data = await response.json();
        console.log(data);
        setGenres(data); // Fetch only the first 12 genres
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchGenres();
  }, []);

  const handleClick = (genre) => {
    const genreName = genre.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\//g, "-");
    navigate(`/genres/${genreName}`);
  };

  return (
    <Box bgGradient="linear(to-r, black, gray.800)">
      <AppNavbar />
      <Text
        fontSize={{ base: "40", md: "58" }}
        fontWeight="bold"
        textColor="white"
        ml={{ base: "10", md: "12" }}
        mt={20}
      >
        Explore Genres
      </Text>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={4}
        mt={10}
        px={10}
        mb={48}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} height="300px" borderRadius="md">
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Skeleton>
            ))
          : genres.map((genre, index) => (
              <GenreCard
                onClick={() => handleClick(genre)} // Pass the genre to handleClick
                key={genre.id}
                genre={genre}
                coverImage={coverImages[index]}
              />
            ))}
      </SimpleGrid>
      <Footer />
    </Box>
  );
};

export default Genres;
