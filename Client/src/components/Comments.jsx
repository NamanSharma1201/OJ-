import React, { useState, useEffect } from 'react';
import { getComments, createComment } from '../services/commentApi';
import {
    Typography,
    TextField,
    Button,
    Box,
    Avatar,
    List,
    ListItem,
    Divider,
    ToggleButtonGroup,
    ToggleButton,
    Paper,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material';
import { styled } from '@mui/system';
import { Send as SendIcon, Sort as SortIcon } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

const NotLoginBanner = ({ open, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity="warning" sx={{ width: '100%' }}>
                Please log in to post a comment.
            </Alert>
        </Snackbar>
    );
};

const Comments = ({ id }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showNotLoginBanner, setShowNotLoginBanner] = useState(false);

    useEffect(() => {
        fetchComments();
    }, [id]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const fetchedComments = await getComments(id);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setError('Failed to fetch comments');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!localStorage.getItem('name')) {
            setShowNotLoginBanner(true);
            return;
        }

        if (newComment.trim()) {
            try {
                const createdComment = await createComment({ id, content: newComment, name: localStorage.getItem('name') });
                setComments(prevComments => [createdComment, ...prevComments]);
                setNewComment('');
                setSnackbarMessage('Comment posted successfully');
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Error creating comment:', error);
                setSnackbarMessage('Failed to post comment');
                setSnackbarOpen(true);
            }
        }
    };

    const sortComments = (commentsToSort) => {
        return [...commentsToSort].sort((a, b) => {
            if (sortOrder === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
        });
    };

    const handleSortChange = (event, newSortOrder) => {
        if (newSortOrder !== null) {
            setSortOrder(newSortOrder);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleNotLoginBannerClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowNotLoginBanner(false);
    };

    const sortedComments = sortComments(comments);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <StyledPaper elevation={1}>
            <Typography variant="h6" gutterBottom>
                Comments
            </Typography>

            <StyledToggleButtonGroup
                value={sortOrder}
                exclusive
                onChange={handleSortChange}
                aria-label="sort order"
            >
                <ToggleButton value="newest" aria-label="sort by newest">
                    <SortIcon /> Newest
                </ToggleButton>
                <ToggleButton value="oldest" aria-label="sort by oldest">
                    <SortIcon /> Oldest
                </ToggleButton>
            </StyledToggleButtonGroup>

            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ mb: 1 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    size="small"
                >
                    Post Comment
                </Button>
            </Box>

            <List>
                {sortedComments.map((comment, index) => (
                    <React.Fragment key={comment._id}>
                        <ListItem alignItems="flex-start">
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Avatar sx={{ mr: 1, width: 24, height: 24, fontSize: 12 }}>{comment.name[0]}</Avatar>
                                    <Typography variant="subtitle2">
                                        {comment.name}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" paragraph>
                                    {comment.content}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </Typography>
                            </Box>
                        </ListItem>
                        {index < sortedComments.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
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
            <NotLoginBanner open={showNotLoginBanner} onClose={handleNotLoginBannerClose} />
        </StyledPaper>
    );
};

export default Comments;