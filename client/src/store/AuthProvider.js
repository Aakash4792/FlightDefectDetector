import { useAuth0 } from "@auth0/auth0-react";
import AuthContext from "./auth-context";
const AuthProvider = ({ children }) => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  return (
    <AuthContext.Provider
      value={{
        loginWithRedirect,
        logout,
        user,
        isAuthenticated,
        getAccessTokenSilently,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
