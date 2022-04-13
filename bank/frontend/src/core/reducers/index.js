import { combineReducers } from '@reduxjs/toolkit';
import accountsReducer from './accountsReducer';
import authReducer from './authReducer';
import transactionsReducer from './transactionsReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
});
