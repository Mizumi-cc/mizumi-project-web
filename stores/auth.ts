import { create } from "zustand"

import type { User } from "../utils/models"

type AuthState = {
  token: string | null
  user: User | null
}

type Actions = {
  reset: () => void
  setToken: (token: string) => void
  setUser: (user: User | null) => void
}

const initialState: AuthState = {
  token: null,
  user: null,
}

const useAuthStore = create<AuthState & Actions>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
}))

export default useAuthStore
