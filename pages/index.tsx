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

export default function Home() {
  const { connected } = useWallet()
  const { setVisible } = useWalletModal()

  const [busy, setBusy] = useState<boolean>(false)
  const [swapData, setSwapData] = useState<SwapData | null>(null)
  const [showCheckoutModal, setShowCheckoutModal] = useState(true)

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
