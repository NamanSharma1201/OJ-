import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import problemReducer from './features/problemSlice';
import userReducer from './features/userSlice'; // Import the reducer

export const store = configureStore({
  reducer: {
    user: userReducer, // Assign the user reducer to the user slice
    problem: problemReducer, // Assign the problem reducer to the problem slice
  },
});

setupListeners(store.dispatch);
