// import React, { createContext, useState, useEffect, useContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type AuthContextType = {
//   token: string | null;
//   login: (token: string) => Promise<void>;
//   logout: () => Promise<void>;
//   isLoading: boolean;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [token, setToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadToken = async () => {
//       const savedToken = await AsyncStorage.getItem('token');
//       if (savedToken) setToken(savedToken);
//       setIsLoading(false);
//     };
//     loadToken();
//   }, []);

//   const login = async (newToken: string) => {
//     await AsyncStorage.setItem('token', newToken);
//     setToken(newToken);
//   };

//   const logout = async () => {
//     await AsyncStorage.removeItem('token');
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // hook de auth
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth deve estar dentro do AuthProvider');
//   return context;
// };
