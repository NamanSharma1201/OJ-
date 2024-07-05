import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableRow, Paper, Link, Typography,
    Container, Box, Chip
} from '@mui/material';
import { getAllProblems } from '../services/problemApi';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(Paper)(({ theme }) => ({
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    '& th': {
        color: theme.palette.primary.contrastText,
        fontWeight: 'bold',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&.active': {
        boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main}`,
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '& td, & th': {
        padding: '12px', // Adjust cell padding for better spacing
    },
}));

const StyledProblemTitle = styled(Typography)({
    fontWeight: 'bold',
    '&:hover': {
        textDecoration: 'underline',
    },
});

const difficultyColors = {
    Easy: '#4caf50',    // Green
    Medium: '#ff9800',  // Orange
    Hard: '#f44336',    // Red
};

const topicColors = {
    Array: '#2196f3',           // Blue
    String: '#9c27b0',          // Purple
    Dynamic_Programming: '#00bcd4', // Cyan
    Math: '#ff5722',            // Deep Orange
    Graph: '#4caf50',           // Green
    Tree: '#8bc34a',            // Light Green
    Sort: '#cddc39',            // Lime
    Two_Pointers: '#ffc107',    // Amber
    Binary_Search: '#795548',   // Brown
    Recursion: '#607d8b',       // Blue Grey
};

const ColorChip = styled(Chip)(({ bgcolor }) => ({
    backgroundColor: bgcolor,
    color: '#ffffff',
    fontWeight: 'bold',
}));

const AllProblems = () => {
    const [problems, setProblems] = useState([]);
    const [selectedProblem, setSelectedProblem] = useState(null);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const data = await getAllProblems();
                setProblems(data);
            } catch (error) {
                console.error('Error fetching problems:', error);
                // Handle error as needed (e.g., show error message)
            }
        };
        fetchProblems();
    }, []);

    const handleRowClick = (problemID) => {
        setSelectedProblem(problemID);
        // Navigate to problem details page if needed
    };

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    All Problems
                </Typography>
                <StyledTableContainer elevation={3}>
                    <Table aria-label="problems table">
                        <StyledTableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Difficulty</TableCell>
                                <TableCell>Submissions</TableCell>
                                <TableCell>Asked In</TableCell>
                                <TableCell>Topic</TableCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {problems.map((problem) => (
                                <StyledTableRow
                                    key={problem.problemID}
                                    className={selectedProblem === problem.problemID ? 'active' : ''}
                                    onClick={() => handleRowClick(problem.problemID)}
                                >
                                    <TableCell>{problem.problemID}</TableCell>
                                    <TableCell>
                                        <Link component={RouterLink} to={`/problem/${problem.problemID}`} color="inherit" underline="none">
                                            <StyledProblemTitle variant="body1">
                                                {problem.title}
                                            </StyledProblemTitle>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <ColorChip
                                            label={problem.difficulty}
                                            bgcolor={difficultyColors[problem.difficulty]}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{problem.submissions}</TableCell>
                                    <TableCell>{problem.askedIn}</TableCell>
                                    <TableCell>
                                        <ColorChip
                                            label={problem.topic}
                                            bgcolor={topicColors[problem.topic] || '#757575'}
                                            size="small"
                                        />
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            </Box>
        </Container>
    );
};

export default AllProblems;
