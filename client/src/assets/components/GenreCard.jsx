import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const GenreCard = ({ genre, coverImage, onClick }) => {
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
        alt={`${genre.name} cover`}
        boxSize="100%"
        height="100%"
        objectFit="cover"
        rounded={8}
      />
      <Text
        mt={2}
        fontWeight="bold"
        fontSize={30}
        textColor="white"
        position="absolute"
        bottom={4} // Position the text at the bottom
        right={12} // Position the text from the left
        textShadow="1px 1px 2px rgba(0, 0, 0, 0.8)" // Optional: Add a shadow for better visibility
      >
        {genre.name}
      </Text>
    </Box>
  );
};

export default GenreCard;
