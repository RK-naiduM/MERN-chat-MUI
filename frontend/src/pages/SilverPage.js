import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";
import Chatbot from "../components/Chatbot";
import UserMenu from "../components/UserMenu"; 

const SilverPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || user?.tier !== "Silver") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      <UserMenu /> 
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Silver Page
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          You have Silver-level access.
        </Typography>
        <Chatbot tier="Silver" />
      </Box>
    </Container>
  );
};

export default SilverPage;
