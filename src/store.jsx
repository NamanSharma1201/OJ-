import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import problemReducer from './features/problemSlice';
import userReducer from './features/userSlice'; // Import the reducer

export const store = configureStore({
  reducer: {
    user: userReducer,
    problem: problemReducer,
  },
});

setupListeners(store.dispatch);
