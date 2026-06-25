import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import {
  User,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth }
from '../services/firebaseConfig';

import {
  getUserRole,
} from '../services/userService';

type UserRole =
  | 'aluno'
  | 'atendente'
  | null;

type AuthContextType = {
  user: User | null;
  role: UserRole;
  loading: boolean;
};

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(
      null
    );

  const [role, setRole] =
    useState<UserRole>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (
          currentUser
        ) => {

          setUser(
            currentUser
          );

          if (
            currentUser
          ) {

            const userRole =
              await getUserRole(
                currentUser.uid
              );

            setRole(
              userRole
            );

          } else {

            setRole(
              null
            );
          }

          setLoading(
            false
          );
        }
      );

    return unsubscribe;

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}
