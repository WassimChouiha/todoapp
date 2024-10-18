"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
  signup: (username: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUserSession();
  }, []);

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =
      name +
      "=" +
      encodeURIComponent(value) +
      "; expires=" +
      expires +
      "; path=/";
  };

  const getCookie = (name: string) => {
    return document.cookie.split("; ").reduce((r, v) => {
      const parts = v.split("=");
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, "");
  };

  const deleteCookie = (name: string) => {
    setCookie(name, "", -1);
  };

  const checkUserSession = () => {
    const storedUser = localStorage.getItem("user");
    const cookieUser = getCookie("user");

    if (storedUser && cookieUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If there's a mismatch, clear both to be safe
      localStorage.removeItem("user");
      deleteCookie("user");
    }
    setIsLoading(false);
  };

  const login = (username: string, password: string) => {
    const usersStringified = localStorage.getItem("users") || "[]";
    const users: User[] = JSON.parse(usersStringified);
    const userDoesExist = users.find((u) => u.username === username);

    if (!userDoesExist) {
      return false;
    }
    if (userDoesExist.password !== password) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: username,
    };
    const userString = JSON.stringify(newUser);
    setCookie("user", userString, 7); // Set cookie for 7 days
    setUser(newUser);
    router.push("/dashboard/my-task");
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    deleteCookie("user");
    setUser(null);
    router.push("/login");
  };

  const signup = (username: string, password: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      username: username,
      password: password,
    };
    const usersStringified = localStorage.getItem("users") || "[]";
    const users: User[] = JSON.parse(usersStringified);
    const userDoesExist = users.find((u) => u.username === newUser.username);

    if (userDoesExist) {
      return false;
    }
    users.push(newUser);
    const usersString = JSON.stringify(users);
    localStorage.setItem("users", usersString);
    router.push("/login");
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
