import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

type AuthContextType = {
  token: string | null;
  role: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

interface DecodedToken {
  role: string;
  exp?: number; // Opcional: para expiração
  [key: string]: any;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          const decoded = jwtDecode<DecodedToken>(storedToken);
          const isExpired = decoded.exp && Date.now() >= decoded.exp * 1000;

          if (isExpired) {
            await logout();
          } else {
            setToken(storedToken);
            setRole(decoded.role || null);
          }
        }
      } catch (err) {
        console.warn('Erro ao carregar token:', err);
        await logout();
      }
    };

    loadToken();
  }, []);

  const login = async (newToken: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(newToken);
      await AsyncStorage.setItem('authToken', newToken);
      setToken(newToken);
      setRole(decoded.role || null);
    } catch (err) {
      console.warn('Token inválido:', err);
      await logout();
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
