import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
import {
  LOCAL_STORAGE_USER_ID,
  LOCAL_STORAGE_USER_TOKEN,
} from "../constants/client";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const userIdDetected = localStorage.getItem(LOCAL_STORAGE_USER_ID);
    const tokenDetected = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);

    if (userIdDetected && tokenDetected) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string, userId: string) => {
    localStorage.setItem(LOCAL_STORAGE_USER_TOKEN, token);
    localStorage.setItem(LOCAL_STORAGE_USER_ID, userId);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_USER_ID);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
