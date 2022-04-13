import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  licenses: [],
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
      state.status = action.payload.status;
      state.isLoading = false;
    },

    getLicenses: (state, _) => {
      state.isLoading = true;
    },

    getLicensesSuccess: (state, action) => {
      state.licenses = action.payload.response;
      state.status = action.payload.status;
      state.isLoading = false;
    },

    updateLicense: (state, _) => {
      state.isLoading = true;
    },

    updateLicenseSuccess: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.response;
      state.isLoading = false;
    },

    deleteLicense: (state, _) => {
      state.isLoading = true;
    },

    deleteLicenseSuccess: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.response;
      state.isLoading = false;
    },

    payTaxForLicense: (state, _) => {
      state.isLoading = true;
    },

    payTaxForLicenseSuccess: (state, action) => {
      state.isLoading = false;
    },

    revokeLicense: (state, _) => {
      state.isLoading = true;
    },

    revokeLicenseSuccess: (state, action) => {
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
  createLicense,
  createLicenseSuccess,
  getLicenses,
  getLicensesSuccess,
  updateLicense,
  updateLicenseSuccess,
  deleteLicense,
  deleteLicenseSuccess,
  payTaxForLicense,
  payTaxForLicenseSuccess,
  revokeLicense,
  revokeLicenseSuccess,
  actionFailid,
} = licensesSlice.actions;

export default licensesSlice.reducer;
