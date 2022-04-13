import React, { useEffect, useState } from "react";

export const StateContext = React.createContext();

export const StateContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  const authorize = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("auth", JSON.stringify({ token, user }));
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth");
  };
  useEffect(() => {
    setLoading(true);
    const auth = JSON.parse(localStorage.getItem("auth"));
    console.log(auth);
    if (auth) {
      setToken(auth.token);
      setUser(auth.user);
    }
    setLoading(false);
  }, []);
  return (
    <StateContext.Provider
      value={{ token, user, setToken, setUser, authorize, isLoading, logout }}
    >
      {children}
    </StateContext.Provider>
  );
};
