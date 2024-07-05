import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    problemID: -1,
    submissions: 0,
    accuracy: 0,
    correctSubmission: 0,

}
const problemSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {
        setProblem: (state, action) => {
            state.problemID = action.payload.problemID;
            state.submissions = action.payload.submissions;
            state.accuracy = action.payload.accuracy;
            state.correctSubmission = action.payload.correctSubmission;
        }
    }
});

export const { setProblem } = problemSlice.actions;
export default problemSlice.reducer;