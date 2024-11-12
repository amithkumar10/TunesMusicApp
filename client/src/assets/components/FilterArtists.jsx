import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  useBreakpointValue,
  SkeletonCircle,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import ArtistCard from "./ArtistCard";
import ControlledArtistsCarousel from "./ControlledArtistsCarousel";
import { useNavigate, useLocation } from "react-router-dom";

const FilterArtists = () => {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false }); // Detect screen size

  const handleShowArtists = () => {
    navigate("/artists");
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(
          "https://tunesmusicapp.onrender.com/api/songs"
        );
        const data = await response.json();
        if (location.pathname === "/explore") {
          setArtists(data.slice(5, 10)); // Fetch only the first 3 songs on /explore
        } else {
          setArtists(data); // Fetch all data on other routes
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, [location.pathname]);

  return (
    <Box mb={20}>
      <Text
        fontSize={{ base: "30", md: "45" }}
        fontWeight="bold"
        textColor="white"
        ml={{ base: "10", md: "12" }}
        mt={12}
      >
        Top Artists
      </Text>
      {location.pathname === "/explore" ? (
        <Text
          textAlign="right"
          mr={20}
          textColor="white"
          cursor="pointer"
          onClick={handleShowArtists}
          _hover={{ color: "gray.300" }}
        >
          Show all
        </Text>
      ) : null}

      <Box mt={0} px={10}>
        {isMobile ? (
          // Display carousel on mobile screens
          isLoading ? (
            Array.from({ length: 1 }).map((_, index) => (
              <Skeleton key={index} height="300px" borderRadius="md">
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Skeleton>
            ))
          ) : (
            <ControlledArtistsCarousel artists={artists} />
          )
        ) : (
          // Display grid on larger screens
          <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={4}>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonCircle key={index} size="250px">
                    <SkeletonText mt="4" noOfLines={2} spacing="4" />
                  </SkeletonCircle>
                ))
              : artists.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    artistName={artist.artist}
                    coverImage={artist.artistImg}
                    songLink={artist.link}
                    isMobile={isMobile} // Pass isMobile prop
                  />
                ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default FilterArtists;
