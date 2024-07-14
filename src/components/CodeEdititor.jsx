import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AceEditor from 'react-ace';

// Import modes
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';

// Import themes
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';

// Import additional features
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';

import {
    Box,
    Select,
    MenuItem,
    TextField,
    Button,
    Paper,
    Alert,
    Snackbar,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { runCode, submitCode } from '../services/codeApi';
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

const NotLoginBanner = ({ open, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity="warning" sx={{ width: '100%' }}>
                Please log in to run or submit code.
            </Alert>
        </Snackbar>
    );
};

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const CelebrationBanner = ({ show }) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: '20%',
                right: 0,
                backgroundColor: 'green',
                color: 'white',
                padding: '20px',
                borderRadius: '10px 0 0 10px',
                zIndex: 1000,
                animation: show ? `${slideIn} 0.5s ease-out` : 'none',
                transform: show ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.5s ease-out',
            }}
        >
            <Typography variant="h6">Congratulations!</Typography>
            <Typography>Your code has been accepted!</Typography>
        </Box>
    );
};

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
    const [showNotLoginBanner, setShowNotLoginBanner] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [theme, setTheme] = useState('dracula');

    useEffect(() => {
        // Set initial code based on language
        const initialCode = {
            javascript: '// Write your JavaScript code here\n\nfunction main() {\n  // Your code here\n}\n\nmain();',
            python: '# Write your Python code here\n\ndef main():\n    # Your code here\n    pass\n\nif __name__ == "__main__":\n    main()',
            java: 'public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}',
            cpp: '#include <iostream>\n\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}'
        };
        setCode(initialCode[language] || '// Write your code here');
    }, [language]);

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
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
        if (!email) {
            setShowNotLoginBanner(true);
            return;
        }

        try {
            const response = await runCode(getExtension(language), code, input);
            setOutput(response);
        } catch (error) {
            setOutput(`Error running code: ${error.message}`);
        }
    };

    const handleSubmit = async () => {
        if (!email) {
            setShowNotLoginBanner(true);
            return;
        }

        try {
            const response = await submitCode(getExtension(language), code, hiddenInputs, hiddenOutputs);

            const isAccepted = response === 'ACCEPTED';

            if (isAccepted) {
                setShowCelebration(true);
                setTimeout(() => setShowCelebration(false), 5000); // Hide after 5 seconds
            }

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

    const handleCloseBanner = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowNotLoginBanner(false);
    };

    return (
        <>
            <NotLoginBanner open={showNotLoginBanner} onClose={handleCloseBanner} />
            <CelebrationBanner show={showCelebration} />
            <StyledPaper elevation={10}>
                <Box mb={2} display="flex" justifyContent="space-between">
                    <StyledSelect value={language} onChange={handleLanguageChange} style={{ width: '48%' }}>
                        <MenuItem value="javascript">JavaScript</MenuItem>
                        <MenuItem value="python">Python</MenuItem>
                        <MenuItem value="java">Java</MenuItem>
                        <MenuItem value="cpp">C++</MenuItem>
                    </StyledSelect>
                    <StyledSelect value={theme} onChange={handleThemeChange} style={{ width: '48%' }}>
                        <MenuItem value="dracula">Dracula</MenuItem>
                        <MenuItem value="monokai">Monokai</MenuItem>
                        <MenuItem value="github">GitHub</MenuItem>
                    </StyledSelect>
                </Box>

                <AceEditor
                    mode={language}
                    theme={theme}
                    value={code}
                    onChange={handleCodeChange}
                    name="code-editor"
                    editorProps={{ $blockScrolling: true }}
                    width="100%"
                    height="50vh"
                    fontSize={16}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                        useWorker: false
                    }}
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
        </>
    );
};

export default CodeEditor;