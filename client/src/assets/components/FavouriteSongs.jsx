import React, { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import FavCard from "./FavCard";

const FavouriteSongs = () => {
  const location = useLocation();
  const { email } = useParams();

  return (
    <Box mt={{ base: "16", md: "32" }}>
      <Row className="mb-2 justify-content-center">
        <Col md={6}>
          <Text
            fontSize={{ base: "2xl", md: "5xl" }}
            textColor="white"
            fontWeight="bold"
          >
            Favourite Songs
          </Text>
        </Col>
      </Row>

      <FavCard />
    </Box>
  );
};

export default FavouriteSongs;
