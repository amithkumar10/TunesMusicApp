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

  // return (
  //   <Container className="my-4">
  //     <Row className="justify-content-center">
  //       <Col md={8}>
  //         {isLoading ? (
  //           <Skeleton height="20rem" />
  //         ) : (
  //           <Card
  //             className="text-light p-5"
  //             style={{ backgroundColor: "#2E8B57" }}
  //           >
  //             <Row className="align-items-center">
  //               <Col xs={12} md={3} className="d-flex justify-content-center">
  //                 <div>
  //                   <Image
  //                     // src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/a3c37122-1aea-4339-850b-20252d8bb82e/a7e418e3-2af0-4ed9-bb77-f98d73c385c8.png"
  //                     src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-image-gray-blank-silhouette-vector-illustration-305504006.jpg"
  //                     style={{
  //                       width: "200px",
  //                       height: "200px",
  //                       border: "4px solid white",
  //                     }}
  //                     roundedCircle
  //                     className="profile-pic"
  //                     alt="Profile"
  //                   />
  //                 </div>
  //               </Col>
  //               <Col xs={12} md={9}>
  //                 <Card.Body>
  //                   <Card.Title className="h3">{username}</Card.Title>
  //                   <Card.Text>{bio}</Card.Text>
  //                   {!isSearchPage && (
  //                     <>
  //                       <Button
  //                         onClick={handleEditBio}
  //                         style={{
  //                           backgroundColor: "white",
  //                           color: "green",
  //                           border: "1px solid darkgreen",
  //                         }}
  //                       >
  //                         {bio ? "Edit bio" : "Add bio"}
  //                       </Button>
  //                     </>
  //                   )}
  //                 </Card.Body>
  //               </Col>
  //             </Row>
  //           </Card>
  //         )}
  //       </Col>
  //     </Row>

  //     <Modal show={showModal} onHide={() => setShowModal(false)}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>{bio ? "Edit bio" : "Add bio"}</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Form>
  //           <Form.Group>
  //             <Form.Label>Bio</Form.Label>
  //             <Form.Control
  //               as="textarea"
  //               rows={3}
  //               value={newBio}
  //               onChange={(e) => setNewBio(e.target.value)}
  //             />
  //           </Form.Group>
  //         </Form>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="secondary" onClick={() => setShowModal(false)}>
  //           Cancel
  //         </Button>
  //         <Button variant="primary" onClick={handleSaveBio}>
  //           Save
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   </Container>
  // );

  // return (
  //   <Container
  //     className="my-4"
  //     maxW="100%"
  //     maxH="30%"
  //     border="1px"
  //     borderColor="white"
  //   >
  //     <Row className="justify-content-center ">
  //       <Col md={12}>
  //         {isLoading ? (
  //           <Skeleton height="20rem" />
  //         ) : (
  //           <Box
  //             bgImage="url('https://t3.ftcdn.net/jpg/06/24/52/34/360_F_624523450_NbFfAibNsbxFDjGKueOukV4ijNGFIuQ1.jpg')"
  //             bgSize="cover"
  //             bgPosition="center"
  //             borderRadius="md"
  //             boxShadow="md"
  //             minH="30rem"
  //             w="full"
  //             color="white"
  //           >
  //             <Row className="align-items-center">
  //               <Col xs={12} md={9}>
  //                 <Box justifyContent="end">
  //                   <Heading md fontSize="5rem" fontWeight="extrabold">
  //                     {username}
  //                   </Heading>
  //                   <Flex gap={3}>
  //                     <Text>{bio}</Text>
  //                     {!isSearchPage && (
  //                       <Button
  //                         onClick={handleEditBio}
  //                         mt={4}
  //                         bg="white"
  //                         color="green.600"
  //                         border="1px solid"
  //                         borderColor="green.700"
  //                         _hover={{ bg: "green.50" }}
  //                       >
  //                         {bio ? "Edit bio" : "Add bio"}
  //                       </Button>
  //                     )}
  //                   </Flex>
  //                 </Box>
  //               </Col>
  //             </Row>
  //           </Box>
  //         )}
  //       </Col>
  //     </Row>

  //     <Modal show={showModal} onHide={() => setShowModal(false)}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>{bio ? "Edit bio" : "Add bio"}</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Form>
  //           <Form.Group>
  //             <Form.Label>Bio</Form.Label>
  //             <Form.Control
  //               as="textarea"
  //               rows={3}
  //               value={newBio}
  //               onChange={(e) => setNewBio(e.target.value)}
  //             />
  //           </Form.Group>
  //         </Form>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="secondary" onClick={() => setShowModal(false)}>
  //           Cancel
  //         </Button>
  //         <Button variant="primary" onClick={handleSaveBio}>
  //           Save
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   </Container>
  // );

  return (
    <Container maxW="100%">
      <Row className="justify-content-center ">
        <Col md={12}>
          {isLoading ? (
            <Skeleton height={{ base: "20rem", md: "34rem" }} />
          ) : (
            <Box
              bgImage="url('./ProfileBg.png')"
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
