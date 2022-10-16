import { setCookie, destroyCookie } from 'nookies';
import { createContext } from 'react';
import Router from 'next/router';
import axios from 'axios';

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  logout(): Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  let isAuthenticated = false;

  async function signIn({ email, password }: SignInData): Promise<void> {
    const { data } = await axios.post<{ token: string }>('/api/signIn', {
      email,
      password,
    });

    setCookie(undefined, '@plenitude-token', data.token, {
      maxAge: 60 * 60 * 1, // 1 Hour
    });

    isAuthenticated = true;

    Router.push('/dashboard');
  }

  async function logout(): Promise<void> {
    destroyCookie(undefined, '@plenitude-token');
    isAuthenticated = false;
    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      signIn,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
