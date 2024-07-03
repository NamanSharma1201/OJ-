import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './auth/ChangePassword.jsx';

const Dashboard = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('uid='));

    if (cookie) {
      document.cookie = cookie.split('=')[0] + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
      console.log('Token unset');
    } else {
      console.log('No `uid` cookie found to unset');
    }
    navigate('/login')
  }
  return <>
    <CssBaseline />
    <Grid container>
      <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
        <h1>Dashboard</h1>
        <Typography variant='h5'>Email: sonam@gmail.com</Typography>
        <Typography variant='h6'>Name: Sonam</Typography>
        <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
      </Grid>
      <Grid item sm={8}>
        <ChangePassword />
      </Grid>
    </Grid>
  </>;
};

export default Dashboard;