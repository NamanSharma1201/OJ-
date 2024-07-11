// features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: null,
    email: null,
    problemsSolved: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.problemsSolved = action.payload.problemsSolved || [];
            const serializedArray = JSON.stringify(state.problemsSolved);
            localStorage.setItem(state.email, serializedArray);
        },
        setSolvedProblems: (state, action) => {
            state.problemsSolved = action.payload;

            const serializedArray = JSON.stringify(state.problemsSolved);
            localStorage.setItem(localStorage.getItem('email'), serializedArray);
        },
        unsetUser: (state) => {
            if (state.email) {
                localStorage.removeItem(state.email);
            }
            state.name = null;
            state.email = null;
            state.problemsSolved = [];
        },
    },
});

export const { setUser, unsetUser, setSolvedProblems } = userSlice.actions;
export default userSlice.reducer;
