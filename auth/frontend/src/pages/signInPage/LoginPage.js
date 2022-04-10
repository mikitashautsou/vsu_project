import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { signIn } from '../../core/reducers/authReducer';
import { REGISTER_ROUTE } from '../AppRoutes';

const TITLE = 'Login';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({ username: '', password: '' });

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(signIn(user));
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
      <Input type="text" placeholder="Username" name="username" handleChange={handleChange} />
      <Input type="text" placeholder="Password" name="password" handleChange={handleChange} />
      <button type="submit">Submit</button>
      <p>
        Do you want to create a new account? <Link to={REGISTER_ROUTE}>Register</Link>
      </p>
    </Form>
  );
};
