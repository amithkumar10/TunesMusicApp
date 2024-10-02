import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Image,
  Alert,
  AlertIcon,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", { name, email, password })
      .then((result) => {
        if (result.data === "Duplicate Email") {
          setErrorMessage(
            "This email ID already has an account. Redirecting to Login Page..."
          );
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data === "Duplicate Email") {
          setErrorMessage(
            "This email ID already has an account. Redirecting to Login Page..."
          );
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  // return (
  //   <>
  //     <AppNavbar />
  //     <div className="container mt-5">
  //       <div className="row justify-content-center">
  //         <div className="col-md-6">
  //           <div className="card">
  //             <div className="card-body">
  //               <h2 className="card-title text-center">Sign Up</h2>
  //               {errorMessage && (
  //                 <div className="alert alert-danger" role="alert">
  //                   {errorMessage}
  //                 </div>
  //               )}
  //               <form onSubmit={handleSubmit}>
  //                 <div className="form-group">
  //                   <label htmlFor="username">Username</label>
  //                   <input
  //                     type="text"
  //                     id="username"
  //                     name="username"
  //                     className="form-control"
  //                     placeholder="Enter your username"
  //                     value={name}
  //                     onChange={(e) => setName(e.target.value)}
  //                   />
  //                 </div>
  //                 <div className="form-group">
  //                   <label htmlFor="email">Email</label>
  //                   <input
  //                     type="email"
  //                     id="email"
  //                     name="email"
  //                     className="form-control"
  //                     placeholder="Enter your email"
  //                     value={email}
  //                     onChange={(e) => setEmail(e.target.value)}
  //                   />
  //                 </div>
  //                 <div className="form-group">
  //                   <label htmlFor="password">Password</label>
  //                   <input
  //                     type="password"
  //                     id="password"
  //                     name="password"
  //                     className="form-control"
  //                     placeholder="Enter your password"
  //                     value={password}
  //                     onChange={(e) => setPassword(e.target.value)}
  //                   />
  //                 </div>
  //                 <div className="d-flex justify-content-between">
  //                   <button
  //                     type="submit"
  //                     className="btn btn-primary btn-block mt-4"
  //                   >
  //                     Sign Up
  //                   </button>
  //                   <Link
  //                     to="/login"
  //                     className="btn btn-secondary btn-block mt-4"
  //                   >
  //                     Login
  //                   </Link>
  //                 </div>
  //               </form>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <Box
        bgGradient="linear(to-r, black, gray.800)"
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justify="center"
        p={4}
      >
        <Container maxW="container.xl" p={10}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            spacing={4}
          >
            {/* Left Side */}
            <Flex
              direction="column"
              align="center"
              justify="center"
              flex="1"
              display={{ base: "none", md: "flex" }}
            >
              <Image
                src="./last.png" // Replace with your image URL
                alt="Signup Illustration"
                borderRadius="md"
                h="35rem"
                mb={4}
              />
            </Flex>

            {/* Right Side - Signup Form */}
            <Flex
              direction="column"
              align="center"
              flex="1"
              bg="transparent"
              p={8}
              borderRadius="md"
              boxShadow="md"
              border="1px"
              borderColor="gray.400"
              maxW="20rem"
              mr={{ md: "60" }}
            >
              <Flex align="center" gap="2">
                <Heading
                  as="h2"
                  size="2xl"
                  fontWeight="20px"
                  textColor="white"
                  mb={5}
                >
                  TUNES
                </Heading>
                <Image src="./TunesLogo.png" alt="Music Note" boxSize="80px" />
              </Flex>

              {errorMessage && (
                <Alert status="error" mb={4}>
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  <FormControl id="username" isRequired>
                    <FormLabel textColor="white">Username</FormLabel>
                    <Input
                      type="text"
                      textColor="white"
                      placeholder="Enter your username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel textColor="white">Email</FormLabel>
                    <Input
                      type="email"
                      textColor="white"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel textColor="white">Password</FormLabel>
                    <Input
                      type="password"
                      textColor="white"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="blue" width="full">
                    Sign Up
                  </Button>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    my={4}
                    gap={1}
                    w={"full"}
                  >
                    <Box flex={2} h={"1px"} bg={"gray.400"} />
                    <Text
                      mx={1}
                      color={"white"}
                      align="center"
                      justifyContent="center"
                    >
                      OR
                    </Text>
                    <Box flex={2} h={"1px"} bg={"gray.400"} />
                  </Flex>

                  <Button width="full" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                </VStack>
              </form>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Signup;
