import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../api/post";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { StateContext } from "../../state/state.context";

export const SignInPage = () => {
  const state = useContext(StateContext);
  const nav = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    const response = await post("/sign-in", user);
    console.log(response);
    if (response.token && response.user) {
      state.authorize(response.token, response.user);
      nav("/menu");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <Input
        type="text"
        placeholder="User Name"
        name="username"
        handleChange={handleChange}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        handleChange={handleChange}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Submit
      </button>
      <p>
        Do you want to create a new account?{" "}
        <Link to={"/sign-up"}>Register</Link>
      </p>
    </Form>
  );
};
