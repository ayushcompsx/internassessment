'use client';
import React from 'react';
import type { UserSession } from '@/src/entities/models/session';

const AuthContext = React.createContext<UserSession | undefined>(undefined);

interface AuthProviderProps {
  session: UserSession;
  children: React.ReactNode;
}
export const AuthProvider = ({ session, children }: AuthProviderProps) => {
  /*   const router = useRouter();
  if (!session) {
    router.push("/login");
    return null
  } */

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context)
    throw new Error(
      'AuthContext must only be used inside AuthContext in a client component'
    );

  return context;
};
