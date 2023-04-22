import { useState, useEffect } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { PythConnection, getPythProgramKeyForCluster } from "@pythnetwork/client"
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
import { saveWalletAddress } from "../services/auth"
import RatesBox from "../components/RatesBox"
import { getGHSRates } from "../services/rates"

// stores
import useAuthStore from "../stores/auth"

export default function Home() {
  const { showLoginModal, setToken, setUser, token, user,
    showRegisterModal, setShowLoginModal, setShowRegisterModal } = useAuthStore()
  const { connected, publicKey } = useWallet()
  const { connection } = useConnection()
  const { setVisible } = useWalletModal()

  const [busy, setBusy] = useState<boolean>(false)
  const [swapData, setSwapData] = useState<SwapData | null>(null)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [ghsRate, setGhsRate] = useState<number>(0)
  const [usdcRate, setUsdcRate] = useState<number>(0)
  const [usdtRate, setUsdtRate] = useState<number>(0)

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

  useEffect(() => {
    async function getRates() {
      const response = await getGHSRates()
      if (response) {
        console.log(response.data)
        setGhsRate(response.data.rates.GHS)
      }
    }

    getRates()
  }, [])

  useEffect(() => {
    async function storeUserWallet() {
      if (connected && publicKey && user && !user?.walletAddress) {
        await saveWalletAddress(token!, publicKey!.toBase58())
      }
    }
    storeUserWallet()
  }, [connected, user])

  useEffect(() => {
    const pythConnection = new PythConnection(connection, getPythProgramKeyForCluster('devnet'))
    pythConnection.onPriceChangeVerbose((productAccount, priceAccount) => {
      const product = productAccount.accountInfo.data.product
      const price = priceAccount.accountInfo.data
      if (price.price && price.confidence) {
        if (product.symbol === 'Crypto.USDC/USD') {
          console.log(`${product.symbol}: $${price.price} \xB1$${price.confidence}`)
          setUsdcRate(price.price)
        } else if (product.symbol === 'Crypto.USDT/USD') {
          console.log(`${product.symbol}: $${price.price} \xB1$${price.confidence}`)
          setUsdtRate(price.price)
        }
      }
    })
    pythConnection.start()
  }, [])

  return (
    <main className='min-h-screen flex flex-col bg-stone-800'>
      <HTMLHead />
      <Header 
        showRegisterModal={() => setShowRegisterModal(true)}
        showLoginModal={() => setShowLoginModal(true)}
      />
      <div className="justify-center items-center flex flex-col h-full pt-32 space-y-10">
        <SwapBox 
          busy={busy}
          rates={{
            USDC: usdcRate,
            USDT: usdtRate,
            GHS: ghsRate,
          }}
          onSubmit={handleSwapOrConnectClick}
        />
        <RatesBox 
          usdcRate={usdcRate}
          ghsRate={ghsRate}
          usdtRate={usdtRate}
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
