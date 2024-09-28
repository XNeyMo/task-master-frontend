import { useState, useEffect, ReactNode } from "react";
import { AxiosError } from "axios";
import Cookies from 'js-cookie';

import { ErrorResponse } from "../types";

import { AuthContext } from "../hooks/useAuth";
import { User } from "../types";

import { registerUser, loginUser, verifyToken } from "../hooks/userHooks";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const signUp = async (user: User) => {
    try {
      const response = await registerUser(user);
      setTimeout(() => {
        setUser(response.data);
        setIsAuthenticated(true);
      }, 1500);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        throw new Error(axiosError.response?.data?.message || 'Something went wrong. Please try again.');
      }
      throw new Error('Something went wrong. Please try again.');
    }
  }

  const signIn = async (user: User) => {
    try {
      const response = await loginUser(user);
      setTimeout(() => {
        setUser(response.data);
        setIsAuthenticated(true);
      }, 1500);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        throw new Error(axiosError.response?.data?.message || 'Something went wrong. Please try again.');
      }
      throw new Error('Something went wrong. Please try again.');
    }
  }

  useEffect(() => {
    async function checkUser() {
      const token = Cookies.get('token');
      if (token) {
        try {
          const res = await verifyToken();
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
