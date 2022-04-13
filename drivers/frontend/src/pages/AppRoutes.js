import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LicensesPage } from './licensesPage/LicensesPage';

const LICENSES_ROUTE = '/drivers/licenses';

const ANY_ROUTE = '*';

const routes = [
  { path: LICENSES_ROUTE, component: <LicensesPage /> },
  { path: ANY_ROUTE, component: <Navigate to={LICENSES_ROUTE} /> },
];

export const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => {
        return <Route path={route.path} element={route.component} key={route.path} />;
      })}
    </Routes>
  );
};
