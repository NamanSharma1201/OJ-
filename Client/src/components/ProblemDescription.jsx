import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProblem } from '../features/problemSlice';
import {
    Typography,
    Paper,
    Box,
    Chip,
    Divider,
    CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getProblemById } from '../services/problemApi';

const FullHeightPaper = styled(Paper)(({ theme }) => ({
    height: '91vh',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    overflowY: 'auto',
    backgroundColor: '#d2feed20', // Light bluish-grey background
}));

const CursiveHeading = styled(Typography)(({ theme }) => ({
    fontFamily: "Arial",
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
}));

const DifficultyChip = styled(Chip)(({ theme, difficulty }) => ({
    backgroundColor:
        difficulty === 'easy' ? theme.palette.success.main :
            difficulty === 'medium' ? theme.palette.warning.main :
                theme.palette.error.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
}));

const ProblemDescription = ({ id }) => {
    const dispatch = useDispatch();
    const submissions = useSelector(state => state.problem.submissions);
    const accuracy = useSelector(state => state.problem.accuracy);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [problem, setProblemLocal] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const data = await getProblemById(id);
                dispatch(setProblem(data)); // Update Redux state
                setProblemLocal(data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching problem details');
                setLoading(false);
            }
        };

        fetchProblem();
    }, [dispatch, id]);

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
        </Box>
    );

    if (error) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography color="error">{error}</Typography>
        </Box>
    );

    if (!problem || !problem.title) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography>No problem found</Typography>
        </Box>
    );

    // Function to safely parse HTML content
    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };

    return (
        <FullHeightPaper elevation={3}>
            <CursiveHeading variant="h3">{problem.title}</CursiveHeading>
            <Box display="flex" alignItems="center" mb={2}>
                <DifficultyChip label={problem.difficulty} difficulty={problem.difficulty} />
                <Box ml={2}>
                    <Typography variant="body2">Topic: {problem.topic}</Typography>
                </Box>
            </Box>
            <Divider />

            <Box flex={1} overflow="auto">
                <SectionTitle variant="h6">Description</SectionTitle>
                <Typography variant="body1" paragraph dangerouslySetInnerHTML={createMarkup(problem.description)} />

                <SectionTitle variant="h6">Input Format</SectionTitle>
                <Typography variant="body1" paragraph dangerouslySetInnerHTML={createMarkup(problem.inputFormat)} />

                <SectionTitle variant="h6">Output Format</SectionTitle>
                <Typography variant="body1" paragraph dangerouslySetInnerHTML={createMarkup(problem.outputFormat)} />
            </Box>

            <Divider />

            <Box mt={2} display="flex" justifyContent="space-between">
                <Typography variant="body2">Submissions: {submissions}</Typography>
                <Typography variant="body2">Accuracy: {accuracy}%</Typography>
            </Box>

            {problem.askedIn && (
                <Typography variant="body2" mt={1}>
                    Asked in: {problem.askedIn}
                </Typography>
            )}
        </FullHeightPaper>
    );
};

export default ProblemDescription;
