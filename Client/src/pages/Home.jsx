import { Grid } from "@mui/material";
import backgroundImage from '../images/background.jpg'; // Make sure to adjust the path if needed

const Home = () => {
  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh', // Adjust height as needed
      width: '100vw' // Adjust width as needed
    }}>
      <Grid container justifyContent="center">
        <Grid item sm={10}>
          <h1>Home Page</h1>
          <hr />

        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
