import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import licensesReducer from './licensesReducer';

export const rootReducer = combineReducers({
  licenses: licensesReducer,
  auth: authReducer,
});
