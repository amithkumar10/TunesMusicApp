import React from "react";
import { Box, Image, Text, IconButton, Flex } from "@chakra-ui/react";
import { FaPlay, FaRegHeart, FaHeart } from "react-icons/fa";

const SongCard = ({ song, liked, onToggleLike }) => {
  return (
    <Box
      bg="gray.900"
      color="white"
      borderRadius="md"
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      maxW="600px"
      mb={4}
      shadow="md"
    >
      {/* Left: Album cover or icon */}
      <Flex alignItems="center">
        <Image
          src={song.albumCover || "/public/AlbumLogo.png"} // Placeholder or song.album_cover
          alt="Album Cover"
          boxSize="50px"
          borderRadius="md"
        />
        <Box ml={4}>
          <Text fontWeight="bold" fontSize="lg">
            {song.title}
          </Text>
          <Text fontSize="sm" color="gray.400">
            {song.artist} {/* Artist Name */}
          </Text>
        </Box>
      </Flex>

      {/* Right: Play button and like button */}
      <Flex alignItems="center" gap={5}>
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

        <IconButton
          aria-label="Like Song"
          icon={liked ? <FaHeart /> : <FaRegHeart />}
          fontSize="20px"
          bg="transparent"
          color={liked ? "#1DB954" : "white"} // Green if liked
          _hover={{ color: liked ? "green.400" : "red.400" }}
          onClick={onToggleLike}
        />
      </Flex>
    </Box>
  );
};

export default SongCard;
