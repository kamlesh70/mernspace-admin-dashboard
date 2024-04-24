import { create } from "zustand";
import { devtools } from 'zustand/middleware'

export interface User {
    email: string;
    firstName: string;
    id: number
    lastName: string;
    role: string;
}

export interface AuthStore {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    devtools((set) => ({
        user: null,
        setUser: (user) => set({ 
            user: {
                email: user.email,
                firstName: user.firstName,
                id: user.id,
                lastName: user.lastName,
                role: user.role
            }
         }),
        logout: () => set({ user: null })
    }))
)