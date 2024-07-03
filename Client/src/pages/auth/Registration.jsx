import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../services/userAuthApi';

const Registration = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
      tc: data.get('tc'),
    };

    if (actualData.name && actualData.email && actualData.password && actualData.password_confirmation && actualData.tc !== null) {
      if (actualData.password === actualData.password_confirmation) {
        try {
          const res = await registerUser({ name: actualData.name, email: actualData.email, password: actualData.password }).unwrap();

          // Check response structure

          // Set the cookie
          document.cookie = `uid=${res.uid}`;

          setError({ status: true, msg: "Registration successful", type: 'success' });
          navigate('/dashboard');
        } catch (error) {
          console.error("Registration error:", error);
          const errorMsg = error?.data?.message || "Registration failed. Please try again.";
          setError({ status: true, msg: errorMsg, type: 'error' });
        }
      } else {
        setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' });
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' });
    }
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
