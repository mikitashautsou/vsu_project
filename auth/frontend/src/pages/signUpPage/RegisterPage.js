import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { signUp } from '../../core/reducers/authReducer';
import { LOGIN_ROUTE } from '../AppRoutes';

const TITLE = 'Register';

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({ username: '', firstName: '', lastName: '', password: '' });

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(signUp(user));
  };

  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Form onSubmit={submitHandler}>
      <h1>{TITLE}</h1>
      <Input
        type="text"
        placeholder="User Name"
        name="username"
        handleChange={handleChange}
      />
      <Input type="text" placeholder="Firstname" name="firstName" handleChange={handleChange} />
      <Input type="text" placeholder="Last Name" name="lastName" handleChange={handleChange} />
      <Input type="text" placeholder="Password" name="password" handleChange={handleChange} />
      <button type="submit">Submit</button>
      <p>
        Already have an account <Link to={LOGIN_ROUTE}>Log in</Link>
      </p>
    </Form>
  );
};
