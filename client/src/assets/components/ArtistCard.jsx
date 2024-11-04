import React, { useState } from "react";
import { Box, Image, Text, IconButton } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ArtistCard = ({ artistName, coverImage, songLink, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      p={2}
      borderRadius="md"
      onMouseEnter={() => !isMobile && setIsHovered(true)} // Set hover state only if not mobile
      onMouseLeave={() => !isMobile && setIsHovered(false)} // Remove hover state only if not mobile
      _hover={{ backgroundColor: "gray.800" }}
    >
      <Box
        position="relative"
        overflow="hidden"
        p={2}
        h={{ sm: "56", md: "60" }}
        w={{ sm: "56", md: "60" }}
        transition="transform 0.3s"
        _hover={{ transform: !isMobile && "scale(1.05)" }} // Scale effect only if not mobile
        borderRadius="full"
        zIndex={0}
      >
        <Image
          src={coverImage}
          alt={`${artistName} cover`}
          boxSize="100%"
          height="100%"
          objectFit="cover"
          borderRadius="full"
        />

        {/* Always show play button on mobile, otherwise show on hover */}
        <IconButton
          aria-label="Play"
          icon={<FaPlay color="black" />}
          rounded="full"
          boxSize={14}
          bg="#1DB954"
          position="absolute"
          top="67%"
          left="63%"
          zIndex={10} // Ensure it appears on top of the image
          _hover={{ bg: "#1ED760", transform: "scale(1.1)" }}
          onClick={() => window.open(songLink, "_blank")}
          display={isMobile || isHovered ? "flex" : "none"} // Show button if mobile or hovered
        />
      </Box>
      <Box pl={5}>
        <Text fontWeight="bold" fontSize={20} textColor="white">
          {artistName}
        </Text>
        <Text textColor="gray.400">Artist</Text>
      </Box>
    </Box>
  );
};

export default ArtistCard;
