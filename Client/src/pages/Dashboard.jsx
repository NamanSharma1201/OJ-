import React, { useEffect, useState } from 'react';
import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './auth/ChangePassword';
import { unsetUser } from '../features/userSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Custom hook logic for local storage
  const useLocalStorage = (key) => {
    const [value, setValue] = useState(localStorage.getItem(key));

    useEffect(() => {
      const handleStorageChange = () => {
        setValue(localStorage.getItem(key));
      };

      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, [key]);

    return value;
  };

  const name = useLocalStorage('name'); // Use custom hook
  const email = useLocalStorage('email'); // Use custom hook

  useEffect(() => {
    if (!name) {
      console.log("move to login");
      navigate('/login');
    }
  }, [name, navigate]); // Add `name` and `navigate` to the dependency array

  const handleLogout = () => {
    // Clear cookies if necessary
    document.cookie = 'uid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';

    // Clear localStorage
    localStorage.removeItem('name');
    localStorage.removeItem('email');

    // Dispatch action to unset user in Redux store
    dispatch(unsetUser());

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <>
      <CssBaseline />
      <Grid container>
        <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
          <Typography variant='h4' gutterBottom>
            Dashboard
          </Typography>
          <Typography variant='h6' gutterBottom>
            Email: {email || 'Not Available'}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Name: {name || 'Not Available'}
          </Typography>
          <Button
            variant='contained'
            color='primary' // Change to appropriate color
            size='large'
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Grid>
        <Grid item sm={8}>
          <ChangePassword />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
