import React, { createContext, useContext, useState, useEffect } from 'react';
import { BACKEND_BASE_URL } from '../services/api'; // Ensure this path is correct

export const AuthState = {
  LOADING: 'loading',
  VERIFIED: 'verified',
  UNAUTHORIZED: 'unauthorized',
  ELEVATED: 'elevated',
  SERVER_ERROR: 'server_error',
  SERVER_UNAVAILABLE: 'server_unavailable',
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });

  useEffect(() => {
    
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);