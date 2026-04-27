import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';
import { AnimatePresence } from 'framer-motion';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('aether_token');
    if (token) {
      setUser({ 
        email: 'admin@aether.com', 
        role: 'admin', 
        full_name: 'Aether Administrator',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
      });
    }
    setLoading(false);
  }, []);

  const showNotification = (title, message, type = 'info') => {
    setNotification({ title, message, type });
  };

  const login = async (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      const { access_token } = response.data;
      localStorage.setItem('aether_token', access_token);
      
      setUser({ 
        email, 
        role: 'admin', 
        full_name: 'Aether Administrator',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
      });
      showNotification('Успіх', 'Ви успішно увійшли в систему', 'success');
      return true;
    } catch (error) {
      console.error('Login failed', error);
      showNotification('Помилка входу', 'Невірні дані або сервер недоступний', 'error');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('aether_token');
    setUser(null);
    showNotification('Вихід', 'Ви вийшли з системи', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, showNotification }}>
      {children}
      <AnimatePresence>
        {notification && (
          <Notification 
            {...notification} 
            onClose={() => setNotification(null)} 
          />
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
