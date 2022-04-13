import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setTokenAndUser } from '../../core/reducers/authReducer';

export const SetTokenPage = () => {
  const dispatch = useDispatch();

  const { token } = useParams();

  const user = decode(token);

  useEffect(() => {
    dispatch(setTokenAndUser({ token, user }));
  }, []);

  return <div></div>;
};
