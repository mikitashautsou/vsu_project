import React from 'react';
import { Container } from './styles/styled-container';
import { Input as InputStyle } from './styles/styled-input';

export const Input = ({ type, placeholder, name, handleChange, value }) => {
  return (
    <Container>
      <InputStyle
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={handleChange}
        value={value}
        required
        autoComplete="off"
      />
    </Container>
  );
};
