import styled from 'styled-components';

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  background-color: white;
`;

export const ButtonAdd = styled.button`
  position: fixed;
  right: 100px;
  width: 50px;
  height: 50px;
  background-color: #002c00;
  color: white;
  border-color: #002c00;
  font-size: 1.5em;
  border-radius: 50%;
  margin-left: 50px;
`;

export const ButtonEdit = styled(Button)`
  color: #e05a00;
  border: 2px solid #e05a00;

  &:hover {
    background-color: #e05a00;
    color: white;
  }
`;

export const ButtonDelete = styled(Button)`
  color: #e60001;
  border: 2px solid #e60001;

  &:hover {
    background-color: #e60001;
    color: white;
  }
`;
