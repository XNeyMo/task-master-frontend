import { createContext, useContext } from "react";
import { User } from "../types";

export const AuthContext = createContext<{
  signUp: (user: User) => void;
  signIn: (user: Omit<User, 'username'>) => void;
  user: User | null;
  isAuthenticated: boolean;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
