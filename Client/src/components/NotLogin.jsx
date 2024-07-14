import React from 'react';
import { Alert, Snackbar } from '@mui/material';

const NotLoginBanner = ({ open, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
            <Alert onClose={onClose} severity="warning" sx={{ width: '100%' }}>
                Please log in to run or submit code.
            </Alert>
        </Snackbar>
    );
};

export default NotLoginBanner;