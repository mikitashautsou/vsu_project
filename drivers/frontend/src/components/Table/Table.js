import React, { useMemo } from 'react';
import { Table as TableStyle, Tbody, Th, Thead } from './styles/styled-table';

export const Table = ({ tableHead, tableBody }) => {
  const thead = useMemo(() => {
    return tableHead.map((item) => <Th key={item}>{item}</Th>);
  }, [tableHead]);

  return (
    <TableStyle>
      <Thead>
        <tr>{thead}</tr>
      </Thead>
      <Tbody>{tableBody}</Tbody>
    </TableStyle>
  );
};
