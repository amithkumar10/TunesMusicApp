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
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

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
          "https://tunesmusicapp.onrender.com/genres"
        );
        const data = await response.json();
        // Assuming the API returns a `data` array with genre details
        setGenres(data.slice(0, 3)); // Fetch only the 2nd, 3rd, and 4th genres
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
          isLoading || genres.length === 0 ? (
            <Skeleton height="300px" borderRadius="md">
              <SkeletonText mt="4" noOfLines={2} spacing="4" />
            </Skeleton>
          ) : (
            <ControlledGenresCarousel genres={genres} onClick={handleClick} />
          )
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} height="300px" borderRadius="md">
                    <SkeletonText mt="4" noOfLines={2} spacing="4" />
                  </Skeleton>
                ))
              : genres.map((genre) => (
                  <GenreCard
                    key={genre._id}
                    genre={genre.name}
                    coverImage={genre.coverImage}
                    onClick={() => handleClick(genre)}
                  />
                ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default FilteredGenres;
