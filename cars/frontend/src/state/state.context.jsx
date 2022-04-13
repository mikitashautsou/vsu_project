import React, { useEffect, useState } from "react";

export const StateContext = React.createContext();

export const StateContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState();

  return (
    <StateContext.Provider value={{ token, isLoading }}>
      {children}
    </StateContext.Provider>
  );
};
