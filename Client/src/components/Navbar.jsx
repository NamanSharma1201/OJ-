import React from 'react';
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
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const cookie = document.cookie.split('; ').find(row => row.startsWith('uid='));

  return (
    <Box sx={{ flexGrow: 0 }}>
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
                activeClassName="active"
                sx={{ color: 'white', textTransform: 'none', marginRight: 2 }}
                startIcon={<HomeIcon />}
              >
                Home
              </Button>

              <Button
                component={NavLink}
                to='/problem-set'
                activeClassName="active"
                sx={{ color: 'white', textTransform: 'none', marginRight: 2 }}
                startIcon={<AssignmentIcon />}
              >
                Problem Set
              </Button>
              <Button
                component={NavLink}
                to='/contest'
                activeClassName="active"
                sx={{ color: 'white', textTransform: 'none', marginRight: 2 }}
                startIcon={<EmojiEventsIcon />}
              >
                Contest
              </Button>
              <Button
                component={NavLink}
                to='/blogs'
                activeClassName="active"
                sx={{ color: 'white', textTransform: 'none', marginRight: 2 }}
                startIcon={<ArticleIcon />}
              >
                Blogs
              </Button>
              <Button
                component={NavLink}
                to='/global-chat'
                activeClassName="active"
                sx={{ color: 'yellow', textTransform: 'none', marginRight: 2 }}
                startIcon={<ChatIcon />}
              >
                Global Chat
              </Button>
              <Button
                component={NavLink}
                to='/contact'
                activeClassName="active"
                sx={{ color: 'white', textTransform: 'none', marginRight: 2 }}
                startIcon={<ContactMailIcon />}
              >
                Contact
              </Button>
              {cookie ? (
                <Button
                  component={NavLink}
                  to='/dashboard'
                  activeClassName="active"
                  sx={{ color: 'white', textTransform: 'none', marginRight: 2 }}
                  startIcon={<LoginIcon />}
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  component={NavLink}
                  to='/login'
                  activeClassName="active"
                  sx={{ color: 'white', textTransform: 'none', marginRight: 2 }}
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
