import { CurrentUser } from "@/types/auth";
import { createContext, useState } from "react";

interface AuthContext {
  currentUser: CurrentUser | null;
  token: string | null;
  setUser: (user: CurrentUser) => void;
  setToken: (token: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem("ACCESS_TOKEN")
  );

  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, setUser: setCurrentUser, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
