import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user_data');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        try {
          const response = await api.get('/api/auth/me');
          // Backend: { success, data: { user } }
          const userData = response.data?.data?.user || response.data?.user || response.data;
          setUser(userData);
          localStorage.setItem('user_data', JSON.stringify(userData));
        } catch {
          // Token invalid — clear auth
          localStorage.removeItem('token');
          localStorage.removeItem('user_data');
          setToken(null);
          setUser(null);
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user_data', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  const isAuthenticated = !!token && !!user;
  // Backend sets is_admin / is_super_admin booleans OR role matching
  const isSuperAdmin = isAuthenticated && (user?.is_super_admin === true || user?.role === 'super_admin');
  const isAdmin = isAuthenticated && (user?.is_admin === true || user?.role === 'admin' || isSuperAdmin);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, isAdmin, isSuperAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
