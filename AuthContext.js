import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const signIn = (name, phone) => {
    setUser({ name, phone });
    if (name === 'Janki Bhadaniya' && phone === '+33 7 58 46 03 81') {
      setIsAdmin(true);
    }
  };

  const signOut = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};