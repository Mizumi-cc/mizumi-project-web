import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Logo from "../Logo"

interface HeaderProps {
  logoMode?: 'dark' | 'light'
}

const Header = ({ logoMode }: HeaderProps) => {
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

      <WalletMultiButton 
      />
    </header>
  )
}

export default Header
