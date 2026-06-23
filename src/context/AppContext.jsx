import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem('authUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const login = ({ email, password }) => {
    if (email === 'admin@example.com' && password === 'admin123') {
      const user = { name: 'Admin', email, role: 'Admin' };
      setAuthUser(user);
      localStorage.setItem('authUser', JSON.stringify(user));
      return { ok: true };
    }

    return { ok: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('authUser');
  };

  const value = useMemo(
    () => ({ darkMode, setDarkMode, authUser, login, logout }),
    [darkMode, authUser]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }
  return context;
}
