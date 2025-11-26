import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Failed to get current user:', error);
          localStorage.removeItem('authToken');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
  try {
    const response = await authService.login({ email, password });
    setUser(response.user);
    navigate(response.user.role === 'admin' ? '/admin' : '/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};


  const register = async (name: string, email: string, password: string) => {
  try {
    await authService.register({ name, email, password });
    // NO guardar el usuario aún, hasta que no verifique
    navigate('/verify-email');
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
