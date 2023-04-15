import { create } from "zustand"

import type { User } from "../utils/models"

interface AuthState {
  token: string | null
  setToken: (token: string) => void
  user: User | null
  setUser: (user: User) => void
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  user: null,
  setUser: (user) => set({ user }),
}))

export default useAuthStore
