import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USERS_ROUTE } from '../AppRoutes';
import { Button } from './styles/styled-button';
import { Container } from './styles/styled-container';

export const HomePage = () => {
  const { token, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleUsers = () => {
    navigate(USERS_ROUTE);
  };

  const BANK_URL = 'http://localhost:3000/bank?token=' + token + '&user=' + JSON.stringify(user);

  return (
    <Container>
      <Button onClick={handleUsers}>Users</Button>
      <a href={BANK_URL}>
        <Button>Bank</Button>
      </a>
    </Container>
  );
};
