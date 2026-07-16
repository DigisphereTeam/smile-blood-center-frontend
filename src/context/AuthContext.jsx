import { createContext, useMemo, useState } from "react";

import {
  clearAuth,
  getToken,
  getUser,
  saveToken,
  saveUser,
} from "../features/auth/utils/authStorage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(()=>getToken())
  const [user, setUser] = useState(()=>getUser());

  const login = ({ token, user }) => {
    saveToken(token);
    saveUser(user);

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    clearAuth();

    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
      isAuthenticated: !!token,
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;