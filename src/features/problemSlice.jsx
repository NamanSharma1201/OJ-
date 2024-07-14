import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    problemID: -1,
    submissions: 0,
    accuracy: 0,
    correctSubmission: 0,
    hiddenInputs: [],
    hiddenOutputs: [],
};

const problemSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {
        setProblem: (state, action) => {
            state.problemID = action.payload.problemID;
            state.submissions = action.payload.submissions;
            state.correctSubmission = action.payload.correctSubmission;
            state.accuracy = state.submissions > 0 ? (state.correctSubmission / state.submissions) * 100 : 0;
            state.hiddenInputs = action.payload.hiddenInputs;
            state.hiddenOutputs = action.payload.hiddenOutputs;
        }
    }
});

export const { setProblem } = problemSlice.actions;
export default problemSlice.reducer;
