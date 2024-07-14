import React, { useState } from 'react';
import { Grid, TextField, Button, Box, Alert, CircularProgress } from "@mui/material";
import forgetPassImage from "../../images/forgetPass.png";
import { sendPasswordResetEmail } from "../../services/userAuthApi";

const SendPasswordResetEmail = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  });
  const [loading, setLoading] = useState(false); // State to manage loading state


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email');

    if (email && validateEmail(email)) {
      try {
        setLoading(true); // Set loading state to true before making the API call
        const res = await sendPasswordResetEmail({ email });
        console.log(res);
        document.getElementById('password-reset-email-form').reset();
        setError({ status: true, msg: "Password Reset Email Sent. Check Your Email !!", type: 'success' });
      } catch (error) {
        console.error("Error sending password reset email:", error);
        setError({ status: true, msg: "Failed to send password reset email. Please try again.", type: 'error' });
      } finally {
        setLoading(false); // Set loading state back to false after API call completes
      }
    } else {
      setError({ status: true, msg: "Please Provide a Valid Email", type: 'error' });
    }
  };

  const validateEmail = (email) => {
    // Basic email validation using regular expression
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <Grid container sx={{ height: '90vh' }}>
      {/* Left side (Background Image) */}
      <Grid item lg={7} sx={{
        backgroundImage: `url(${forgetPassImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: { xs: 'none', sm: 'block' }
      }}>
      </Grid>
      {/* Right side (Form) */}
      <Grid item lg={5} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ p: 4, width: '80%' }}>
          <h3>Enter your Registered Email Address</h3>
          <form id='password-reset-email-form' noValidate onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
            <Button type='submit' variant='contained' color='primary' sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Send'}
            </Button>
            {error.status && <Alert severity={error.type}>{error.msg}</Alert>}
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SendPasswordResetEmail;
