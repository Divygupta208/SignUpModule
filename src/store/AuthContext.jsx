import { createContext, useState } from "react";

export const AuthContext = createContext();

import React from "react";

const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const value = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    setToken: setToken,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
