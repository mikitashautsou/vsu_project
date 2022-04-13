import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allTransactions: [],
  currentTransaction: {},
  status: '',
  message: '',
  isLoading: false,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    getAllTransactions: (state, _) => {
      state.isLoading = true;
    },

    getAllTransactionsSuccess: (state, action) => {
      state.status = action.payload.status;
      state.allTransactions = action.payload.response;
      state.isLoading = false;
    },

    getTransaction: (state, _) => {
      state.isLoading = true;
    },

    getTransactionSuccess: (state, action) => {
      state.status = action.payload.status;
      state.currentTransaction = action.payload.response;
      state.isLoading = false;
    },

    transfer: (state, _) => {
      state.isLoading = true;
    },

    transferSuccess: (state, action) => {
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
  getAllTransactions,
  getAllTransactionsSuccess,
  getTransaction,
  getTransactionSuccess,
  transfer,
  transferSuccess,
  actionFailid,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
