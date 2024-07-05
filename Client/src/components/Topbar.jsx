import React from 'react';
import { Typography, Box, Table, TableContainer, TableHead, TableRow, TableCell, Paper } from '@mui/material';

const Topbar = () => {
    return (
        <Box sx={{ pt: 4, pb: 2 }}>
            <Typography variant="h5" align="center" color="text.secondary" gutterBottom>
                QUALITY OVER QUANTITY  👇
            </Typography>

        </Box>
    );
};

export default Topbar;
