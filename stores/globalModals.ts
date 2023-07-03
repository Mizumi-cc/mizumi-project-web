import { create } from "zustand"

type GlobalModalsState = {
  isLoginModalOpen: boolean
  isRegisterModalOpen: boolean
  isAccountModalOpen: boolean
  isEnable2FAModalOpen: boolean
  is2FAChallengeModalOpen: boolean
}

type Actions = {
  reset: () => void
  toggleLoginModal: () => void
  toggleRegisterModal: () => void
  toggleAccountModal: () => void
  toggleEnable2FAModal: () => void
  toggle2FAChallengeModal: () => void
}

const initialState: GlobalModalsState = {
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isAccountModalOpen: false,
  isEnable2FAModalOpen: false,
  is2FAChallengeModalOpen: false,
}

const useGlobalModalsStore = create<GlobalModalsState & Actions>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  toggleLoginModal: () => set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
  toggleRegisterModal: () => set((state) => ({ isRegisterModalOpen: !state.isRegisterModalOpen })),
  toggleAccountModal: () => set((state) => ({ isAccountModalOpen: !state.isAccountModalOpen })),
  toggleEnable2FAModal: () => set((state) => ({ isEnable2FAModalOpen: !state.isEnable2FAModalOpen })),
  toggle2FAChallengeModal: () => set((state) => ({ is2FAChallengeModalOpen: !state.is2FAChallengeModalOpen })),
}))

export default useGlobalModalsStore
