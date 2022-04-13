import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterPage } from './signUpPage/RegisterPage';
import { LoginPage } from './signInPage/LoginPage';
import { UsersPage } from './usersPage/UsersPage';
import { AddUserPage } from './addUserPage/AddUserPage';
import { EditUserPage } from './editUserPage.js/EditUserPage';
import { deleteMessage as deleteAuthMessage } from '../core/reducers/authReducer';
import { deleteMessage as deleteUsersMessage } from '../core/reducers/usersReducer';
import { HomePage } from './homePage/HomePage';

export const REGISTER_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const USERS_ROUTE = '/users';
export const ADD_USER_ROUTE = '/users/add';
export const EDIT_USER_ROUTE = '/users/edit';
export const HOME_ROUTE = '/home';

const ANY_ROUTE = '*';

const publicRoutes = [
  { path: REGISTER_ROUTE, component: <RegisterPage /> },
  { path: LOGIN_ROUTE, component: <LoginPage /> },
  { path: ANY_ROUTE, component: <Navigate to={LOGIN_ROUTE} /> },
];

const privateRoutes = [
  { path: HOME_ROUTE, component: <HomePage /> },
  { path: EDIT_USER_ROUTE, component: <EditUserPage /> },
  { path: ADD_USER_ROUTE, component: <AddUserPage /> },
  { path: USERS_ROUTE, component: <UsersPage /> },
  { path: ANY_ROUTE, component: <Navigate to={HOME_ROUTE} /> },
];

const ERROR_STATUS = 'error';
const OK_STATUS = 'ok';

toast.configure();
export const AppRoutes = () => {
  const dispatch = useDispatch();

  const { status: authStatus, message: authMessage } = useSelector((state) => state.auth);
  const { status: usersStatus, message: usersMessage } = useSelector((state) => state.users);

  useEffect(() => {
    if (authStatus === ERROR_STATUS && authMessage) {
      toast.error(authMessage, { position: toast.POSITION.BOTTOM_RIGHT });
      dispatch(deleteAuthMessage());
    }

    if (usersStatus === ERROR_STATUS && usersMessage) {
      toast.error(usersMessage, { position: toast.POSITION.BOTTOM_RIGHT });
      dispatch(deleteUsersMessage());
    }

    if (authStatus === OK_STATUS && authMessage) {
      toast.success(authMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000 });
      dispatch(deleteAuthMessage());
    }

    if (usersStatus === OK_STATUS && usersMessage) {
      toast.success(usersMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000 });
      dispatch(deleteUsersMessage());
    }
  });

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
