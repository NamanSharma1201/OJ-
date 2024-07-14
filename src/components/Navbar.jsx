import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Box, Toolbar, Typography, IconButton, useMediaQuery, Menu, MenuItem, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArticleIcon from '@mui/icons-material/Article';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import GlobalChat from './GlobalChat';
import Logo from '../images/logo-no-background.png';

const AnimatedButton = styled(Button)(({ theme }) => ({
  color: '#e0e0e0',
  textTransform: 'none',
  marginRight: theme.spacing(2), // Reduced margin
  position: 'relative',
  overflow: 'hidden',
  fontSize: '0.9rem', // Reduced font size for NavLink
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '#ffffff',
    transform: 'scaleX(0)',
    transformOrigin: 'bottom right',
    transition: 'transform 0.3s ease-out',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
    transformOrigin: 'bottom left',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isLoggedIn = useSelector(state => state.user.name) || localStorage.getItem('name');
  const isSmallScreen = useMediaQuery('(max-width:960px)');

  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = () => setIsChatOpen(false);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const navItems = [
    { to: '/', label: 'Home', icon: <HomeIcon fontSize="small" /> },
    { to: '/problem-set', label: 'Problem Set', icon: <AssignmentIcon fontSize="small" /> },
    { to: '/contest', label: 'Contest', icon: <EmojiEventsIcon fontSize="small" /> },
    { to: '/blogs', label: 'Blogs', icon: <ArticleIcon fontSize="small" /> },
    { to: '/contact', label: 'Contact', icon: <ContactMailIcon fontSize="small" /> },
    { to: isLoggedIn ? '/dashboard' : '/login', label: isLoggedIn ? 'Dashboard' : 'Login/Registration', icon: <LoginIcon fontSize="small" /> },
  ];

  const NewBadge = () => (
    <motion.span
      style={{
        fontSize: '0.6rem',
        marginLeft: '4px',
        padding: '1px 4px',
        backgroundColor: '#ff4081',
        color: 'white',
        borderRadius: '4px',
        fontWeight: 'bold',
      }}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      NEW
    </motion.span>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundColor: '#3f51b5',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        paddingBottom: '3px', // Reduced padding
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <motion.img
              src={Logo}
              alt="CodeQuest Logo"
              style={{ width: 100, height: 50 }} // Adjusted size
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </Typography>
          {isSmallScreen ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    backgroundColor: '#1e2a3a',
                    color: '#e0e0e0',
                  }
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.to}
                    component={NavLink}
                    to={item.to}
                    onClick={handleMenuClose}
                    sx={{
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                      '&.active': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                    }}
                  >
                    {item.icon}
                    <Typography sx={{ ml: 1, fontSize: '0.9rem' }}>{item.label}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={() => { handleChatOpen(); handleMenuClose(); }}
                  sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                >
                  <ChatIcon sx={{ color: '#ffc107', fontSize: '1.2rem' }} />
                  <Typography sx={{ ml: 1, color: '#ffc107', fontSize: '0.9rem' }}>
                    Global Chat
                    <NewBadge />
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {navItems.map((item) => (
                <AnimatedButton
                  key={item.to}
                  component={NavLink}
                  to={item.to}
                  sx={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: isActive ? '#4fc3f7' : '#e0e0e0',
                  })}
                  startIcon={item.icon}
                >
                  {item.label}
                </AnimatedButton>
              ))}
              <AnimatedButton
                onClick={handleChatOpen}
                sx={{ color: '#ffff07' }}
                startIcon={<ChatIcon sx={{ color: '#ffff07', fontSize: '1.2rem' }} />}
              >
                Global Chat
                <NewBadge />
              </AnimatedButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      {isChatOpen && <GlobalChat onClose={handleChatClose} />}
    </Box>
  );
};

export default Navbar;