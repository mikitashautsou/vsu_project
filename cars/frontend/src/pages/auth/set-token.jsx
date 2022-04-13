import { useParams, Navigate } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "../../state/state.context";

import decode from "jwt-decode";
const SetToken = () => {
  const state = useContext(StateContext);

  const { token } = useParams();

  const decoded = decode(token);
  state.setToken(token);
  state.setUser(decoded);
  console.log({ decoded });
  return <Navigate to={"/cars"} />;
};

export default SetToken;
