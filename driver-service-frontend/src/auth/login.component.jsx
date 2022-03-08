import { useCallback, useContext, useState } from "react";
import { AUTH_SERVICE_URL, DRIVERS_SERVICE_URL } from "../config/constants";
import { StateContext } from "../state/state.context";

export const LoginComponent = () => {
  const [values, setValues] = useState({});
  const { authenticate } = useContext(StateContext);
  const handleInput = useCallback(
    (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    },
    [values, setValues]
  );

  return (
    <div className="form">
      <div className="username_input">
        <span>Username: </span>
        <input name="username" onInput={handleInput}></input>
      </div>
      <div className="password_input">
        <span>Password: </span>
        <input name="password" onInput={handleInput} type="password"></input>
      </div>
      <div>
        <button
          onClick={() => {
            fetch(`${AUTH_SERVICE_URL}/users/log-in`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.status === "ok") {
                  authenticate(res.token, res.user);
                }
              });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
