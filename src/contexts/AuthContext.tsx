import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { createContext } from 'react';
import Router from 'next/router';
import axios from 'axios';

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  verifyIfIsAuthenticated: () => boolean;
  signIn: (data: SignInData) => Promise<void>;
  logout(): Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  function verifyIfIsAuthenticated(): boolean {
    const { ['@plenitude-token']: token } = parseCookies();

    return !!token;
  }

  async function signIn({ email, password }: SignInData): Promise<void> {
    const { data } = await axios.post<{ token: string }>('/api/signIn', {
      email,
      password,
    });

    setCookie(undefined, '@plenitude-token', data.token, {
      sameSite: true,
      maxAge: 60 * 60 * 12, // 12 Hour
    });

    Router.push('/dashboard');
  }

  async function logout(): Promise<void> {
    destroyCookie(undefined, '@plenitude-token', { sameSite: true });
    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{
      verifyIfIsAuthenticated,
      signIn,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
