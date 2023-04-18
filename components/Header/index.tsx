import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Logo from "../Logo"
import useAuthStore from "../../stores/auth"
import { logout } from "../../services/auth"

interface HeaderProps {
  logoMode?: 'dark' | 'light'
  showRegisterModal?: () => void
  showLoginModal?: () => void
}

const Header = ({ logoMode, showRegisterModal, showLoginModal }: HeaderProps) => {
  const { user, token, setToken, setUser } = useAuthStore()

  const onLogout = async () => {
    await logout(token!)
      .then(() => {
        setUser(null)
        setToken('')
        sessionStorage.removeItem('token')
      })
  }

  return (
    <header
      className="flex flexrow items-center justify-between w-full bg-transparent py-4 px-8"
    >
      <Logo 
        image={{
          black: '/assets/img/mizumi-black.svg',
          white: '/assets/img/mizumi-white.svg'
        }}
        mode={logoMode}
        href="/"
      />

      <div className="flex flex-row items-center space-x-3">
        {!user && (
          <div className="flex flex-row items-center space-x-4">
            <button
              onClick={showLoginModal}
              className="bg-black text-white font-medium rounded-md px-6 py-[10px]"
            >
              Login
            </button>
            <button
              onClick={showRegisterModal}
              className="bg-white text-black font-medium rounded-md px-6 py-[10px]"
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
    </header>
  )
}

export default Header
