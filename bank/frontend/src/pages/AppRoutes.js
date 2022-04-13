import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AccountsPage } from './accountsPage/AccountsPage';
import { BankHomePage } from './bankHomePage/BankHomePage';
import { BankPage } from './bankPage/BankPage';
import { TransactionsPage } from './transactionsPage/TransactionsPage';
import { TransferPage } from './transferPage/TransferPage';
import { UserAccountsPage } from './userAccountsPage/UserAccountsPage';

export const BANK_ROUTE = '/bank';
export const BANK_HOME_ROUTE = '/bank/home';
export const ACCOUNTS_ROUTE = '/bank/accounts';
export const USER_ACCOUNTS_ROUTE = '/bank/accounts/userAccounts';
export const TRANSACTIONS_ROUTE = '/bank/transactions';
export const TRANSFER_ROUTE = '/bank/transfer';

const ANY_ROUTE = '*';

const publicRoutes = [
  { path: BANK_ROUTE, component: <BankPage /> },
  { path: ANY_ROUTE, component: <Navigate to={BANK_ROUTE} /> },
];

const privateRoutes = [
  { path: TRANSFER_ROUTE, component: <TransferPage /> },
  { path: TRANSACTIONS_ROUTE, component: <TransactionsPage /> },
  { path: USER_ACCOUNTS_ROUTE, component: <UserAccountsPage /> },
  { path: ACCOUNTS_ROUTE, component: <AccountsPage /> },
  { path: BANK_HOME_ROUTE, component: <BankHomePage /> },
  { path: ANY_ROUTE, component: <Navigate to={BANK_HOME_ROUTE} /> },
];

export const AppRoutes = () => {
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
