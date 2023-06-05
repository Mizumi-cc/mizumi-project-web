import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Logo from "../Logo"
import useAuthStore from "../../stores/auth"
import { logout } from "../../services/auth"

interface HeaderProps {
  logoMode?: 'dark' | 'light'
  showRegisterModal?: () => void
  showLoginModal?: () => void
  showAuthButtons?: boolean
}

const Header = ({ logoMode, showRegisterModal, showLoginModal, showAuthButtons = true }: HeaderProps) => {
  const { user, token, reset } = useAuthStore()

  const onLogout = async () => {
    await logout(token!)
      .then(() => {
        reset()
        sessionStorage.removeItem('token')
      })
  }

  return (
    <header
      className="flex flex-row items-center justify-between w-full bg-transparent py-4 lg:px-8 px-0"
    >
      <Logo 
        image={{
          black: '/assets/img/mizumi-black.svg',
          white: '/assets/img/mizumi-white.svg'
        }}
        mode={logoMode}
        href="/"
      />

      {showAuthButtons && (
        <div className="flex flex-row items-center lg:space-x-3 space-x-2">
          {!user && (
            <div className="flex flex-row items-center space-x-4">
              <button
                onClick={showLoginModal}
                className="bg-black text-white font-medium rounded-md lg:text-base text-sm  lg:px-6 px-4 lg:py-[10px] py-[6px]"
              >
                Login
              </button>
              <button
                onClick={showRegisterModal}
                className="bg-white text-black font-medium rounded-md lg:px-6 px-4 lg:py-[10px] py-[6px] lg:text-base text-sm"
              >
                Register
              </button>
            </div>
          )}
          {user && (
            <div className="flex flex-row items-center space-x-3">
              <WalletMultiButton />
              <button
                onClick={onLogout}
                className="bg-black text-white font-medium rounded-md px-6 py-[10px]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
