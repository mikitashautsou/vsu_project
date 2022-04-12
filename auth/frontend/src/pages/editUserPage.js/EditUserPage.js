import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { updateUser } from '../../core/reducers/usersReducer';
import { USERS_ROUTE } from '../AppRoutes';
import {Dropdown} from '../../components/Dropdown/Dropdown'

const TITLE = 'Edit User';

export const EditUserPage = () => {
  const { state: changeableUser } = useLocation();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(changeableUser);

  const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser({ token, user }));
    navigate(USERS_ROUTE);
  };

  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const dropdownItems = ['regular', 'admin', 'manager', 'accountant', 'policeman'];
  const DROPDOWN_BUTTON_TITLE = 'Role';
  const setDropdownItem = (value) => {
    setUser((prevstate) => ({ ...prevstate, role: value }));
  };

  return (
    <Form onSubmit={submitHandler}>
      <h1>{TITLE}</h1>
      <Input
        type="text"
        placeholder="User Name"
        value={user.username}
        name="username"
        handleChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Firstname"
        value={user.firstName}
        name="firstName"
        handleChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Last Name"
        value={user.lastName}
        name="lastName"
        handleChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Password"
        value={user.password}
        name="password"
        handleChange={handleChange}
      />
      <Dropdown
        buttonTitle={DROPDOWN_BUTTON_TITLE}
        dropdownItems={dropdownItems}
        setItem={setDropdownItem}
        value={user.role}
      />
      <button type="submit">Submit</button>
    </Form>
  );
};
