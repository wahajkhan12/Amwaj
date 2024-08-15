import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component to wrap your app with
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to access the context
export function useAuth() {
  return useContext(AuthContext);
}
