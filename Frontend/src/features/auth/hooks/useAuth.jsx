import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  loginRequest,
  registerRequest,
  getMeRequest,
  logoutRequest,
} from "../services/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch current user on mount (checks token via cookie)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMeRequest();
        if (res.success) {
          setUser(res.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await loginRequest(credentials);
      if (response.success) {
        setUser(response.user);
        toast.success(response.message || "Login successful!");
      } else {
        toast.error(response.message || "Login failed");
      }
      return response;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Login failed";
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userInfo) => {
    setLoading(true);
    try {
      const response = await registerRequest(userInfo);
      if (response.success) {
        setUser(response.user);
        toast.success(response.message || "Registration successful!");
      } else {
        toast.error(response.message || "Registration failed");
      }
      return response;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Registration failed";
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
