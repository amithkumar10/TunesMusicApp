// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { Box, Container, Spinner } from "@chakra-ui/react";
// import AppNavbar from "./assets/components/AppNavbar";
// import Profile from "./assets/components/Profile";
// import FavouriteSongs from "./assets/components/FavouriteSongs";
// import LikedSongs from "./assets/components/LikedSongs";
// import Footer from "./assets/components/Footer";

// const Home = () => {
//   const navigate = useNavigate();
//   const { email } = useParams();
//   const [authStatus, setAuthStatus] = useState(null);

//   axios.defaults.withCredentials = true;

//   useEffect(() => {
//     // Fetch user data to check if user is authenticated
//     axios
//       .get("http://localhost:3000/", { withCredentials: true })
//       .then((result) => {
//         if (result.data === "Success") {
//           setAuthStatus("Authenticated");
//         } else {
//           setAuthStatus("Not authenticated");
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         setAuthStatus("Error");
//         navigate("/login");
//       });
//   }, [navigate]);

//   if (authStatus === null) {
//     return (
//       <Box
//         bgGradient="linear(to-r, black, gray.800)"
//         minHeight="100vh"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Spinner size="xl" color="white" />
//       </Box>
//     );
//   }

//   return (
//     <Box bgGradient="linear(to-r, black, gray.800)" minHeight="100vh">
//       <AppNavbar />
//       <Container border="none" maxW="100%">
//         <Profile />
//         <FavouriteSongs />
//         <LikedSongs />
//         <Footer />
//       </Container>
//     </Box>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Container, Spinner, Text } from "@chakra-ui/react";
import AppNavbar from "./assets/components/AppNavbar";
import Profile from "./assets/components/Profile";
import FavouriteSongs from "./assets/components/FavouriteSongs";
import LikedSongs from "./assets/components/LikedSongs";
import Footer from "./assets/components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  // Setting up axios to send credentials (cookies)
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const baseURL = "https://tunesmusicapp.onrender.com"; // Replace with your backend URL

    // Verify user authentication
    axios
      .get(`${baseURL}/`, { withCredentials: true })
      .then((response) => {
        if (response.data === "Success") {
          // Fetch user data if authenticated
          axios
            .get(`${baseURL}/user/${email}`)
            .then((res) => {
              setUserData(res.data);
              setLoading(false);
            })
            .catch((err) => {
              console.error("Error fetching user data:", err);
              setError("Failed to fetch user data");
              setLoading(false);
            });
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Authentication error:", err);
        setError("Not authenticated. Please log in.");
        setLoading(false);
        navigate("/login");
      });
  }, [email, navigate]);

  if (loading) {
    return (
      <Box textAlign="center" p={4}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={4}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Container maxW="container.xl">
      <AppNavbar />
      <Profile user={userData} />
      <FavouriteSongs />
      <LikedSongs />
      <Footer />
    </Container>
  );
};

export default Home;
