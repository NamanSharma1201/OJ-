import React, { useEffect, useState } from 'react';
import { Button, CssBaseline, Grid, Typography, Box, Paper, Container, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './auth/ChangePassword';
import { unsetUser } from '../features/userSlice';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  backgroundColor: theme.palette.background.default,
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAdminBanner, setShowAdminBanner] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

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

  const name = useLocalStorage('name');
  const email = useLocalStorage('email');
  const role = useLocalStorage('role');

  useEffect(() => {
    if (!name) {
      navigate('/login');
    }
  }, [name, navigate]);

  const handleLogout = () => {
    document.cookie = 'uid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    dispatch(unsetUser());
    navigate('/login');
  };

  const handleCreateProblem = () => {
    if (role === 'admin') {
      navigate('/create-problem');
    } else {
      setShowAdminBanner(true);
    }
  };

  const handleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <StyledPaper elevation={3}>
              <Typography variant="h4" gutterBottom>
                Dashboard
              </Typography>
              <Box sx={{ mt: 2, mb: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  {name || 'Not Available'}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {email || 'Not Available'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Role: {role || 'Not Available'}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={8}>
            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>
                Actions
              </Typography>
              <Box sx={{ width: '100%', mt: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  startIcon={<LockIcon />}
                  sx={{ mb: 2 }}
                  onClick={handleChangePassword}
                >
                  {showChangePassword ? 'Hide Change Password' : 'Change Password'}
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                  onClick={handleCreateProblem}
                >
                  Create New Problem
                </Button>
              </Box>
              {showChangePassword && (
                <Box sx={{ mt: 4, width: '100%' }}>
                  <ChangePassword />
                </Box>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={showAdminBanner}
        autoHideDuration={6000}
        onClose={() => setShowAdminBanner(false)}
        message="You are not an admin. Access denied."
      />
    </Container>
  );
};

export default Dashboard;