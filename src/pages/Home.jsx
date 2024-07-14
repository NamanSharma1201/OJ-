import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Container, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/background.jpg';
import logo from "../images/logo-no-background.png";
import GlobalChat from '../components/GlobalChat';
const FeatureCard = ({ title, description, index, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      style={{ cursor: 'pointer', height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        <CardContent sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: isMobile ? '16px' : '24px',
        }}>
          <Typography variant={isMobile ? "h6" : "h5"} component="div" gutterBottom sx={{
            fontWeight: 'bold',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            marginBottom: '12px',
          }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: isMobile ? '0.875rem' : '1rem',
          }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};


const Home = () => {
  const navigate = useNavigate();
  const [showGlobalChat, setShowGlobalChat] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      title: "Global Chat",
      description: "Connect with developers worldwide in our real-time global chat.",
      onClick: () => setShowGlobalChat(true),
    },
    {
      title: "Problem Set",
      description: "Sharpen your coding skills with our extensive collection of programming challenges.",
      onClick: () => navigate('/problem-set'),
    },
    {
      title: "Blogs",
      description: "Stay updated with the latest in tech through our curated blog posts.",
      onClick: () => navigate('/blogs'),
    },
    {
      title: "Contests",
      description: "Participate in  contests and compete with developers around the globe.",
      onClick: () => navigate('/contest'),
    },
  ];

  const handleChatClose = () => {
    setShowGlobalChat(false);
  };

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: isMobile ? 4 : 8,
      }}
    >

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: isMobile ? 4 : 8 }}>
          <motion.img
            src={logo}
            alt="CodeQuest Logo"
            style={{
              maxWidth: isMobile ? '100px' : '150px',
              marginBottom: '20px',
              filter: 'drop-shadow(0px 0px 10px rgba(255,255,255,0.3))',
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />


          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              gutterBottom
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                letterSpacing: '1px',
              }}
            >
              Welcome to CodeQuest
            </Typography>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                color: '#ccc',
                mb: 4,
                maxWidth: '800px',
                margin: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              Your Journey to Mastering Code Begins Here
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={isMobile ? 2 : 4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard {...feature} index={index} />
            </Grid>
          ))}
        </Grid>

        {showGlobalChat && <GlobalChat onClose={handleChatClose} />}
      </Container>
    </Box>
  );
};

export default Home;