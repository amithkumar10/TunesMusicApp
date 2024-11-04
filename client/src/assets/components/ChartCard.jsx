import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const ChartCard = ({ songTitle, artist, coverImage, onClick }) => {
  console.log(songTitle, artist);

  return (
    <Box
      overflow="hidden"
      p={4}
      h={80}
      position="relative"
      cursor="pointer"
      transition="transform 0.3s"
      _hover={{ transform: "scale(1.02)" }}
      onClick={onClick}
    >
      <Image
        src={coverImage}
        alt={`${songTitle} cover`}
        boxSize="100%"
        height="100%"
        objectFit="cover"
        rounded={8}
      />
      <Text
        mt={2}
        fontWeight="bold"
        fontSize={{ base: "25", md: "30" }}
        textColor="white"
        position="absolute"
        bottom={12} // Position the title near the bottom
        left={4} // Position the text from the left
        textShadow="1px 1px 2px rgba(0, 0, 0, 0.8)"
        ml={5}
      >
        {songTitle}
      </Text>
      <Text
        fontSize={20}
        textColor="gray.300"
        position="absolute"
        bottom={4} // Position artist name below the title
        left={4}
        textShadow="1px 1px 2px rgba(0, 0, 0, 0.6)"
        ml={5}
      >
        {artist}
      </Text>
    </Box>
  );
};

export default ChartCard;
