import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <StateContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
