import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createBlog } from '../services/blogsApi';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes } from '@mui/system';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Banner = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(6),
    marginBottom: theme.spacing(4),
    background: 'linear-gradient(270deg, #3a1c71, #d76d77, #ffaf7b)',
    backgroundSize: '400% 400%',
    color: 'white',
    textAlign: 'center',
    borderRadius: theme.shape.borderRadius,
    animation: `${gradientAnimation} 15s ease infinite`,
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '15px',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            await createBlog({
                title,
                content,
                author: localStorage.getItem('name'),
            });

            setTitle('');
            setContent('');
            setMessage('Blog created successfully!');

            setTimeout(() => {
                navigate('/blogs');
            }, 2000);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Banner>
                <Typography variant="h3" component="h3" fontWeight="bold">
                    Craft Your Vision
                </Typography>
                <Typography variant="h6">Share your thoughts with the world</Typography>
            </Banner>
            <StyledPaper>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                        required
                        InputProps={{
                            style: { borderRadius: '10px' },
                        }}
                    />
                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                        Content
                    </Typography>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        style={{ height: '300px', marginBottom: '50px', borderRadius: '10px' }}
                    />
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <StyledButton
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Publish Blog'}
                        </StyledButton>
                    </Box>
                </form>
                {message && (
                    <Typography
                        color={message.startsWith('Error') ? 'error' : 'success'}
                        sx={{ mt: 2, textAlign: 'center' }}
                    >
                        {message}
                    </Typography>
                )}
            </StyledPaper>
        </Container>
    );
};

export default CreateBlog;