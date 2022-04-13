import styled from 'styled-components';

export const Table = styled.table`
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.9em;
  font-family: sans-serif;
  border-collapse: collapse;
  min-width: 50%;
  box-shadow: 0 0 20px rgba(36, 71, 75, 0.15);
`;

export const Thead = styled.thead`
  tr {
    background-color: #24474b;
    color: #89aeae;
  }
`;
export const Th = styled.th`
  padding: 12px 15px;
`;

export const Td = styled(Th)``;

export const Tbody = styled.tbody`
  tr {
    color: #24474b;
    border-bottom: 1px solid #dddddd;
  }

  tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tr:last-of-type {
    border-bottom: 2px solid #24474b;
  }
`;
