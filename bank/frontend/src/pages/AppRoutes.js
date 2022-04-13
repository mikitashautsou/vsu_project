import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AccountsPage } from './accountsPage/AccountsPage';
import { BankHomePage } from './bankHomePage/BankHomePage';
import { SetTokenPage } from './setTokenPage/SetTokenPage';
import { TransactionsPage } from './transactionsPage/TransactionsPage';
import { TransferPage } from './transferPage/TransferPage';
import { UserAccountsPage } from './userAccountsPage/UserAccountsPage';
import {deleteMessageWithStatus as deleteAccountsMessageWithStatus} from '../core/reducers/accountsReducer'
import {deleteMessageWithStatus as deleteTransactionsMessageWithStatus} from '../core/reducers/transactionsReducer'

export const SET_TOKEN_ROUTE = '/set-token/:token';
export const BANK_HOME_ROUTE = '/bank/home';
export const ACCOUNTS_ROUTE = '/bank/accounts';
export const USER_ACCOUNTS_ROUTE = '/bank/accounts/userAccounts';
export const TRANSACTIONS_ROUTE = '/bank/transactions';
export const TRANSFER_ROUTE = '/bank/transfer';

const ANY_ROUTE = '*';

const publicRoutes = [
  { path: SET_TOKEN_ROUTE, component: <SetTokenPage /> },
  { path: ANY_ROUTE, component: <Navigate to={SET_TOKEN_ROUTE} /> },
];

const privateRoutes = [
  { path: TRANSFER_ROUTE, component: <TransferPage /> },
  { path: TRANSACTIONS_ROUTE, component: <TransactionsPage /> },
  { path: USER_ACCOUNTS_ROUTE, component: <UserAccountsPage /> },
  { path: ACCOUNTS_ROUTE, component: <AccountsPage /> },
  { path: BANK_HOME_ROUTE, component: <BankHomePage /> },
  { path: ANY_ROUTE, component: <Navigate to={BANK_HOME_ROUTE} /> },
];

const ERROR_STATUS = 'error';
const OK_STATUS = 'ok';

toast.configure()
export const AppRoutes = () => {
  const dispatch = useDispatch()

  const { status: accountsStatus, message: accountsMessage } = useSelector((state) => state.accounts);
  const { status: transactionsStatus, message: transactionsMessage } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (accountsStatus === ERROR_STATUS && accountsMessage) {
      toast.error(accountsMessage, { position: toast.POSITION.BOTTOM_RIGHT });
      dispatch(deleteAccountsMessageWithStatus());
    }

    if (transactionsStatus === ERROR_STATUS && transactionsMessage) {
      toast.error(transactionsMessage, { position: toast.POSITION.BOTTOM_RIGHT });
      dispatch(deleteTransactionsMessageWithStatus());
    }

    if (accountsStatus === OK_STATUS && accountsMessage) {
      toast.success(accountsMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000 });
      dispatch(deleteAccountsMessageWithStatus());
    }

    if (transactionsStatus === OK_STATUS && transactionsMessage) {
      toast.success(transactionsMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000 });
      dispatch(deleteTransactionsMessageWithStatus());
    }
  });

  const token = useSelector((state) => state.auth.token);

  const routes = useMemo(() => {
    if (token !== '') {
      return privateRoutes;
    } else {
      return publicRoutes;
    }
  }, [token]);

  return (
    <Routes>
      {routes.map((route) => {
        return <Route path={route.path} element={route.component} key={route.path} />;
      })}
    </Routes>
  );
};
