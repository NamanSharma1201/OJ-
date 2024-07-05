// features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: null,
    email: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        unsetUser: (state) => {
            state.name = null;
            state.email = null;
        },
    },
});

export const { setUser, unsetUser } = userSlice.actions;
export default userSlice.reducer;
