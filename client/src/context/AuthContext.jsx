import React, { createContext, useContext, useState, useCallback } from 'react';
import { login as apiLogin } from '../api/index.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('rhc_admin_token'));
  const [adminEmail, setAdminEmail] = useState(() => localStorage.getItem('rhc_admin_email'));

  const login = useCallback(async (email, password) => {
    const data = await apiLogin(email, password);
    localStorage.setItem('rhc_admin_token', data.token);
    localStorage.setItem('rhc_admin_email', data.email);
    setToken(data.token);
    setAdminEmail(data.email);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('rhc_admin_token');
    localStorage.removeItem('rhc_admin_email');
    setToken(null);
    setAdminEmail(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, adminEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
