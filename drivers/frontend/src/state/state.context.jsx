import React from "react";

export const StateContext = React.createContext();

export const StateContextProvider = ({ children }) => {
  return <StateContext.Provider value={{}}>{children}</StateContext.Provider>;
};
