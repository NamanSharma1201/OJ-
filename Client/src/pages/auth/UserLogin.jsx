import { useState } from 'react';
import { Box, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/userSlice';
import { loginUser } from "../../services/userAuthApi";

const UserLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const formData = new FormData(e.currentTarget);
      const actualData = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      if (actualData.email && actualData.password) {
        const response = await loginUser({ email: actualData.email, password: actualData.password });

        // Set the cookie if received in response (handled by browser)
        document.cookie = `uid=${response.uid}`;
        dispatch(setUser({ name: response.name, email: response.email, problemsSolved: response.problemsSolved }));
        localStorage.setItem('name', response.name);
        localStorage.setItem('email', response.email);
        localStorage.setItem('role', response.role);
        window.dispatchEvent(new Event('storage')); // Trigger event to update components that depend on user state

        e.target.reset();
        setError({ status: true, msg: "Login Success", type: 'success' });
        navigate('/dashboard');
      } else {
        setError({ status: true, msg: "All Fields are Required", type: 'error' });
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = error?.response?.data?.message || "Login Failed. Please try again later.";
      setError({ status: true, msg: errorMsg, type: 'error' });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Box component='form' noValidate sx={{ mt: 9 }} id='login-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      <Box textAlign='center'>
        {isLoading ? <CircularProgress /> :
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>}
      </Box>
      <NavLink to='/sendpasswordresetemail' >Forgot Password ?</NavLink>
      {error.status && <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert>}
    </Box>
  );
};

export default UserLogin;
