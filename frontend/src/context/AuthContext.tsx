import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { SignIn } from '../service/apiServices';
import { LoginModel } from '../models/LoginModel';
import Cookies from 'js-cookie';
import instanceAxios from '../config/axios-config';

interface AuthContextType {
  user: string | null;
  signed: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('@Auth:token');
    const email = Cookies.get('@Auth:email');
    if (token && email) {
      setUser(email);
      instanceAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    
  }, []);

  const login = async (email: string, password: string) => {
    const data: LoginModel = {
      email,
      password,
    };
    try {
      const response = await SignIn(data);
      if (response && response.data) {
        instanceAxios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        Cookies.set('@Auth:token', response.data.token, { expires: 4});
        Cookies.set('@Auth:email', response.data.email, { expires: 4});
        setUser(response.data.email);
      } else {
        alert('Usuário ou senha inválidos');
      }
    } catch (error) {
      alert('Erro ao fazer login');
    }
  };

  const logout = () => {
    Cookies.remove('@Auth:token');
    Cookies.remove('@Auth:email');
    setUser(null);
    instanceAxios.defaults.headers.common['Authorization'] = '';
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
