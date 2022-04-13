import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllTransactions } from '../../core/reducers/transactionsReducer';
import { Table } from '../../components/Table/Table';
import { Td } from '../../components/Table/styles/styled-table';

export const TransactionsPage = () => {
  const dispatch = useDispatch();

  const { state: accountId } = useLocation();

  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user._id);
  const allTransactions = useSelector((state) => state.transactions.allTransactions);

  useEffect(() => {
    dispatch(getAllTransactions({ token, userId, accountId }));
  }, []);

  const tableBody = useMemo(() => {
    return allTransactions.map((transaction) => (
      <tr key={transaction._id}>
        <Td>{transaction._id}</Td>
        <Td>{transaction.fromAccountId}</Td>
        <Td>{transaction.toAccountId}</Td>
        <Td>{transaction.amount}</Td>
        <Td>{transaction.date}</Td>
        <Td>{transaction.status}</Td>
      </tr>
    ));
  }, [allTransactions]);

  const tableHead = [
    'transactionId',
    'From account id',
    'To account id',
    'amount',
    'date',
    'status',
  ];

  return (
    <>
      {tableBody.length !== 0 ? (
        <Table tableHead={tableHead} tableBody={tableBody} />
      ) : (
        <h1 style={{ textAlign: 'center' }}>This account has no transactions</h1>
      )}
    </>
  );
};
