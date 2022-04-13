import React, { useEffect, useState } from "react";

export const StateContext = React.createContext();

export const StateContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  // const [token, setToken] = useState(
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjRmMGM0MTQ2MzkxYWM3NTA2ZjFlMTEiLCJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3ROYW1lIjoiVXNlcjEiLCJsYXN0TmFtZSI6IlVzZXIxIiwicGFzc3dvcmQiOiJ0ZXN0Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ5MzQ3NzQxfQ.fVLHgjVryNiciyWp9w9jq48hiOhRGZN9dIhLGFsFpto"
  // );

  const [token, setToken] = useState();

  const [user, setUser] = useState();

  console.log({ token, user });
  return (
    <StateContext.Provider
      value={{ token, isLoading, user, setUser, setToken, setLoading }}
    >
      {children}
    </StateContext.Provider>
  );
};
