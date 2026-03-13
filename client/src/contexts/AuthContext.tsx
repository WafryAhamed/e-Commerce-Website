import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { apiRequest } from '../lib/api';
import type { User } from '../types';

interface AuthSession extends User {
  token: string;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AUTH_STORAGE_KEY = 'techvault.auth';

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredSession(): AuthSession | null {
  const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as AuthSession;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

function writeStoredSession(session: AuthSession | null) {
  if (session) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() =>
    readStoredSession()
  );

  const updateSession = useCallback((nextSession: AuthSession | null) => {
    setSession(nextSession);
    writeStoredSession(nextSession);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const nextSession = await apiRequest<AuthSession>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      updateSession(nextSession);
    },
    [updateSession]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const nextSession = await apiRequest<AuthSession>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      updateSession(nextSession);
    },
    [updateSession]
  );

  const logout = useCallback(() => {
    updateSession(null);
  }, [updateSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session
        ? {
            id: session.id,
            name: session.name,
            firstName: session.firstName,
            lastName: session.lastName,
            email: session.email,
            phone: session.phone,
            role: session.role,
            avatar: session.avatar,
          }
        : null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.token),
      login,
      register,
      logout,
    }),
    [login, logout, register, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}