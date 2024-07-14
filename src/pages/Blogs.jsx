import React, { useState, useEffect } from 'react';
import { getAllBlogs, likeBlog } from '../services/blogsApi';
import {
    Container, Typography, Card, CardContent, CardActions,
    IconButton, Select, MenuItem, FormControl, InputLabel, Button, Box, Avatar, Chip,
    Snackbar, Alert
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const likeAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        background: {
            default: '#f0f2ff',
        },
    },
});

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: theme.spacing(2),
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
}));

const PageContainer = styled(Box)({
    minHeight: '100vh',
    backgroundImage: 'url("/src/images/background.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
});

const ContentContainer = styled(Container)({
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    padding: '32px',
    marginTop: '32px',
    marginBottom: '32px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
});

const NotLoginBanner = ({ open, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity="warning" sx={{ width: '100%' }}>
                Please log in to perform this action.
            </Alert>
        </Snackbar>
    );
};

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [showNotLoginBanner, setShowNotLoginBanner] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await getAllBlogs();
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const sortBlogs = (criteria) => {
        let sortedBlogs = [...blogs];
        if (criteria === 'newest') {
            sortedBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (criteria === 'oldest') {
            sortedBlogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (criteria === 'likes') {
            sortedBlogs.sort((a, b) => b.likes - a.likes);
        }
        setBlogs(sortedBlogs);
        setSortBy(criteria);
    };

    const handleBlogClick = (id) => {
        navigate(`/blog/${id}`);
    };

    const handleLike = async (id, event) => {
        event.stopPropagation();
        if (!localStorage.getItem('name')) {
            setShowNotLoginBanner(true);
            return;
        }
        try {
            await likeBlog(id);
            fetchBlogs();
        } catch (error) {
            console.error('Error liking blog:', error);
        }
    };

    const handleCreateBlogClick = () => {
        if (!localStorage.getItem('name')) {
            setShowNotLoginBanner(true);
            return;
        }
        navigate('/create-blog');
    };

    const handleCloseNotLoginBanner = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowNotLoginBanner(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <ContentContainer maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h3" component="h1" fontWeight="bold" color="primary">
                            Our Blog
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleCreateBlogClick}
                            sx={{ borderRadius: '25px', padding: '10px 20px' }}
                        >
                            Create Blog
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
                        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                            <InputLabel id="sort-label">Sort by</InputLabel>
                            <Select
                                labelId="sort-label"
                                id="sort"
                                value={sortBy}
                                onChange={(e) => sortBlogs(e.target.value)}
                                label="Sort by"
                            >
                                <MenuItem value="newest">Newest</MenuItem>
                                <MenuItem value="oldest">Oldest</MenuItem>
                                <MenuItem value="likes">Most Liked</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {blogs.map((blog) => (
                        <StyledCard key={blog.id} onClick={() => handleBlogClick(blog.id)}>
                            <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h5" component="h2" fontWeight="bold" color="primary" gutterBottom>
                                    {blog.title}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar sx={{ bgcolor: '#3f51b5', mr: 2 }}>
                                        {blog.author.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Typography variant="subtitle1">
                                        {blog.author}
                                    </Typography>
                                    <Chip
                                        label={new Date(blog.createdAt).toLocaleDateString()}
                                        size="small"
                                        sx={{ ml: 2 }}
                                    />
                                </Box>
                            </CardContent>
                            <CardActions sx={{ alignItems: 'center', padding: '16px' }}>
                                <IconButton
                                    aria-label="like"
                                    onClick={(event) => handleLike(blog.id, event)}
                                    sx={{
                                        '&:active': {
                                            animation: `${likeAnimation} 0.5s`
                                        }
                                    }}
                                >
                                    <FavoriteIcon color="error" />
                                </IconButton>
                                <Typography variant="body2" color="text.secondary">
                                    {blog.likes} likes
                                </Typography>
                            </CardActions>
                        </StyledCard>
                    ))}
                </ContentContainer>
            </PageContainer>
            <NotLoginBanner open={showNotLoginBanner} onClose={handleCloseNotLoginBanner} />
        </ThemeProvider>
    );
};

export default Blogs;