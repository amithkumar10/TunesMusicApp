import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Skeleton,
  SkeletonText,
  useBreakpointValue,
} from "@chakra-ui/react";
import ChartCard from "./ChartCard";
import ControlledChartsCarousel from "./ControlledChartsCarousel"; // Carousel component
import { useNavigate, useLocation } from "react-router-dom";

const FilterCharts = () => {
  const [charts, setCharts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const isMobile = useBreakpointValue({ base: true, md: false }); // Detect screen size

  const handleShowCharts = () => {
    navigate("/charts");
  };

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const response = await fetch(
          "https://tunesmusicapp.onrender.com/api/songs"
        );
        const data = await response.json();

        // Check if the current route is "/explore"
        if (location.pathname === "/explore") {
          setCharts(data.slice(0, 3)); // Fetch only the first 3 songs on /explore
        } else {
          setCharts(data); // Fetch all data on other routes
        }
      } catch (error) {
        console.error("Error fetching charts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharts();
  }, [location.pathname]);

  return (
    <Box mb={40} mt={10}>
      <Text
        fontSize={{ base: "30", md: "45" }}
        fontWeight="bold"
        textColor="white"
        ml={{ base: "10", md: "12" }}
        mt={12}
      >
        Top Charts
      </Text>
      {location.pathname == "/explore" ? (
        <Text
          textAlign="right"
          mr={20}
          textColor="white"
          cursor="pointer"
          onClick={handleShowCharts}
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
            <ControlledChartsCarousel charts={charts} /> // Pass charts to carousel
          )
        ) : (
          // Display grid on larger screens
          <Box
            display="grid"
            gridTemplateColumns={{
              base: "1fr",
              md: "1fr 1fr",
              lg: "repeat(3, 1fr)",
            }}
            gap={4}
          >
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} height="300px" borderRadius="md">
                    <SkeletonText mt="4" noOfLines={2} spacing="4" />
                  </Skeleton>
                ))
              : charts.map((chart) => (
                  <ChartCard
                    key={chart.id}
                    songTitle={chart.title}
                    artist={chart.artist}
                    coverImage={chart.albumCover}
                    onClick={() => {
                      window.open(chart.link, "_blank");
                    }}
                  />
                ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FilterCharts;
