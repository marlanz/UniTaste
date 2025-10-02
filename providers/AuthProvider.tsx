import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getFromStorage,
  removeFromStorage,
  saveToStorage,
} from "../utils/storage";

import axios from "axios";

interface User {
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  appLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, pw: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BASE_URL_LOGIN: string =
  "https://unitasteapp1.onrender.com/api/users/Login";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getFromStorage<User>("authUser");
      if (storedUser) setUser(storedUser);
      setAppLoading(false);
    };
    loadUser();
  }, []);

  const signIn = async (email: string, pw: string) => {
    const body = { email, password: pw };
    setAppLoading(true);
    try {
      const response = await axios.post(`${BASE_URL_LOGIN}`, body);
      const { email, fullName } = response.data;
      setUser({ email, fullName });
      await saveToStorage("authUser", { email, fullName });
    } catch (err) {
      console.log(err);
    } finally {
      setAppLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    await removeFromStorage("authUser");
  };

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    console.log("👤 Current user state:", user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, appLoading, isAuthenticated, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
