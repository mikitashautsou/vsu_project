import { useSearchParams, Navigate } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "../../state/state.context";
const SetToken = () => {
  const state = useContext(StateContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  return <Navigate to={"/cars"} />;
};

export default SetToken;
