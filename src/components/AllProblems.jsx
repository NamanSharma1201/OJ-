import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableRow, Paper, Link, Typography,
    Container, Box, Chip, Avatar, useTheme, TableSortLabel
} from '@mui/material';
import { getAllProblems } from '../services/problemApi';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import { motion } from 'framer-motion';
import { alpha } from '@mui/material/styles';

const StyledTableContainer = styled(Paper)(({ theme }) => ({
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.shape.borderRadius * 2,
    overflow: 'hidden',
    margin: theme.spacing(4),
    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
    '& th': {
        color: theme.palette.common.white,
        fontWeight: 'bold',
        fontSize: '1rem',
        textTransform: 'uppercase',
        cursor: 'pointer',
    },
}));

const StyledTableRow = styled(motion.tr)(({ theme, issolved }) => ({
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: issolved === 'true' ? alpha(theme.palette.success.light, 0.15) : 'inherit',
    '&:hover': {
        backgroundColor: issolved === 'true'
            ? alpha(theme.palette.success.light, 0.25)
            : alpha(theme.palette.primary.main, 0.1),
        transform: 'scale(1.01)',
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(2),
    '& .MuiTableSortLabel-root': {
        color: theme.palette.common.white,
        fontWeight: 'bold',
        fontSize: '1rem',
        textTransform: 'uppercase',
        cursor: 'pointer',
        '&.MuiTableSortLabel-active': {
            color: theme.palette.common.white,
        },
    },
}));


const StyledProblemTitle = styled(Typography)({
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
    '&:hover': {
        color: '#2196f3',
    },
});

const difficultyColors = {
    Easy: '#4caf50',
    Medium: '#ff9800',
    Hard: '#f44336',
};

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
    Minimum_Spanning_Tree: '#607d8b',
};

const ColorChip = styled(Chip)(({ bgcolor }) => ({
    backgroundColor: bgcolor,
    color: '#ffffff',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    },
}));

const StatusIcon = styled(motion.div)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
}));

const CircleIndicator = styled(Avatar)(({ theme, bgcolor }) => ({
    width: 24,
    height: 24,
    backgroundColor: bgcolor || theme.palette.grey[500],
}));

const AllProblems = () => {
    const [problems, setProblems] = useState([]);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(null); // null to start with no initial sorting
    const theme = useTheme();
    const userEmail = localStorage.getItem('email');
    let serializedArray = localStorage.getItem(userEmail);
    if (serializedArray) {
        serializedArray = JSON.parse(serializedArray);
    } else {
        serializedArray = [];
    }

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const data = await getAllProblems();
                setProblems(data);
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };
        fetchProblems();
    }, []);

    const isProblemSolved = (problemID) => {
        return serializedArray && serializedArray.includes(problemID);
    };

    const handleRowClick = (problemID) => {
        setSelectedProblem(problemID);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedProblems = React.useMemo(() => {
        const comparator = (a, b) => {
            if (orderBy === 'difficulty') {
                const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
                return (difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]) * (order === 'asc' ? 1 : -1);
            }
            if (orderBy === 'submissions') {
                return (a.submissions - b.submissions) * (order === 'asc' ? 1 : -1);
            }
            return 0;
        };

        // Sort only if orderBy is not null
        if (orderBy) {
            return [...problems].sort(comparator);
        } else {
            return [...problems]; // Return unsorted array
        }
    }, [problems, order, orderBy]);

    return (
        <Container maxWidth="lg">
            <Box my={6}>
                <Typography variant="h3" component="h1" gutterBottom align="center"
                    sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 4 }}>
                    Problem Set
                </Typography>
                <StyledTableContainer elevation={3} component={motion.div}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}>
                    <Table aria-label="problems table">
                        <StyledTableHead>
                            <TableRow>
                                <StyledTableCell>
                                    ID
                                </StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell>
                                    <TableSortLabel
                                        active={orderBy === 'difficulty'}
                                        direction={orderBy === 'difficulty' ? order : 'asc'}
                                        onClick={() => handleRequestSort('difficulty')}
                                    >
                                        Difficulty
                                    </TableSortLabel>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <TableSortLabel
                                        active={orderBy === 'submissions'}
                                        direction={orderBy === 'submissions' ? order : 'asc'}
                                        onClick={() => handleRequestSort('submissions')}
                                    >
                                        Submissions
                                    </TableSortLabel>
                                </StyledTableCell>
                                <StyledTableCell>Asked In</StyledTableCell>
                                <StyledTableCell>Topic</StyledTableCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {sortedProblems.map((problem, index) => {
                                const isSolved = isProblemSolved(problem.problemID);
                                return (
                                    <StyledTableRow
                                        key={problem.problemID}
                                        onClick={() => handleRowClick(problem.problemID)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        issolved={isSolved.toString()}
                                    >
                                        <StyledTableCell>{problem.problemID}</StyledTableCell>
                                        <StyledTableCell>
                                            {isSolved && (
                                                <StatusIcon
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                >
                                                    <DoneIcon fontSize="small" />
                                                </StatusIcon>
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Link component={RouterLink} to={`/problem/${problem.problemID}`} color="inherit" underline="none">
                                                <StyledProblemTitle variant="body1">
                                                    {problem.title}
                                                </StyledProblemTitle>
                                            </Link>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <ColorChip
                                                label={problem.difficulty}
                                                bgcolor={difficultyColors[problem.difficulty]}
                                                size="small"
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>{problem.submissions}</StyledTableCell>
                                        <StyledTableCell>
                                            {problem.askedIn && (
                                                <ColorChip
                                                    label={problem.askedIn}
                                                    bgcolor={topicColors[problem.askedIn] || '#757575'}
                                                    size="small"
                                                />
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <ColorChip
                                                label={problem.topic}
                                                bgcolor={topicColors[problem.topic] || '#757575'}
                                                size="small"
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            </Box>
        </Container>
    );
};

export default AllProblems;
