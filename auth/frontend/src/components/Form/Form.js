import React from 'react';
import { FormStyle } from './styles/styled-container';

export const Form = ({ children, onSubmit }) => {
  return <FormStyle onSubmit={onSubmit}>{children}</FormStyle>;
};
