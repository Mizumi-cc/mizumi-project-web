import { FunctionComponent } from "react"

// components
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import AccountModal from "./AccountModal"

// store
import useGlobalModalsStore from "../stores/globalModals"

const GlobalModals: FunctionComponent = () => {
  const { 
    isAccountModalOpen,
    isLoginModalOpen,
    isRegisterModalOpen,
    toggleAccountModal,
    toggleLoginModal,
    toggleRegisterModal
  } = useGlobalModalsStore()

  return (
    <>
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={toggleLoginModal} 
      />
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={toggleRegisterModal} 
      />
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={toggleAccountModal} 
      />
    </>
  )
}

export default GlobalModals
