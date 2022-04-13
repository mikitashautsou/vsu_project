import React, { useEffect, useState } from "react";

export const StateContext = React.createContext();

export const StateContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjRmMGM0MTQ2MzkxYWM3NTA2ZjFlMTEiLCJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3ROYW1lIjoiVXNlcjEiLCJsYXN0TmFtZSI6IlVzZXIxIiwicGFzc3dvcmQiOiJ0ZXN0Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ5MzQ3NzQxfQ.fVLHgjVryNiciyWp9w9jq48hiOhRGZN9dIhLGFsFpto"
  );

  const [user, setUser] = useState({
    _id: "624f0c4146391ac7506f1e11",
    username: "user1",
    firstName: "User1",
    lastName: "User1",
    password: "test",
    role: "admin",
    iat: 1649347741,
  });

  return (
    <StateContext.Provider value={{ token, isLoading, user, setUser, setToken, setLoading }}>
      {children}
    </StateContext.Provider>
  );
};
