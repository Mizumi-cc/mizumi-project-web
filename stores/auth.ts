import { create } from "zustand"

import type { User } from "../utils/models"

type AuthState = {
  token: string | null
  user: User | null
  showLoginModal: boolean
  showRegisterModal: boolean
}

type Actions = {
  reset: () => void
  setToken: (token: string) => void
  setUser: (user: User | null) => void
  setShowLoginModal: (show: boolean) => void
  setShowRegisterModal: (show: boolean) => void
}

const initialState: AuthState = {
  token: null,
  user: null,
  showLoginModal: false,
  showRegisterModal: false
}

const useAuthStore = create<AuthState & Actions>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  setShowLoginModal: (show) => set({ showLoginModal: show }),
  setShowRegisterModal: (show) => set({ showRegisterModal: show })
}))

export default useAuthStore
