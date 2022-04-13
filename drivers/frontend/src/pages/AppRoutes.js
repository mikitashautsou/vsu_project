import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SetTokenPage } from './setTokenPage/SetTokenPage';
import { LicensesPage } from './licensesPage/LicensesPage';
import { CreateLicensePage } from './createLicensePage/CreateLicensePage';
import { deleteMessageWithStatus } from '../core/reducers/licensesReducer';

const SET_TOKEN_ROUTE = '/set-token/:token';

export const LICENSES_ROUTE = '/drivers/licenses';
export const CREATE_LICENSE_PAGE = '/drivers/licenses/new';

const ANY_ROUTE = '*';

const publicRoutes = [
  { path: SET_TOKEN_ROUTE, component: <SetTokenPage /> },
  { path: ANY_ROUTE, component: <Navigate to={SET_TOKEN_ROUTE} /> },
];

const privateRoutes = [
  { path: CREATE_LICENSE_PAGE, component: <CreateLicensePage /> },
  { path: LICENSES_ROUTE, component: <LicensesPage /> },
  { path: ANY_ROUTE, component: <Navigate to={LICENSES_ROUTE} /> },
];

const ERROR_STATUS = 'error';
const OK_STATUS = 'ok';

toast.configure()
export const AppRoutes = () => {

  const dispatch = useDispatch()

  const { status, message } = useSelector((state) => state.licenses);
  

  useEffect(() => {
    if (status === ERROR_STATUS && message) {
      toast.error(message, { position: toast.POSITION.BOTTOM_RIGHT });
      dispatch(deleteMessageWithStatus());
    }

    if (status === OK_STATUS && message) {
      toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000 });
      dispatch(deleteMessageWithStatus());
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
