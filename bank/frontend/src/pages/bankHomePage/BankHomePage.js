import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from './styles/styled-container';
import { Button } from './styles/styled-button';
import { ACCOUNTS_ROUTE } from '../AppRoutes';

export const BankHomePage = () => {
  const navigate = useNavigate();

  const handleAccounts = () => {
    navigate(ACCOUNTS_ROUTE);
  };

  return (
    <Container>
      <Button onClick={handleAccounts}>Accounts</Button>
    </Container>
  );
};
