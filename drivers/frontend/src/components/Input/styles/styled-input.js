import styled from 'styled-components';

export const Input = styled.input`
  width: 80%;
  max-width: 350px;
  min-width: 250px;
  height: 40px;
  border: none;
  margin: 0.5rem 0;
  background-color: #b6cdcd;
  border: 1px solid #6d7b7b;
  color: #24474b;
  box-shadow: none;
  border-radius: 8px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;
  outline: none;
  &:hover {
    transform: translateY(-3px);
  }
`;
