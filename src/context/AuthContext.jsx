// 

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 1. Initialize as null (Don't read from localStorage here)
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. On Refresh/Mount, explicitly clear storage to ensure session is dead
    const clearSession = () => {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user_role');
      // Optional: localStorage.clear();
      
      setLoading(false); // Security check complete
    };

    clearSession();
  }, []);

  const login = (userData, jwtToken) => {
    // Standardize data extraction
    const finalToken = jwtToken || userData?.token;
    const finalUser = userData?.user || userData;

    setUser(finalUser);
    setToken(finalToken);

    // Store only for mid-session usage (if needed by api.js)
    if (finalToken) localStorage.setItem('jwt_token', finalToken);
    if (finalUser?.role) localStorage.setItem('user_role', finalUser.role);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    localStorage.clear();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        login, 
        logout, 
        isAuthenticated: !!token, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);