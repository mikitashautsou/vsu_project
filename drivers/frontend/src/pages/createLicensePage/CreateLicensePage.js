import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { createLicense } from '../../core/reducers/licensesReducer';

const TITLE = 'Create License';

export const CreateLicensePage = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const [licenseData, setLicenseData] = useState({
    userId: '',
    type: '',
  });

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(createLicense({ token, ...licenseData }));
  };

  const handleChange = (event) => {
    setLicenseData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Form onSubmit={submitHandler}>
      <h1>{TITLE}</h1>
      <Input type="text" placeholder="User Id" name="userId" handleChange={handleChange} />
      <Input type="text" placeholder="Type" name="type" handleChange={handleChange} />
      <button type="submit">Submit</button>
    </Form>
  );
};
