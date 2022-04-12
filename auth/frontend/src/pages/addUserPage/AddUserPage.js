import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { createUser } from '../../core/reducers/usersReducer';
import { USERS_ROUTE } from '../AppRoutes';

const TITLE = 'Add User';

export const AddUserPage = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();
  const submitHandler = (event) => {
    console.log('ADD_USER', user);
    event.preventDefault();
    dispatch(createUser({ token, user }));
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
      <Input type="text" placeholder="User Name" name="username" handleChange={handleChange} />
      <Input type="text" placeholder="Firstname" name="firstName" handleChange={handleChange} />
      <Input type="text" placeholder="Last Name" name="lastName" handleChange={handleChange} />
      <Input type="text" placeholder="Password" name="password" handleChange={handleChange} />
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
