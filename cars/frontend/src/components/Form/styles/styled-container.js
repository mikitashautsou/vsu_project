import styled from 'styled-components';

export const FormStyle = styled.form`
  width: 400px;
  height: 500px;
  background-color: #89aeae;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;

  h1 {
    color: #24474b;
  }

  p {
    color: #24474b;
  }

  button[type='submit'] {
    width: 75%;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #f59542;
    color: #24474b;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;
