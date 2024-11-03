import { create } from 'zustand';
import { authService, User } from '../services/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: authService.getUserData(),
  isAuthenticated: !!authService.getUserData(),
  login: async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  },
  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },
}));