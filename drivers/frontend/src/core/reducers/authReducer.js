import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokenAndUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { setTokenAndUser } = authSlice.actions;

export default authSlice.reducer;
