import styled from 'styled-components';

export const Dropbtn = styled.div`
  display: flex;
  align-items: center;

  width: 80%;
  max-width: 350px;
  min-width: 250px;
  height: 40px;
  border: none;
  margin: 0.5rem 0;
  background-color: #b6cdcd;
  border: 1px solid #6d7b7b;
  color: ${({ value }) => {
    if (value === '') {
      return '#6b6c68';
    } else {
      return '#24474b';
    }
  }};
  box-shadow: none;
  border-radius: 8px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;
  outline: none;
  &:hover {
    transform: translateY(-3px);
  }
`;

export const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 280px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const DropDownLi = styled.div`
  display: inline-block;

  &:hover ${DropDownContent} {
    display: block;
  }
`;

export const SubA = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: #f1f1f1;
  }
`;
