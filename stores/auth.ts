import { create } from "zustand"

import type { User } from "../utils/models"

interface AuthState {
  token: string | null
  setToken: (token: string) => void
  user: User | null
  setUser: (user: User | null) => void
  showLoginModal: boolean
  setShowLoginModal: (show: boolean) => void
  showRegisterModal: boolean
  setShowRegisterModal: (show: boolean) => void
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  user: null,
  setUser: (user) => set({ user }),
  showLoginModal: false,
  setShowLoginModal: (show) => set({ showLoginModal: show }),
  showRegisterModal: false,
  setShowRegisterModal: (show) => set({ showRegisterModal: show })
}))

export default useAuthStore
