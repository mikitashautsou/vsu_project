import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUsers } from '../../core/reducers/usersReducer';
import { ADD_USER_ROUTE, EDIT_USER_ROUTE } from '../AppRoutes';
import { ButtonAdd, ButtonDelete, ButtonEdit } from './styles/styled-buttons';
import { Table, Tbody, Td, Th, Thead } from './styles/styled-table';

export const UsersPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const users = useSelector((state) => state.users.users);
  const isLoading = useSelector((state) => state.users.isLoading);

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUsers(token));
  }, []);

  const handleEditUser = (user) =>{
    navigate(EDIT_USER_ROUTE, {state:user})
  }

  const handleDeleteUser = (user) =>{
    dispatch(deleteUser({token,user}))
  }

  const tableBody = useMemo(() => {
    if (users.length !== 0) {
      return users.map((user) => {
        return (
          <tr key={user._id}>
            <Td>{user.username}</Td>
            <Td>{user.firstName}</Td>
            <Td>{user.lastName}</Td>
            <Td>{user.role}</Td>
            <Td>
              <ButtonEdit onClick={()=>handleEditUser(user)}>Edit</ButtonEdit>
              <ButtonDelete onClick={()=>handleDeleteUser(user)}>Delete</ButtonDelete>
            </Td>
          </tr>
        );
      });
    } else {
      return [];
    }
  }, [users]);

  const handleAddUser = () =>{
    navigate(ADD_USER_ROUTE)
  }

  return (
    <>
      {tableBody.length !== 0 && !isLoading && (
        <>
        <ButtonAdd onClick={handleAddUser}>+</ButtonAdd>
        <Table>
          <Thead>
            <tr>
              <Th>Username</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>role</Th>
              <Th>Actions</Th>
            </tr>
          </Thead>
          <Tbody>{tableBody}</Tbody>
        </Table>
        </>
      )}
      {!isLoading && tableBody.length === 0 && <h1 style={{ textAlign: 'center' }}>You don't have access to this page</h1>}
    </>
  );
};
