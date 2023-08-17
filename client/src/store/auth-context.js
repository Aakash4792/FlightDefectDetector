import React from "react";

const AuthContext = React.createContext({
  loginWithRedirect: () => {},
  logout: () => {},
  getTokenSilently: async () => {},
  user: {},
  isAuthenticated: false,
});

export default AuthContext;
