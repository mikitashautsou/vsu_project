import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  user: {
    _id: '',
    username: '',
    firstName: '',
    lastName: '',
    role: '',
  },
  isLoading: false,
  status: '',
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state, _) => {
      state.isLoading = true;
    },

    signUpSuccess: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.isLoading = false;
    },

    signIn: (state, _) => {
      state.isLoading = true;
    },

    singInSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user._id = action.payload.user._id;
      state.user.username = action.payload.user.username;
      state.user.firstName = action.payload.user.firstName;
      state.user.lastName = action.payload.user.lastName;
      state.user.role = action.payload.user.role;
      state.isLoading = false;
    },

    actionFailid: (state, action) => {
      console.log(action.payload)
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.isLoading = false;
    },

    deleteMessage: (state) => {
      state.status = '';
      state.message = '';
    },
  },
});

export const { signUp, signUpSuccess, signIn, singInSuccess, actionFailid } = authSlice.actions;

export default authSlice.reducer;
