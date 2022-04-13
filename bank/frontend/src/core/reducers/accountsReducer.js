import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allAccounts: [],
  userAccounts: [],
  isLoading: false,
  status: '',
  message: '',
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    createAccount: (state, _) => {
      state.isLoading = true;
    },

    createAccountSuccess: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.response;
      state.isLoading = false;
    },

    getAllAccounts: (state, _) => {
      state.isLoading = true;
    },

    getAllAccountsSuccess: (state, action) => {
      state.status = action.payload.status;
      state.allAccounts = action.payload.response;
      state.isLoading = false;
    },

    getUserAccounts: (state, _) => {
      state.isLoading = true;
    },

    getUserAccountsSuccess: (state, action) => {
      state.status = action.payload.status;
      state.userAccounts = action.payload.response;
      state.isLoading = false;
    },

    deposit: (state, _) => {
      state.isLoading = true;
    },

    depositSuccess: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.response;
      state.isLoading = false;
    },

    updateAccount: (state, _) => {
      state.isLoading = true;
    },

    updateAccountSuccess: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.response;
      state.isLoading = false;
    },

    deleteAccount: (state, _) => {
      state.isLoading = true;
    },

    deleteAccountSuccess: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.response;
      state.isLoading = false;
    },

    actionFailid: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const {
  createAccount,
  createAccountSuccess,
  getAllAccounts,
  getAllAccountsSuccess,
  getUserAccounts,
  getUserAccountsSuccess,
  deposit,
  depositSuccess,
  updateAccount,
  updateAccountSuccess,
  deleteAccount,
  deleteAccountSuccess,
  actionFailid,
} = accountsSlice.actions;

export default accountsSlice.reducer;
