import { combineReducers } from '@reduxjs/toolkit';
import licensesReducer from './licensesReducer';

export const rootReducer = combineReducers({
  licenses: licensesReducer,
});
