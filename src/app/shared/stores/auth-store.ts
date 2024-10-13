import { UserDto } from '@core/models/User.ts';
import { create } from 'zustand';

export type User = UserDto;

type AuthStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLogged: boolean) => void;
  user: User | null;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: (isLoggedIn) => set((state) => ({ ...state, isLoggedIn })),
}));
