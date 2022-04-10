import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage } from './signUpPage/RegisterPage';
import { LoginPage } from './signInPage/LoginPage';

export const REGISTER_ROUTE = '/';
export const LOGIN_ROUTE = '/login';

const ANY_ROUTE = '*';

const publicRoutes = [
  { path: REGISTER_ROUTE, component: <RegisterPage /> },
  { path: LOGIN_ROUTE, component: <LoginPage /> },
  { path: ANY_ROUTE, component: <Navigate to={LOGIN_ROUTE} /> },
];


export const AppRoutes = () => {
  const token = useSelector((state) => state.auth.token);

  const routes = useMemo(() => {
    if (token) {
      return [];
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
