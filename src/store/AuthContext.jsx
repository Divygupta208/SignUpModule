import { createContext, useState } from "react";

export const AuthContext = createContext();

import React from "react";

const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{ token, setToken, isLoggedIn, setIsLoggedIn }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
