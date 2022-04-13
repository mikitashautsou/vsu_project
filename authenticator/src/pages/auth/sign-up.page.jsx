import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../api/post";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { StateContext } from "../../state/state.context";

export const SignUpPage = () => {
  const nav = useNavigate();
  const state = useContext(StateContext);
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    const response = await post("/sign-up", user);
    if (response.status === "ok") {
      const response = await post("/sign-in", user);
      if (response.token && response.user) {
        state.authorize(response.token, response.user);
        nav("/menu");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <Input
        type="text"
        placeholder="User Name"
        name="username"
        handleChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Firstname"
        name="firstName"
        handleChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Last Name"
        name="lastName"
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
        Already have an account <Link to={"/sign-in"}>Log in</Link>
      </p>
    </Form>
  );
};
