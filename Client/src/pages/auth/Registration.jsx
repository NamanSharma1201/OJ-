import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/userAuthApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/userSlice';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
      tc: data.get('tc') === 'agree', // Check for the checkbox value
    };

    try {
      if (actualData.name && actualData.email && actualData.password && actualData.password_confirmation && actualData.tc) {
        if (actualData.password === actualData.password_confirmation) {
          const res = await registerUser({ name: actualData.name, email: actualData.email, password: actualData.password });

          // Assuming registerUser resolves with the user data or error message


          // Set the cookie (if needed, adjust as per your backend)
          document.cookie = `uid=${res.uid}; path=/;`;

          // Dispatch user data to Redux store
          dispatch(setUser({ name: actualData.name, email: actualData.email, problemsSolved: [] }));

          // Store user data in localStorage
          localStorage.setItem('name', actualData.name);
          localStorage.setItem('email', actualData.email);

          // Trigger Navbar update
          window.dispatchEvent(new Event('storage'));

          // Display success message and redirect to dashboard
          setError({ status: true, msg: "Registration successful", type: 'success' });
          navigate('/dashboard');
        } else {
          setError({ status: true, msg: "Password and Confirm Password Don't Match", type: 'error' });
        }
      } else {
        setError({ status: true, msg: "All Fields are Required", type: 'error' });
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg = error.message || "Registration failed. Please try again.";
      setError({ status: true, msg: errorMsg, type: 'error' });
    }

    setIsLoading(false); // Stop loading
  };

  return (
    <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      <TextField margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm Password' type='password' />
      <FormControlLabel control={<Checkbox value="agree" color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} disabled={isLoading}>Join</Button>
      </Box>
      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
    </Box>
  );
};

export default Registration;
