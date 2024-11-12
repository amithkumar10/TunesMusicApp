import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  useBreakpointValue,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import GenreCard from "./GenreCard";
import ControlledGenresCarousel from "./ControlledGenresCarousel";
import { useNavigate } from "react-router-dom";

const FilteredGenres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Replace these URLs with your own images
  const coverImages = ["./pop.jpeg", "./hiphop.jpeg", "./rock.jpeg"];
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false }); // Detect screen size

  const handleShowGenre = () => {
    navigate("/genres");
  };

  // Handle clicking on individual genres
  const handleClick = (genre) => {
    const genreName = genre.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\//g, "-");
    navigate(`/genres/${genreName}`);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://tunesmusicapp.onrender.com/api/genres"
        );
        const data = await response.json();
        setGenres(data.data.slice(1, 4)); // Fetch only the 2nd, 3rd, and 4th genres
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchGenres();
  }, []);

  return (
    <Box bgGradient="linear(to-r, black, gray.800)" mt={36} mb={20}>
      <Text
        fontSize={{ base: "30", md: "45" }}
        fontWeight="bold"
        textColor="white"
        ml={{ base: "10", md: "12" }}
        mt={12}
      >
        Explore Genres
      </Text>
      <Text
        textAlign="right"
        mr={20}
        textColor="white"
        cursor="pointer"
        onClick={handleShowGenre}
        _hover={{ color: "gray.300" }}
      >
        Show all
      </Text>
      <Box mt={0} px={10}>
        {isMobile ? (
          isLoading ? (
            <Skeleton height="300px" borderRadius="md">
              <SkeletonText mt="4" noOfLines={2} spacing="4" />
            </Skeleton>
          ) : (
            <ControlledGenresCarousel
              genres={genres}
              coverImages={coverImages}
              onClick={handleClick} // Pass the click handler here
            />
          )
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} height="300px" borderRadius="md">
                    <SkeletonText mt="4" noOfLines={2} spacing="4" />
                  </Skeleton>
                ))
              : genres.map((genre, index) => (
                  <GenreCard
                    key={genre.id}
                    genre={genre}
                    coverImage={coverImages[index]}
                    onClick={() => handleClick(genre)} // Handle click on genre card
                  />
                ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default FilteredGenres;
