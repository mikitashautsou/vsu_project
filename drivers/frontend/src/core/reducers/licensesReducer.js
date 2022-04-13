import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: '',
  message: '',
  isLoading: false,
};

const licensesSlice = createSlice({
  name: 'licenses',
  initialState,
  reducers: {
    createLicense: (state, _) => {
      state.isLoading = true;
    },

    createLicenseSuccess: (state, action) => {
      state.isLoading = false;
    },

    getLicenses: (state, _) => {
      state.isLoading = true;
    },

    getLicensesSuccess: (state, action) => {
      state.isLoading = false;
    },

    updateLicense: (state, _) => {
      state.isLoading = true;
    },

    updateLicenseSuccess: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {} = licensesSlice.actions;

export default licensesSlice.reducer;
