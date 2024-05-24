import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // User information

  const login = () => {
    // Code to handle login
    setIsAuthenticated(true);
    // Set user information from localStorage or API response
  };

  const logout = () => {
    // Code to handle logout
    setIsAuthenticated(false);
    setUser(null);
    // Clear localStorage or any other cleanup
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
