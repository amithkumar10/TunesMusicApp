// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Row, Col, Card, Image } from "react-bootstrap";
// import AppNavbar from "./AppNavbar";
// import NotFound from "../../NotFound";
// import { Skeleton } from "@chakra-ui/react";

// const SearchProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const { email } = useParams();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/searchUser`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({ query: email }),
//         });
//         const data = await response.json();
//         setUserData(data);
//       } catch (err) {
//         console.error("Error fetching user data", err);
//       }
//     };

//     fetchUserData();
//   }, [email]);

//   if (!userData) {
//     return <NotFound />;
//   }

//   //LOADING STATE
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000); // simulate loading time
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <AppNavbar style={{ marginBottom: "20px" }} />
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={8}>
//             {isLoading ? (
//               <Skeleton height="20rem" />
//             ) : (
//               <Card
//                 className="text-light p-5"
//                 style={{ backgroundColor: "#2E8B57" }}
//               >
//                 <Row className="align-items-center">
//                   <Col xs={12} md={3} className="d-flex justify-content-center">
//                     <div>
//                       <Image
//                         // src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/a3c37122-1aea-4339-850b-20252d8bb82e/a7e418e3-2af0-4ed9-bb77-f98d73c385c8.png"
//                         src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-image-gray-blank-silhouette-vector-illustration-305504006.jpg"
//                         style={{
//                           width: "200px",
//                           height: "200px",
//                           border: "4px solid white",
//                         }}
//                         roundedCircle
//                         className="profile-pic"
//                         alt="Profile"
//                       />
//                     </div>
//                   </Col>
//                   <Col xs={12} md={9}>
//                     <Card.Body>
//                       <Card.Title className="h3">{userData.name}</Card.Title>
//                       <Card.Text>{userData.bio}</Card.Text>
//                     </Card.Body>
//                   </Col>
//                 </Row>
//               </Card>
//             )}
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SearchProfile;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import { Container, Box, Flex, Text, Skeleton } from "@chakra-ui/react";
import { Row, Col } from "react-bootstrap";
import NotFound from "../../NotFound";

const SearchProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/searchUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ query: email }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setIsLoading(false); // Set loading to false after the data is fetched
      }
    };

    const timer = setTimeout(() => {
      fetchUserData();
      setIsLoading(false);
    }, 2000); // Simulate loading time of 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [email]);

  if (isLoading) {
    return (
      <>
        <AppNavbar style={{ marginBottom: "20px" }} />
        <Container maxW="100%">
          <Row className="justify-content-center">
            <Col md={12}>
              <Skeleton minH={{ base: "20rem", md: "34rem" }} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  if (!userData) {
    return <NotFound />;
  }

  return (
    <>
      <AppNavbar />
      <Container maxW="100%">
        <Row className="justify-content-center">
          <Col md={12}>
            <Box
              bgImage="url('/public/ProfileBg.png')"
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
              <Flex
                alignItems="center"
                flexWrap={{ base: "wrap", md: "nowrap" }}
              >
                <Box flex="1" p={10}>
                  <Box className="h3" fontSize="2xl" fontWeight="bold">
                    <Text
                      fontSize={{ base: "2xl", md: "8xl" }}
                      fontWeight="extrabold"
                    >
                      {userData.name}
                    </Text>
                  </Box>
                  <Box mt={2} ml={{ md: "6" }}>
                    <Text fontSize={{ md: "lg" }} mt={{ base: "0", md: "2" }}>
                      {userData.bio}
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchProfile;
