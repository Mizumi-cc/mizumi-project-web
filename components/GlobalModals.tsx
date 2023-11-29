import { FunctionComponent } from "react"

// components
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import AccountModal from "./AccountModal"
import Enable2FAModal from "./Enable2FAModal"
import TwoFAChallengeModal from "./TwoFAChallengeModal"

// store
import useGlobalModalsStore from "../stores/globalModals"

const GlobalModals: FunctionComponent = () => {
  const { 
    isAccountModalOpen,
    isLoginModalOpen,
    isRegisterModalOpen,
    isEnable2FAModalOpen,
    is2FAChallengeModalOpen,
    toggleAccountModal,
    toggleLoginModal,
    toggleRegisterModal,
    toggleEnable2FAModal,
    toggle2FAChallengeModal
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
      {isEnable2FAModalOpen && (
        <Enable2FAModal
          isOpen={isEnable2FAModalOpen}
          onClose={toggleEnable2FAModal}
        />
      )}
      <TwoFAChallengeModal
        isOpen={is2FAChallengeModalOpen}
        onClose={toggle2FAChallengeModal}
      />
    </>
  )
}

export default GlobalModals
