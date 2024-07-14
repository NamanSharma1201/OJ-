import React, { useState, useEffect } from 'react';
import { getBlog, likeBlog } from '../services/blogsApi';
import {
    Typography,
    Paper,
    Box,
    Chip,
    ThemeProvider,
    createTheme,
    CircularProgress,
    IconButton,
    Snackbar
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3', // blue
        },
        secondary: {
            main: '#757575', // grey
        },
        background: {
            default: '#ffffff', // white
            paper: '#f5f5f5', // light grey
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
    },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
}));

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const LikeButton = styled(IconButton)(({ theme }) => ({
    '&:active': {
        animation: `${pulseAnimation} 0.3s ease-in-out`
    }
}));

const BlogContent = ({ id }) => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liking, setLiking] = useState(false);
    const [liked, setLiked] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const fetchedBlogData = await getBlog(id);
                if (fetchedBlogData && fetchedBlogData.length > 0) {
                    setBlog(fetchedBlogData[0]);
                } else {
                    setError('Blog post not found');
                }
            } catch (err) {
                setError('Failed to fetch blog post');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleLike = async () => {
        if (liking) return;
        setLiking(true);

        // Optimistic update
        setBlog(prevBlog => ({
            ...prevBlog,
            likes: prevBlog.likes + (liked ? -1 : 1)
        }));
        setLiked(!liked);

        try {
            await likeBlog(blog.id);
            setSnackbarMessage(liked ? 'Like removed' : 'Blog liked successfully');
        } catch (err) {
            console.error('Failed to like the blog', err);
            // Revert optimistic update
            setBlog(prevBlog => ({
                ...prevBlog,
                likes: prevBlog.likes + (liked ? 1 : -1)
            }));
            setLiked(!liked);
            setSnackbarMessage('Failed to update like');
        } finally {
            setLiking(false);
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!blog) return <Typography>Blog post not found</Typography>;

    return (
        <ThemeProvider theme={theme}>
            <StyledPaper elevation={3}>
                <Typography variant="h1" gutterBottom color="primary">
                    {blog.title}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Chip icon={<PersonIcon />} label={blog.author} variant="outlined" />
                    <Chip
                        icon={<DateRangeIcon />}
                        label={new Date(blog.createdAt).toLocaleString()}
                        variant="outlined"
                    />
                    <Box display="flex" alignItems="center">
                        <LikeButton onClick={handleLike} disabled={liking}>
                            <ThumbUpIcon color={liked ? "primary" : "action"} />
                        </LikeButton>
                        <Typography variant="body2" ml={1}>
                            {blog.likes} likes
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: blog.content }} />
                <Typography variant="caption" color="textSecondary" mt={2}>
                    Post ID: {blog.id}
                </Typography>
            </StyledPaper>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </ThemeProvider>
    );
};

export default BlogContent;