import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Td } from '../../components/Table/styles/styled-table';
import { Table } from '../../components/Table/Table';
import { createAccount, getUserAccounts } from '../../core/reducers/accountsReducer';
import { ButtonAdd } from '../../styles/styled-buttons';

export const UserAccountsPage = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const _id = useSelector((state) => state.auth.user._id);

  const userAccounts = useSelector((state) => state.accounts.userAccounts);

  useEffect(() => {
    dispatch(getUserAccounts({ token, _id }));
  },[]);

  const handleCreateAccount = () => {
    dispatch(createAccount({ _id, token }));
  };

  const tableBody = useMemo(() => {
    return userAccounts.map((userAccount) => (
      <tr key={userAccount._id}>
        <Td>{userAccount._id}</Td>
        <Td>{userAccount.userId}</Td>
        <Td>{userAccount.balance}</Td>
      </tr>
    ));
  }, [userAccounts]);

  const tableHead = ['accountId', 'userId', 'balance'];

  return (
    <>
      <ButtonAdd onClick={handleCreateAccount}>Create Account</ButtonAdd>
      {tableBody.length !== 0 ? (
        <Table tableHead={tableHead} tableBody={tableBody} />
      ) : (
        <h1 style={{ textAlign: 'center' }}>You don't have any accounts</h1>
      )}
    </>
  );
};
