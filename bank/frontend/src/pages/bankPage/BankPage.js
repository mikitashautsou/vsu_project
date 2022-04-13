import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTokenAndUser } from '../../core/reducers/authReducer';

export const BankPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const user = JSON.parse(searchParams.get('user'));

  useEffect(() => {
    if (token !== '' && !!token) {
      dispatch(setTokenAndUser({ token, user }));
    }
  }, [token, user]);

  return <></>;
};
