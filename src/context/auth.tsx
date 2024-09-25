import { createContext, useState, useContext, useEffect } from "react";
import Cookies from 'js-cookie';

import { registerUser, loginUser, verifyToken } from "../hooks/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signUp = async (user) => {
    try {
      const response = await registerUser(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  }

  const signIn = async (user) => {
    try {
      const response = await loginUser(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function checkUser() {
      const token = Cookies.get('token');
      if (token) {
        try {
          const res = await verifyToken(token);
          if (!res.data) setIsAuthenticated(false);

          setUser(res.data);
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    }

    checkUser();
  }, [])

  return (
    <AuthContext.Provider value={{ signUp, signIn, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
