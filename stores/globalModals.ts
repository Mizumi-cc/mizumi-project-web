import { create } from "zustand"

type GlobalModalsState = {
  isLoginModalOpen: boolean
  isRegisterModalOpen: boolean
  isAccountModalOpen: boolean
}

type Actions = {
  reset: () => void
  toggleLoginModal: () => void
  toggleRegisterModal: () => void
  toggleAccountModal: () => void
}

const initialState: GlobalModalsState = {
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isAccountModalOpen: false
}

const useGlobalModalsStore = create<GlobalModalsState & Actions>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  toggleLoginModal: () => set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
  toggleRegisterModal: () => set((state) => ({ isRegisterModalOpen: !state.isRegisterModalOpen })),
  toggleAccountModal: () => set((state) => ({ isAccountModalOpen: !state.isAccountModalOpen }))
}))

export default useGlobalModalsStore
