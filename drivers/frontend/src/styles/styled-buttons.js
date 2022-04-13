import styled from 'styled-components';

export const Button = styled.button`
  position: fixed;
  left: 30px;
  min-width: 50px;
  min-height: 40px;
  background-color: #24474b;
  color: white;
  border-color: #24474b;
  font-size: 1em;
  border-radius: 3px;
  margin-left: 50px;
`;

export const ButtonAdd = styled(Button)`
  left: auto;
  right: 100px;
`;

export const ActionButton = styled.button`
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 0.25em;
  border-radius: 3px;
  background-color: white;
`;

export const ButtonSuccess = styled(ActionButton)`
  color: #24474b;
  border: 2px solid #24474b;

  &:hover {
    background-color: #24474b;
    color: white;
  }
`;

export const ButtonEdit = styled(ActionButton)`
  color: #e05a00;
  border: 2px solid #e05a00;

  &:hover {
    background-color: #e05a00;
    color: white;
  }
`;

export const ButtonDelete = styled(ActionButton)`
  color: #e60001;
  border: 2px solid #e60001;

  &:hover {
    background-color: #e60001;
    color: white;
  }
`;
