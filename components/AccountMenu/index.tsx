import { Fragment, FunctionComponent } from "react"
import Image from "next/image"
import { 
  ArrowLeftOnRectangleIcon, 
  ClipboardIcon, 
  NoSymbolIcon, 
  UserCircleIcon,
  ChevronDownIcon
} from "@heroicons/react/20/solid"
import { Menu, Transition } from  "@headlessui/react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

import useAuthStore from "../../stores/auth"
import useGlobalModalsStore from "../../stores/globalModals"
import useAlertStore from "../../stores/alerts"
import { logout } from "../../services/auth"


const AccountMenu: FunctionComponent = () => {
  const { wallet, publicKey, disconnect } = useWallet()
  const { toggleAccountModal } = useGlobalModalsStore()
  const { token, reset } = useAuthStore()
  const { addAlert } = useAlertStore()
  const { setVisible } = useWalletModal()

  const abbreviateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(publicKey!.toBase58())
    addAlert({
      type: 'info',
      text: 'Address copied to clipboard'
    })
  }

  const onLogout = async () => {
    await logout(token!)
      .then(() => {
        reset()
        sessionStorage.removeItem('token')
      })
  }

  const options= [
    { title: 'Account', onClick: toggleAccountModal!, icon: <UserCircleIcon className="w-7 pr-2" />},
    { title: 'Copy Address', onClick: copyAddress, icon: <ClipboardIcon className="w-7 pr-2" />},
    { title: 'Disconnect Wallet', onClick: disconnect, icon: <NoSymbolIcon className="w-7 pr-2" />},
    { title: 'Logout', onClick: onLogout, icon: <ArrowLeftOnRectangleIcon className="w-7 pr-2 "/>},
  ]

  return (
    <>
      {publicKey ? (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex flex-row items-center w-full justify-center px-2 py-[6px] text-sm rounded-3xl border border-opacity-25 border-white bg-white bg-opacity-25 space-x-2 hover:border-blue-400 hover:bg-opacity-30">
              {wallet && (
                <Image 
                  src={wallet!.adapter.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="rounded-full"
                />)
              }
              {publicKey ? 
                <p
                  className="text-white font-semibold text-xs"
                >{abbreviateAddress(publicKey.toBase58())}</p> 
                  : 
                <p className="text-white font-medium">
                  Connect Wallet
                </p>
              }
              {publicKey && (
                <ChevronDownIcon 
                  className="h-5 w-5 text-white"
                />
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {options.map((option, optionIdx) => (
                  <Menu.Item key={optionIdx}>
                    {({ active }) => (
                      <button
                        onClick={option.onClick}
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-slate-900 hover:text-white hover:bg-slate-800 font-medium"
                      >
                        {option.icon} 
                        <p
                          className="text-black text-sm font-medium group-hover:text-white"
                        >{option.title}</p>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <button
          onClick={() => setVisible(true)}
          className="px-3 py-2 border border-white border-opacity-25 rounded-3xl hover:border-blue-400 hover:bg-opacity-30 font-medium text-white bg-white bg-opacity-20 text-sm"
        >
          Connect Wallet
        </button>
      )}
    </>
  )
}

export default AccountMenu
