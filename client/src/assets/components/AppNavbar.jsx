import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  Heading,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  VStack,
  HStack,
  Link,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const AppNavbar = () => {
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user", {
          credentials: "include",
        });
        const data = await response.json();
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const navigateHome = () => {
    navigate(`/${email}`);
  };

  const navigateAbout = () => {
    navigate("/about");
  };

  const navigateExplore = () => {
    navigate("/explore");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/searchUser",
        { query: searchQuery },
        { withCredentials: true }
      )
      .then((response) => {
        navigate(`/${searchQuery}/search`);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          navigate("/unf");
        } else if (err.response && err.response.status === 403) {
          navigate("/");
        } else {
          console.error(err);
        }
      });
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/logout", { withCredentials: true })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/suggestUsers",
        { query },
        { withCredentials: true }
      );
      console.log("Suggestions response:", response.data);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  return (
    <Box
      bgGradient="linear(to-r, black, gray.800)"
      p={8}
      boxShadow="lg"
      borderBottom="1px"
      borderColor="gray.800"
      maxW={{ base: "100%", md: "100%" }}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        align="center"
        justify="space-between"
        wrap="wrap"
      >
        <Flex align="center" mr={5}>
          <Heading as="h2" size="2xl" fontWeight="20px" mr={2} color="white">
            TUNES
          </Heading>
          <Image
            src="https://images.vexels.com/content/131548/preview/music-note-circle-icon-851b3f.png"
            alt="Music Note"
            boxSize="80px"
          />
        </Flex>
        <Flex display={{ base: "none", md: "flex" }} ml="auto">
          {!isAuthPage && (
            <HStack spacing={4}>
              <Link
                onClick={navigateHome}
                borderBottom={
                  location.pathname === `/${email}` ? "2px solid white" : "none"
                }
                _hover={{ textDecoration: "none", color: "gray.400" }}
                color="white"
                p={2}
                fontSize="2xl"
              >
                Home
              </Link>

              <Link
                onClick={navigateExplore}
                borderBottom={
                  location.pathname === "/explore" ? "2px solid white" : "none"
                }
                _hover={{ textDecoration: "none", color: "gray.400" }}
                color="white"
                p={2}
                fontSize="2xl"
              >
                Explore
              </Link>

              <Link
                onClick={navigateAbout}
                borderBottom={
                  location.pathname === "/about" ? "2px solid white" : "none"
                }
                _hover={{ textDecoration: "none", color: "gray.400" }}
                color="white"
                p={2}
                fontSize="2xl"
              >
                About Us
              </Link>
            </HStack>
          )}
        </Flex>
        <Flex display={{ base: "none", md: "flex" }} ml="auto" align="center">
          {!isAuthPage && (
            <Flex
              as="form"
              onSubmit={handleSearch}
              align="center"
              position="relative"
            >
              <InputGroup>
                <Input
                  h="2.75rem"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    fetchSuggestions(e.target.value); // Fetch suggestions as the user types
                  }}
                  color="white"
                  bg="gray.700"
                  border="none"
                  _placeholder={{ color: "gray.400" }}
                  _hover={{ bg: "gray.600" }}
                  _focus={{ bg: "gray.600" }}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="2.15rem"
                    size="sm"
                    type="submit"
                    bg="blue.500"
                    _hover={{ bg: "blue.600" }}
                    color="white"
                  >
                    Search
                  </Button>
                </InputRightElement>
              </InputGroup>
              {/* Suggestions List */}
              {suggestions.length > 0 && (
                <List
                  position="absolute"
                  zIndex={10}
                  bg="white"
                  color="black"
                  width="76%"
                  mt={
                    suggestions.length === 1
                      ? "24"
                      : suggestions.length === 2
                      ? "36"
                      : suggestions.length === 3
                      ? "48"
                      : suggestions.length === 4
                      ? "56"
                      : "64"
                  }
                  borderRadius="md"
                  boxShadow="md"
                  bgColor="gray.200"
                >
                  {suggestions.map((user) => (
                    <ListItem
                      key={user.email} // Assuming each user has a unique email
                      padding={2}
                      _hover={{ bg: "gray.200", cursor: "pointer" }}
                      onClick={() => {
                        setSearchQuery(user.name); // Set the search query to the selected suggestion
                        setSuggestions([]); // Clear suggestions
                      }}
                    >
                      <ListIcon boxSize="0.75em" color="green.500" />
                      {user.name}
                    </ListItem>
                  ))}
                </List>
              )}
              <Button
                ml={2}
                bg="red.500"
                _hover={{ bg: "red.600" }}
                color="white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Flex>
          )}
        </Flex>
        <IconButton
          display={{ base: "flex", md: "none" }}
          ml="auto"
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent bg="gray.800" color="white">
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
              <DrawerBody>
                <VStack spacing={4}>
                  {!isAuthPage && (
                    <>
                      <Button
                        variant="link"
                        onClick={navigateHome}
                        borderBottom={
                          location.pathname === `/${email}`
                            ? "2px solid white"
                            : "none"
                        }
                      >
                        Home
                      </Button>

                      <Button
                        variant="link"
                        onClick={navigateExplore}
                        borderBottom={
                          location.pathname === "/about"
                            ? "2px solid white"
                            : "none"
                        }
                      >
                        Explore
                      </Button>

                      <Button
                        variant="link"
                        onClick={navigateAbout}
                        borderBottom={
                          location.pathname === "/about"
                            ? "2px solid white"
                            : "none"
                        }
                      >
                        About Us
                      </Button>

                      <Flex as="form" onSubmit={handleSearch} width="100%">
                        <InputGroup mr={5}>
                          <Input
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                              fetchSuggestions(e.target.value); // Fetch suggestions as the user types
                            }}
                            color="white"
                            bg="gray.700"
                            border="none"
                            _placeholder={{ color: "gray.400" }}
                            _hover={{ bg: "gray.600" }}
                            _focus={{ bg: "gray.600" }}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              type="submit"
                              bg="blue.500"
                              _hover={{ bg: "blue.600" }}
                              color="white"
                            >
                              Search
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <Button
                          colorScheme="red"
                          onClick={handleLogout}
                          w="30%"
                          h={10}
                        >
                          Logout
                        </Button>
                        {/* Suggestions List */}
                        {suggestions.length > 0 && (
                          <List
                            position="absolute"
                            zIndex={10}
                            bg="white"
                            color="black"
                            width="85%"
                            mt={10}
                            borderRadius="md"
                            boxShadow="md"
                          >
                            {suggestions.map((user) => (
                              <ListItem
                                key={user.email}
                                padding={2}
                                _hover={{ bg: "gray.200", cursor: "pointer" }}
                                onClick={() => {
                                  setSearchQuery(user.name); // Set the search query to the selected suggestion
                                  setSuggestions([]); // Clear suggestions
                                }}
                              >
                                <ListIcon boxSize="0.75em" color="green.500" />
                                {user.name}
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </Flex>
                    </>
                  )}
                </VStack>
              </DrawerBody>
              <DrawerFooter borderTopWidth="1px">
                <Button variant="outline" textColor="white" onClick={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default AppNavbar;
