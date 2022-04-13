import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Td } from '../../components/Table/styles/styled-table';
import { Table } from '../../components/Table/Table';
import {
  deleteAccount,
  deposit,
  getAllAccounts,
  updateAccount,
} from '../../core/reducers/accountsReducer';
import {
  Button,
  ButtonDelete,
  ButtonEdit,
  ButtonSuccess,
  ButtonAdd,
} from '../../styles/styled-buttons';
import { TRANSACTIONS_ROUTE, TRANSFER_ROUTE, USER_ACCOUNTS_ROUTE } from '../AppRoutes';

export const AccountsPage = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const _id = useSelector((state) => state.auth.user._id);

  const allAccounts = useSelector((state) => state.accounts.allAccounts);

  useEffect(() => {
    dispatch(getAllAccounts(token));
  }, []);

  useEffect(()=>{
    dispatch(getAllAccounts(token));
  },[])

  const navigate = useNavigate();
  const handleMyAccounts = () => {
    navigate(USER_ACCOUNTS_ROUTE);
  };

  const handleTransfer = () => {
    navigate(TRANSFER_ROUTE);
  };

  const handleDeposit = (accountId) => {
    const amount = Number(prompt('How much is being replenished?'));
    dispatch(deposit({ token, userId: _id, accountId, amount }));
  };

  const handleEditBalance = (accountId) => {
    const balance = Number(prompt('What amount are we setting?'));
    dispatch(updateAccount({ token, userId: _id, accountId, balance }));
  };

  const handleTransactions = (accountId) => {
    navigate(TRANSACTIONS_ROUTE, { state: accountId });
  };

  const handleDeleteAccount = (accountId) => {
    dispatch(deleteAccount({ token, userId: _id, accountId }));
  };

  const tableBody = useMemo(() => {
    return allAccounts.map((item) => (
      <tr key={item._id}>
        <Td>{item._id}</Td>
        <Td>{item.userId}</Td>
        <Td>{item.balance}</Td>
        <Td>
          <ButtonSuccess onClick={() => handleDeposit(item._id)}>Deposit</ButtonSuccess>
          <ButtonEdit onClick={() => handleEditBalance(item._id)}>Edit balance</ButtonEdit>
          <ButtonSuccess onClick={() => handleTransactions(item._id)}>Transactions</ButtonSuccess>
          <ButtonDelete onClick={() => handleDeleteAccount(item._id)}>Delete account</ButtonDelete>
        </Td>
      </tr>
    ));
  }, [allAccounts]);

  const tableHead = ['accountId', 'userId', 'balance', 'actions'];

  return (
    <>
      <Button onClick={handleMyAccounts}>My Accounts</Button>
      <ButtonAdd onClick={handleTransfer}>Transfer</ButtonAdd>
      {tableBody.length !== 0 && <Table tableHead={tableHead} tableBody={tableBody} />}
    </>
  );
};
