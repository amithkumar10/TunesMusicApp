// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

// const AppNavbar = () => {
//   const [email, setEmail] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isAuthPage =
//     location.pathname === "/login" || location.pathname === "/register";

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/user", {
//           credentials: "include",
//         });
//         const data = await response.json();
//         setEmail(data.email);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const navigateHome = () => {
//     navigate(`/${email}`);
//   };

//   const navigateAbout = () => {
//     navigate("/about");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     axios
//       .post(
//         "http://localhost:3000/searchUser",
//         { query: searchQuery },
//         { withCredentials: true }
//       )
//       .then((response) => {
//         navigate(`/${searchQuery}/search`);
//       })
//       .catch((err) => {
//         if (err.response && err.response.status === 404) {
//           navigate("/unf");
//         } else if (err.response && err.response.status === 403) {
//           navigate("/");
//         } else {
//           console.error(err);
//         }
//       });
//   };

//   const handleLogout = () => {
//     axios
//       .get("http://localhost:3000/logout", { withCredentials: true })
//       .then(() => {
//         navigate("/login");
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" className="p-4 mb-4">
//       <div className="container-fluid">
//         <Navbar.Brand className="d-flex align-items-center">
//           <h2 className="m-1">Tunes</h2>
//           <div className="ml-2">
//             <img
//               src="https://images.vexels.com/content/131548/preview/music-note-circle-icon-851b3f.png"
//               alt="Music Note"
//               style={{ width: "60px", height: "60px" }}
//             />
//           </div>
//         </Navbar.Brand>
//         {!isAuthPage && (
//           <Nav className="mr-auto">
//             <Button
//               variant="outline-light"
//               className="mr-2"
//               style={{ border: "none", backgroundColor: "transparent" }}
//               onClick={navigateHome}
//             >
//               Home
//             </Button>
//             <Button
//               variant="outline-light"
//               className="mr-2"
//               style={{ border: "none", backgroundColor: "transparent" }}
//               onClick={navigateAbout}
//             >
//               About Us
//             </Button>
//           </Nav>
//         )}

//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
//           <Nav className="mr-auto"></Nav>
//           <Form className="d-flex" onSubmit={handleSearch}>
//             {!isAuthPage && (
//               <>
//                 <FormControl
//                   type="text"
//                   placeholder="Search"
//                   className="mr-sm-2"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <Button
//                   variant="outline-info"
//                   className="mr-sm-2"
//                   type="submit"
//                 >
//                   Search
//                 </Button>
//                 <Button variant="outline-danger" onClick={handleLogout}>
//                   Logout
//                 </Button>
//               </>
//             )}
//           </Form>
//         </Navbar.Collapse>
//       </div>
//     </Navbar>
//   );
// };

// export default AppNavbar;

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
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const AppNavbar = () => {
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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

  return (
    <Box
      bgGradient="linear(to-r, black, gray.800)"
      p={8}
      boxShadow="lg"
      borderBottom="1px"
      borderColor="gray.800"
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
            <Flex as="form" onSubmit={handleSearch} align="center">
              <InputGroup>
                <Input
                  h="2.75rem"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                        <InputGroup>
                          <Input
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                          ml={2}
                          bg="red.500"
                          _hover={{ bg: "red.600" }}
                          color="white"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </Flex>
                    </>
                  )}
                </VStack>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  variant="outline"
                  color="white"
                  mr={3}
                  onClick={onClose}
                >
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
