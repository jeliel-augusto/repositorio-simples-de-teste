import { createContext } from "react";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}>({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
});
