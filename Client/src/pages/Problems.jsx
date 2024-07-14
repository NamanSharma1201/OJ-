import React from 'react';
import { Box, Container } from '@mui/material';
import Topbar from '../components/Topbar';
import AllProblems from '../components/AllProblems';
import backgroundImage from '../images/background.jpg'; // Make sure to adjust the path if needed

const Problems = () => {
    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* <Topbar /> */}
                <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                    <AllProblems />
                </Container>
            </Box>
        </div>
    );
};

export default Problems;
