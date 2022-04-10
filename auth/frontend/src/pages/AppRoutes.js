import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage } from './signUpPage/RegisterPage';
import { LoginPage } from './signInPage/LoginPage';
import { UsersPage } from './usersPage/UsersPage';

export const REGISTER_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const USERS_ROUTE = '/users';

const ANY_ROUTE = '*';

const publicRoutes = [
  { path: REGISTER_ROUTE, component: <RegisterPage /> },
  { path: LOGIN_ROUTE, component: <LoginPage /> },
  { path: ANY_ROUTE, component: <Navigate to={LOGIN_ROUTE} /> },
];

const privateRoutes = [
  { path: USERS_ROUTE, component: <UsersPage /> },
  { path: ANY_ROUTE, component: <Navigate to={USERS_ROUTE} /> },
];

export const AppRoutes = () => {
  const token = useSelector((state) => state.auth.token);

  const routes = useMemo(() => {
    if (token) {
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
