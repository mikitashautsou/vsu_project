import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { transfer } from '../../core/reducers/transactionsReducer';

const TITLE = 'Transfer';

export const TransferPage = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user._id);

  const [transferData, setTransferData] = useState({
    fromAccountId: '',
    toAccountId: '',
    amount: '',
  });

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(transfer({ token, userId, ...transferData }));
  };

  const handleChange = (event) => {
    setTransferData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Form onSubmit={submitHandler}>
      <h1>{TITLE}</h1>
      <Input
        type="text"
        placeholder="From account id"
        name="fromAccountId"
        handleChange={handleChange}
      />
      <Input
        type="text"
        placeholder="To account id"
        name="toAccountId"
        handleChange={handleChange}
      />
      <Input type="text" placeholder="Amount" name="amount" handleChange={handleChange} />
      <button type="submit">Submit</button>
    </Form>
  );
};
