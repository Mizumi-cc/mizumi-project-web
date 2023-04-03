import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

// components
import HTMLHead from "../components/HTMLHead"
import Header from "../components/Header"
import SwapBox from "../components/SwapBox"
import CardCheckoutModal from "../components/CardCheckoutModal"

export default function Home() {
  const { connected } = useWallet()
  const { setVisible } = useWalletModal()

  const [busy, setBusy] = useState<boolean>(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(true)

  const handleSwapOrConnectClick = (data: any) => {
    if (!connected) {
      setVisible(true)
      return
    }
    setBusy(true)
    setShowCheckoutModal(true)
  }

  const completeCheckout = async () => {

  }

  const closeCheckoutModal = () => {
    setBusy(false)
    setShowCheckoutModal(false)
  }

  return (
    <main className='min-h-screen flex flex-col bg-stone-800'>
      <HTMLHead />
      <Header />
      <div className="justify-center items-center flex h-full pt-32">
        <SwapBox 
          busy={busy}
          onSubmit={handleSwapOrConnectClick}
        />
      </div>
      <CardCheckoutModal 
        isOpen={showCheckoutModal}
        onClose={closeCheckoutModal}
        onSubmit={completeCheckout}
      />
    </main>
  )
}
