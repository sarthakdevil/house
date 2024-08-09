// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/index'; // Import your root reducer

export const store = configureStore({
  reducer: rootReducer,
});
