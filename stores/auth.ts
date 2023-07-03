import { create } from "zustand"

import type { User } from "../utils/models"
import { fetchAuthenticatedUser } from "../services/auth"

type AuthState = {
  token: string | null
  user: User | null
}

type Actions = {
  reset: () => void
  refreshUser: (token: string) => void
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
  refreshUser: async (token) => {
    const response = await fetchAuthenticatedUser(token)
    set({
      user: {
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        walletAddress: response.data.user.wallet_address,
        createdAt: response.data.user.created_at,
        updatedAt: response.data.user.updated_at,
        twoFactorEnabled: response.data.two_factor_enabled,
      }
    })    
  },
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
}))

export default useAuthStore
