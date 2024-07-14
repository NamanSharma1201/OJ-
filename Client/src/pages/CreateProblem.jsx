import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createProblem } from '../services/problemApi';
import he from 'he';

import {
    TextField,
    Select,
    MenuItem,
    Button,
    Snackbar,
    CircularProgress,
    Typography,
    Container,
    Grid,
    Box,
    Divider
} from '@mui/material';
import { Alert } from '@mui/material';

// Define the topic colors object
const topicColors = {
    Array: '#2196f3',
    String: '#9c27b0',
    Dynamic_Programming: '#00bcd4',
    Math: '#ff5722',
    Graph: '#4caf50',
    Tree: '#8bc34a',
    Sort: '#cddc39',
    Two_Pointers: '#ffc107',
    Binary_Search: '#795548',
    Recursion: '#607d8b',
    Greedy: '#f44336',
    Backtracking: '#673ab7',
    Bit_Manipulation: '#ff9800',
    Hashing: '#009688',
    Stack: '#ffeb3b',
    Queue: '#03a9f4',
    Linked_List: '#9e9e9e',
    Heap: '#ff7043',
    Divide_and_Conquer: '#8d6e63',
    Geometry: '#9c27b0',
    Union_Find: '#4caf50',
    Trie: '#00bcd4',
    Segment_Tree: '#8bc34a',
    Fenwick_Tree: '#cddc39',
    Suffix_Array: '#ffc107',
    Suffix_Tree: '#795548',
    Binary_Indexed_Tree: '#607d8b',
    Disjoint_Set_Union: '#2196f3',
    Topological_Sort: '#ff5722',
    Breadth_First_Search: '#4caf50',
    Depth_First_Search: '#00bcd4',
    Shortest_Path: '#9c27b0',
    Minimum_Spanning_Tree: '#607d8b'
};

const stripHtml = (html) => {
    const decodedString = he.decode(html);
    return decodedString.replace(/<[^>]*>?/gm, '');
};

const CreateProblem = () => {
    const [problem, setProblem] = useState({
        title: '',
        description: '',
        inputFormat: '',
        outputFormat: '',
        difficulty: 'easy',
        topic: Object.keys(topicColors)[0] || '',
        askedIn: '',
        hiddenInputs: [''],
        hiddenOutputs: [''],
    });

    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProblem(prev => ({ ...prev, [name]: value }));
    };

    const handleQuillChange = (value, field) => {
        setProblem(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (index, value, field) => {
        setProblem(prev => {
            const newArray = [...prev[field]];
            newArray[index] = value;
            return { ...prev, [field]: newArray };
        });
    };

    const addArrayField = (field) => {
        setProblem(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const sanitizedProblem = {
            ...problem,
            description: stripHtml(problem.description),
            inputFormat: stripHtml(problem.inputFormat),
            outputFormat: stripHtml(problem.outputFormat)
        };

        try {
            const response = await createProblem(problem);
            console.log('Problem created:', sanitizedProblem);
            setSnackbar({ open: true, message: 'Problem created successfully!', severity: 'success' });
        } catch (error) {
            console.error('Error creating problem:', error);
            setSnackbar({ open: true, message: 'Failed to create problem. Please try again.', severity: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, bgcolor: 'background.paper', boxShadow: 1, borderRadius: 1 }}>
                <Typography variant="h4" gutterBottom>Create New Problem</Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    name="title"
                    label="Title"
                    value={problem.title}
                    onChange={handleChange}
                    required
                />

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Problem Description</Typography>
                <ReactQuill
                    value={problem.description}
                    onChange={(value) => handleQuillChange(value, 'description')}
                    required

                    placeholder="Description"
                    sx={{ mb: 2 }}
                />

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Input Format</Typography>
                <ReactQuill
                    value={problem.inputFormat}
                    required

                    onChange={(value) => handleQuillChange(value, 'inputFormat')}
                    placeholder="Input Format"
                    sx={{ mb: 2 }}
                />

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Output Format</Typography>
                <ReactQuill
                    value={problem.outputFormat}
                    required

                    onChange={(value) => handleQuillChange(value, 'outputFormat')}
                    placeholder="Output Format"
                    sx={{ mb: 2 }}
                />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Select
                            fullWidth
                            margin="normal"
                            name="difficulty"
                            value={problem.difficulty}
                            required

                            onChange={handleChange}

                            sx={{ mt: 2 }}
                        >
                            <MenuItem value="Easy">Easy</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Hard">Hard</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            fullWidth
                            margin="normal"
                            name="topic"
                            value={problem.topic}
                            required

                            onChange={handleChange}

                            sx={{ mt: 2, backgroundColor: topicColors[problem.topic] || '#ffffff' }}
                        >
                            {Object.keys(topicColors).map((topic) => (
                                <MenuItem key={topic} value={topic}>{topic}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>

                <TextField
                    fullWidth
                    margin="normal"
                    name="askedIn"
                    label="Asked In (Optional)"
                    value={problem.askedIn}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                />

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Hidden Inputs</Typography>
                {problem.hiddenInputs.map((input, index) => (
                    <TextField
                        key={`input-${index}`}
                        fullWidth
                        margin="normal"
                        value={input}
                        required

                        onChange={(e) => handleArrayChange(index, e.target.value, 'hiddenInputs')}
                        placeholder={`Hidden Input ${index + 1}`}
                        sx={{ mb: 1 }}
                    />
                ))}
                <Button onClick={() => addArrayField('hiddenInputs')} variant="outlined" sx={{ mt: 1 }}>
                    Add Hidden Input
                </Button>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Hidden Outputs</Typography>
                {problem.hiddenOutputs.map((output, index) => (
                    <TextField
                        key={`output-${index}`}
                        fullWidth
                        margin="normal"
                        required

                        value={output}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'hiddenOutputs')}
                        placeholder={`Hidden Output ${index + 1}`}
                        sx={{ mb: 1 }}
                    />
                ))}
                <Button onClick={() => addArrayField('hiddenOutputs')} variant="outlined" sx={{ mt: 1, mb: 2 }}>
                    Add Hidden Output
                </Button>

                <Divider sx={{ mt: 2, mb: 2 }} />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    sx={{ mt: 2, mb: 2, textTransform: 'none', width: '100%', height: '56px' }}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Create Problem'}
                </Button>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CreateProblem;
