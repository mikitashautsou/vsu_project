import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USERS_ROUTE } from '../AppRoutes';
import { Button } from './styles/styled-button';
import { Container } from './styles/styled-container';

export const HomePage = () => {

  const navigate = useNavigate();

  const handleUsers = () => {
    navigate(USERS_ROUTE);
  };

  const MAIN_MENU_URL = 'http://localhost:4001'

  return (
    <Container>
      <Button onClick={handleUsers}>Users</Button>
      <a href={MAIN_MENU_URL}>
        <Button>Main menu</Button>
      </a>
    </Container>
  );
};
