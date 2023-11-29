import { 
  ArrowRightOnRectangleIcon, 
  PencilSquareIcon,
} from "@heroicons/react/20/solid"

import Logo from "../Logo"
import useAuthStore from "../../stores/auth"
import AccountMenu from "../AccountMenu"
import ShowMoreMenu from "../ShowMoreMenu"
import useGlobalModalsStore from "../../stores/globalModals"

interface HeaderProps {
  logoMode?: 'dark' | 'light'
  showAuthButtons?: boolean
}

const Header = ({ logoMode, showAuthButtons = true }: HeaderProps) => {
  const { user } = useAuthStore()
  const { toggleLoginModal, toggleRegisterModal } = useGlobalModalsStore()

  return (
    <header
      className="flex flex-row items-center justify-between w-full bg-black bg-opacity-5 backdrop-blur-sm py-2 lg:px-8 px-4 fixed top-0 left-0 right-0"
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
            <>
              <div className="md:flex flex-row items-center space-x-4 hidden">
                <button
                  onClick={toggleLoginModal}
                  className="bg-black text-white font-medium rounded-md lg:text-base text-sm  lg:px-6 px-4 lg:py-[10px] py-[6px]"
                >
                  Login
                </button>
                <button
                  onClick={toggleRegisterModal}
                  className="bg-white text-black font-medium rounded-md lg:px-6 px-4 lg:py-[10px] py-[6px] lg:text-base text-sm"
                >
                  Register
                </button>
              </div>
              <div className="md:hidden block">
                <ShowMoreMenu
                  options={[
                    { title: 'Login', onClick: toggleLoginModal, icon: <ArrowRightOnRectangleIcon className="w-7 pr-2"/> },
                    { title: 'Register', onClick: toggleRegisterModal, icon: <PencilSquareIcon className="w-7 pr-2"/>}
                  ]}
                />
              </div>
            </>
          )}
          {user && (
            <>
              <div className="flex flex-row items-center">
                <AccountMenu />
              </div>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
