import React, { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SetTokenPage } from './setTokenPage/SetTokenPage';
import { LicensesPage } from './licensesPage/LicensesPage';

const SET_TOKEN_ROUTE = '/set-token/:token';

const LICENSES_ROUTE = '/drivers/licenses';

const ANY_ROUTE = '*';

const publicRoutes = [
  { path: SET_TOKEN_ROUTE, component: <SetTokenPage /> },
  { path: ANY_ROUTE, component: <Navigate to={SET_TOKEN_ROUTE} /> },
];

const privateRoutes = [
  { path: LICENSES_ROUTE, component: <LicensesPage /> },
  { path: ANY_ROUTE, component: <Navigate to={LICENSES_ROUTE} /> },
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
