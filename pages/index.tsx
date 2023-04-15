import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

// components
import HTMLHead from "../components/HTMLHead"
import Header from "../components/Header"
import SwapBox from "../components/SwapBox"
import CardCheckoutModal from "../components/CardCheckoutModal"
import type { SwapData } from "../components/SwapBox"
import { createOrder } from "../services/order"
import type { Order } from "../utils/models"
import type { CardInfo } from "../components/CardCheckoutModal"
import { STABLES, TRANSACTIONKIND } from "../utils/enums"
import RegisterModal from "../components/RegisterModal"
import LoginModal from "../components/LoginModal"

// stores
import useAuthStore from "../stores/auth"

export default function Home() {
  const { showLoginModal, showRegisterModal, setShowLoginModal, setShowRegisterModal } = useAuthStore()
  const { connected } = useWallet()
  const { setVisible } = useWalletModal()

  const [busy, setBusy] = useState<boolean>(false)
  const [swapData, setSwapData] = useState<SwapData | null>(null)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  

  const handleSwapOrConnectClick = (data: SwapData) => {
    if (!connected) {
      setVisible(true)
      return
    }
    setBusy(true)
    setShowCheckoutModal(true)
    if (data.debitType === 'Fiat') {
      setShowCheckoutModal(true)
    }
  }

  const completeCheckout = async (data: CardInfo) => {
    if (!swapData) return
    const order: Order = {
      fiatAmount: swapData.debitType === 'Fiat' ? swapData.debitAmount : swapData.creditAmount,
      userId: '1',
      tokenAmount: swapData.debitType === 'Fiat' ? swapData.creditAmount : swapData.debitAmount,
      token: swapData.debitType === 'Fiat' ? swapData.creditCurrency : swapData.debitCurrency,
      fiat: swapData.debitType === 'Fiat' ? swapData.debitCurrency : swapData.creditCurrency,
      country: 'Ghana',
      kind: swapData.debitType === 'Fiat' ? TRANSACTIONKIND.ONRAMP : TRANSACTIONKIND.OFFRAMP,
      rate: 10,
    }
    const response = await createOrder(order)
      .then(res => {
        if (res.status === 200) {
          return res.data
        }
      })
      .catch(err => {
        setBusy(false)
      })
    
  }

  const closeCheckoutModal = () => {
    setBusy(false)
    setShowCheckoutModal(false)
  }

  return (
    <main className='min-h-screen flex flex-col bg-stone-800'>
      <HTMLHead />
      <Header 
        showRegisterModal={() => setShowRegisterModal(true)}
        showLoginModal={() => setShowLoginModal(true)}
      />
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
      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </main>
  )
}
