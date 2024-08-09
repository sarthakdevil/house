import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    status: 'idle',
    error: null,
  };
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload; // Store user information
          },
          loginFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload; // Store error message
          },
          logout: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
          },
        },
    });
export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;    