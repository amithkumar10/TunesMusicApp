import React, { useState, useEffect } from "react";
import { Row, Col, Image, Card, Button, Modal, Form } from "react-bootstrap";
import {
  Box,
  Container,
  Flex,
  Spinner,
  Heading,
  Text,
  background,
} from "@chakra-ui/react";

import { useLocation, useParams } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newBio, setNewBio] = useState("");
  const location = useLocation();
  const { email } = useParams();
  const isSearchPage = location.pathname === `/${email}/search`;

  //FETCHING USERDATA
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user", {
          credentials: "include",
        });
        const data = await response.json();
        setUsername(data.name);
        setBio(data.bio);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  //GETTING BIO
  const handleEditBio = () => {
    setNewBio(bio);
    setShowModal(true);
  };

  const handleSaveBio = async () => {
    try {
      const response = await fetch("http://localhost:3000/updateBio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ bio: newBio }),
      });
      if (response.ok) {
        setBio(newBio);
        setShowModal(false);
      } else {
        console.error("Failed to update bio");
      }
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  //LOADING STATE
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // simulate loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxW="100%">
      <Row className="justify-content-center ">
        <Col md={12}>
          {isLoading ? (
            <Skeleton height={{ base: "20rem", md: "34rem" }} />
          ) : (
            <Box
              bgImage="url('./TunesProfileBg.jpeg')"
              bgSize="cover"
              bgPosition="center"
              objectFit="cover"
              borderRadius="md"
              boxShadow="md"
              minH={{ base: "20rem", md: "34rem" }}
              w="100%"
              color="white"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
            >
              <Box p={8}>
                <Heading
                  fontSize={{ base: "2xl", md: "8xl" }}
                  fontWeight="extrabold"
                >
                  {username}
                </Heading>

                <Flex
                  align="center"
                  justifyContent="start"
                  ml={{ md: "8" }}
                  gap={3}
                >
                  <Text fontSize={{ md: "lg" }} mt={{ base: "0", md: "2" }}>
                    {bio}
                  </Text>

                  {!isSearchPage && (
                    <Button
                      h="0.75px"
                      size="sm"
                      style={{
                        backgroundColor: "transparent",
                        color: "white",
                        borderColor: "white",
                      }}
                      onClick={handleEditBio}
                    >
                      <Box display={{ base: "none", md: "block" }}>
                        {bio ? "Edit bio" : "Add bio"}
                      </Box>
                      <Box
                        border="none"
                        display={{ base: "block", md: "none" }}
                      >
                        <EditIcon boxSize="5" color="white" />
                      </Box>
                    </Button>
                  )}
                </Flex>
              </Box>
            </Box>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{bio ? "Edit bio" : "Add bio"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveBio}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;
