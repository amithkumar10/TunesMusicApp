import React, { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  FormControl,
  FormLabel,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FaPlay, FaMinus } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

const FavCard = () => {
  const [songs, setSongs] = useState([]);
  const [newSongName, setNewSongName] = useState("");
  const [newLink, setNewLink] = useState("");
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { email } = useParams();
  const isSearchPage = location.pathname === `/${email}/search`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://tunesmusicapp.onrender.com/user",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setSongs(data.favouriteSongs);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchUserData();
  }, []);

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://tunesmusicapp.onrender.com/addFavouriteSong",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            songName: newSongName,
            songLink: newLink,
          }),
        }
      );
      if (response.ok) {
        const newSong = { name: newSongName, link: newLink };
        setSongs([...songs, newSong]);
        setShowModal(false);
      } else {
        console.error("Failed to update song details");
      }
    } catch (error) {
      console.error("Error updating song details:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const songToDelete = songs[index];
      const response = await fetch(
        "https://tunesmusicapp.onrender.com/deleteFavouriteSong",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            songId: songToDelete._id, // Ensure that `songId` is used here
          }),
        }
      );
      if (response.ok) {
        const updatedSongs = songs.filter((_, i) => i !== index);
        setSongs(updatedSongs);
      } else {
        console.error("Failed to delete song");
      }
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // simulate loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box p={4}>
      <Flex mb={4} justify="center">
        <Box width={{ base: "full", md: "50%" }}>
          {!isSearchPage && (
            <>
              {songs.length > 0 ? (
                <Tooltip
                  hasArrow
                  label="Add Songs"
                  placement="right"
                  ml={1}
                  openDelay={500}
                >
                  <IconButton
                    onClick={handleAdd}
                    icon={<AddIcon color="black" />}
                    borderRadius="full"
                    aria-label="Add Songs"
                    bg="#1DB954"
                    sx={{
                      _hover: {
                        bg: "#1ED760",
                        transform: "scale(1.1)",
                      },
                    }}
                    boxSize={{ base: "10", md: "10" }}
                  />
                </Tooltip>
              ) : (
                <Button colorScheme="green" onClick={handleAdd} width="xxs">
                  Add Songs
                </Button>
              )}
            </>
          )}
          {isSearchPage && songs.length === 0 && (
            <Button bg="lightgray" color="black" width="full">
              No Songs
            </Button>
          )}
        </Box>
      </Flex>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Song Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Song Name</FormLabel>
              <Input
                value={newSongName}
                onChange={(e) => setNewSongName(e.target.value)}
                placeholder="Example: Heat Waves"
              />
              <FormLabel mt={4}>Song Link</FormLabel>
              <Input
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="Example: https://www.youtube.com/your-song-link"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex direction="column" align="center">
        {songs.map((song, index) => (
          <Flex
            key={index}
            direction="row"
            align="center"
            justifyContent="flex-start"
            mb={1}
            width={{ base: "full", md: "50%" }}
          >
            {isLoading ? (
              <Skeleton height="4rem" width="full" />
            ) : (
              <Flex
                bgGradient="linear(to-r, black, gray.800)"
                p={4}
                borderLeft="2px"
                borderBottom="1px"
                borderColor="gray.700"
                rounded="md"
                shadow="md"
                flex="1"
                justifyContent="space-between"
                align="center"
                height="4rem"
              >
                <Flex align="center" gap={2}>
                  <Image
                    src="/AlbumLogo.png"
                    alt="Logo"
                    rounded="md"
                    boxSize="12"
                    mr={2}
                  />
                  <Text fontSize="md" textColor="white" fontWeight="semibold">
                    {song.name}
                  </Text>
                </Flex>

                <Flex gap={4} align="center">
                  <Tooltip
                    hasArrow
                    label="Play"
                    placement="left"
                    ml={1}
                    openDelay={1200}
                  >
                    <IconButton
                      rounded="full"
                      aria-label="Play"
                      boxSize={10}
                      bg="#1DB954"
                      _hover={{ bg: "#1ED760", transform: "scale(1.1)" }}
                      icon={<FaPlay color="black" />}
                      onClick={() => window.open(song.link, "_blank")}
                    />
                  </Tooltip>
                  {!isSearchPage && (
                    <Tooltip
                      hasArrow
                      label="Remove Song"
                      placement="right"
                      ml={1}
                      openDelay={500}
                    >
                      <IconButton
                        aria-label="Delete"
                        rounded="full"
                        icon={<FaMinus color="gray" />}
                        color="red.500"
                        boxSize={6}
                        p={1}
                        onClick={() => handleDelete(index)}
                      />
                    </Tooltip>
                  )}
                </Flex>
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default FavCard;
