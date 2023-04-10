import React, { createContext, useState } from "react";

export const StateContext = createContext();

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  function settingToken(token) {
    setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  }
  return (
    <StateContext.Provider
      value={{
        token,
        settingToken,
        user,
        setUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
