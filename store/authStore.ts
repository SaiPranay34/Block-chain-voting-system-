import { create } from 'zustand';

interface User {
  id: string;
  role: 'voter' | 'admin';
  voterId?: string;
  hasVoted?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: { id: string; voterId?: string; role: 'voter' | 'admin' }) => void;
  logout: () => void;
  setVoted: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  login: (userData) => {
    // In a real app, this would validate with backend
    localStorage.setItem('auth_user', JSON.stringify(userData));
    set({ 
      user: { ...userData, hasVoted: false },
      isAuthenticated: true,
      isLoading: false
    });
  },
  
  logout: () => {
    localStorage.removeItem('auth_user');
    set({ user: null, isAuthenticated: false });
  },
  
  setVoted: () => {
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, hasVoted: true };
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },
  
  checkAuth: () => {
    set({ isLoading: true });
    const userData = localStorage.getItem('auth_user');
    
    if (userData) {
      set({ 
        user: JSON.parse(userData),
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      set({ 
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }
}));