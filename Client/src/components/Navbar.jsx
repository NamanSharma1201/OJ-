import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArticleIcon from '@mui/icons-material/Article';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../images/logo-no-background.png';

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.user.name) || (localStorage.getItem('name'));

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography variant='h5' component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <img src={Logo} alt='CodeQuest Logo' style={{ width: 100, height: 50 }} />
          </Typography>
          {isSmallScreen ? (
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Button
                component={NavLink}
                to='/'
                sx={({ isActive }) => ({
                  color: 'white',
                  textTransform: 'none',
                  marginRight: 2,
                  fontWeight: isActive ? 'bold' : 'normal',
                })}
                startIcon={<HomeIcon />}
              >
                Home
              </Button>
              <Button
                component={NavLink}
                to='/problem-set'
                sx={({ isActive }) => ({
                  color: 'white',
                  textTransform: 'none',
                  marginRight: 2,
                  fontWeight: isActive ? 'bold' : 'normal',
                })}
                startIcon={<AssignmentIcon />}
              >
                Problem Set
              </Button>
              <Button
                component={NavLink}
                to='/contest'
                sx={({ isActive }) => ({
                  color: 'white',
                  textTransform: 'none',
                  marginRight: 2,
                  fontWeight: isActive ? 'bold' : 'normal',
                })}
                startIcon={<EmojiEventsIcon />}
              >
                Contest
              </Button>
              <Button
                component={NavLink}
                to='/blogs'
                sx={({ isActive }) => ({
                  color: 'white',
                  textTransform: 'none',
                  marginRight: 2,
                  fontWeight: isActive ? 'bold' : 'normal',
                })}
                startIcon={<ArticleIcon />}
              >
                Blogs
              </Button>
              <Button
                component={NavLink}
                to='/global-chat'
                sx={({ isActive }) => ({
                  color: 'yellow',
                  textTransform: 'none',
                  marginRight: 2,
                  fontWeight: isActive ? 'bold' : 'normal',
                })}
                startIcon={<ChatIcon />}
              >
                Global Chat
              </Button>
              <Button
                component={NavLink}
                to='/contact'
                sx={({ isActive }) => ({
                  color: 'white',
                  textTransform: 'none',
                  marginRight: 2,
                  fontWeight: isActive ? 'bold' : 'normal',
                })}
                startIcon={<ContactMailIcon />}
              >
                Contact
              </Button>
              {isLoggedIn ? (
                <Button
                  component={NavLink}
                  to='/dashboard'
                  sx={({ isActive }) => ({
                    color: 'white',
                    textTransform: 'none',
                    marginRight: 2,
                    fontWeight: isActive ? 'bold' : 'normal',
                  })}
                  startIcon={<LoginIcon />}
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  component={NavLink}
                  to='/login'
                  sx={({ isActive }) => ({
                    color: 'white',
                    textTransform: 'none',
                    marginRight: 2,
                    fontWeight: isActive ? 'bold' : 'normal',
                  })}
                  startIcon={<LoginIcon />}
                >
                  Login/Registration
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
