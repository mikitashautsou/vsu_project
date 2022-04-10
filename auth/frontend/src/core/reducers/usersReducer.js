import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    _id: '',
    username: '',
    firstName: '',
    lastName: '',
    role: '',
  },
  users: [],
  isLoading: false,
  status: '',
  message: '',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, _) => {
      state.isLoading = true;
    },

    createUserSuccess: (state, action) => {
      state.status = action.payload;
      state.isLoading = false;
    },

    getUsers: (state, _) => {
      state.isLoading = true;
    },

    getUsersSuccess: (state, action) => {
      state.status = action.payload.status;
      state.users = action.payload.response;
      state.isLoading = false;
    },

    getUser: (state, _) => {
      state.isLoading = true;
    },

    getUserSuccess: (state, action) => {
      state.status = action.payload;
      state.isLoading = false;
    },

    updateUser: (state, _) => {
      state.isLoading = true;
    },

    updateUserSuccess: (state, action) => {
      state.status = action.payload;
      state.isLoading = false;
    },

    deleteUser: (state, _) => {
      state.isLoading = true;
    },

    deleteUserSuccess: (state, action) => {
      state.status = action.payload.status;
      state.isLoading = false;
    },

    actionFailid: (state, action) => {
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

export const {
  createUser,
  createUserSuccess,
  getUsers,
  getUsersSuccess,
  getUser,
  getUserSuccess,
  updateUser,
  updateUserSuccess,
  deleteUser,
  deleteUserSuccess,
  actionFailid,
  deleteMessage,
} = userSlice.actions;

export default userSlice.reducer;
