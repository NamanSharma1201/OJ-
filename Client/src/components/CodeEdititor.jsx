import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-dracula';
import {
    Box,
    Select,
    MenuItem,
    TextField,
    Button,
    Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { runCode, submitCode } from '../services/codeApi'; // Adjust the path as per your project structure
import { setProblem } from '../features/problemSlice';
import { updateProblemStats } from '../services/problemApi';
import { updateSolvedProblems } from '../services/updateUser';
import { setSolvedProblems } from '../features/userSlice';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    minHeight: '89vh',
    overflow: 'auto',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    color: '#ffffff',
    '& .MuiSelect-icon': {
        color: '#ffffff',
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        color: '#ffffff',
    },
    '& .MuiInputLabel-root': {
        color: '#a0a0a0',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#505050',
        },
        '&:hover fieldset': {
            borderColor: '#707070',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#909090',
        },
    },
}));

const CodeEditor = () => {
    const email = localStorage.getItem('email');
    const hiddenInputs = useSelector(state => state.problem.hiddenInputs);
    const hiddenOutputs = useSelector(state => state.problem.hiddenOutputs);
    const problemID = useSelector(state => state.problem.problemID);
    const submissions = useSelector(state => state.problem.submissions);
    const accuracy = useSelector(state => state.problem.accuracy);
    const correctSubmission = useSelector(state => state.problem.correctSubmission);
    const dispatch = useDispatch();
    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState('// Write your code here');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleCodeChange = (value) => {
        setCode(value);
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const getExtension = (language) => {
        switch (language) {
            case 'javascript': return 'js';
            case 'python': return 'py';
            case 'java': return 'java';
            case 'cpp': return 'cpp';
            default: return '';
        }
    };

    const handleRun = async () => {
        try {
            const response = await runCode(getExtension(language), code, input);
            setOutput(response);
        } catch (error) {
            setOutput(`Error running code: ${error.message}`);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await submitCode(getExtension(language), code, hiddenInputs, hiddenOutputs);
            console.log(response);
            const isAccepted = response === 'ACCEPTED';

            dispatch(setProblem({
                problemID: problemID,
                submissions: submissions + 1,
                correctSubmission: correctSubmission + (isAccepted ? 1 : 0),
                hiddenInputs: hiddenInputs,
                hiddenOutputs: hiddenOutputs,
            }));

            let res = await updateProblemStats(problemID, submissions, accuracy, correctSubmission);

            if (isAccepted) {
                res = await updateSolvedProblems(email, problemID);

                dispatch(setSolvedProblems(res));
            }

            setOutput(response);
        } catch (error) {
            setOutput(`Error submitting code: ${error.message}`);
        }
    };

    return (
        <StyledPaper elevation={10}>
            <Box mb={2}>
                <StyledSelect value={language} onChange={handleLanguageChange} fullWidth>
                    <MenuItem value="javascript">JavaScript</MenuItem>
                    <MenuItem value="python">Python</MenuItem>
                    <MenuItem value="java">Java</MenuItem>
                    <MenuItem value="cpp">C++</MenuItem>
                </StyledSelect>
            </Box>

            <AceEditor
                mode={language}
                theme="dracula"
                value={code}
                onChange={handleCodeChange}
                name="code-editor"
                editorProps={{ $blockScrolling: true }}
                width="100%"
                height="50vh"
                fontSize={16}
            />

            <Box mt={2} display="flex" justifyContent="space-between">
                <StyledTextField
                    label="Input"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={handleInputChange}
                />

                <Box width={16} />

                <StyledTextField
                    label="Output"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    value={output}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Box>

            <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={handleRun} style={{ width: '48%' }}>
                    Run Code
                </Button>
                <Button variant="contained" color="secondary" onClick={handleSubmit} style={{ width: '48%' }}>
                    Submit Code
                </Button>
            </Box>
        </StyledPaper>
    );
};

export default CodeEditor;
