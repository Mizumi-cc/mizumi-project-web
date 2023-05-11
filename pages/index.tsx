import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { PythHttpClient, getPythClusterApiUrl, getPythProgramKeyForCluster } from "@pythnetwork/client"
import { VersionedTransaction, Connection, } from "@solana/web3.js"

// components
import HTMLHead from "../components/HTMLHead"
import Header from "../components/Header"
import SwapBox from "../components/SwapBox"
import CardCheckoutModal from "../components/CardCheckoutModal"
import type { SwapData } from "../components/SwapBox"
import type { CardInfo } from "../components/CardCheckoutModal"
import RegisterModal from "../components/RegisterModal"
import LoginModal from "../components/LoginModal"
import RatesBox from "../components/RatesBox"
import PaymentStatusModal from "../components/PaymentStatusModal"

// stores
import useAuthStore from "../stores/auth"
import useUserOrdersStore from "../stores/userOrders"

// services
import { getGHSRates } from "../services/rates"
import { verifyPayment } from "../services/payment"
import { saveWalletAddress } from "../services/auth"
import { createOrder, createUserProgramAccountTx, initiateDebit, initiateCredit, getOrder, completeOrder } from "../services/order"

// utils
import type { Order } from "../utils/models"
import { TRANSACTIONKIND } from "../utils/enums"



export default function Home(props: any) {
  const router = useRouter()
  const { showLoginModal, token, user,
    showRegisterModal, setShowLoginModal, setShowRegisterModal } = useAuthStore()
  const { orders } = useUserOrdersStore()
  const { connected, publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const { setVisible } = useWalletModal()

  const [busy, setBusy] = useState<boolean>(false)
  const [swapData, setSwapData] = useState<SwapData | null>(null)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [ghsRate, setGhsRate] = useState<number>(0)
  const [usdcRate, setUsdcRate] = useState<number>(0)
  const [usdtRate, setUsdtRate] = useState<number>(0)
  const [paymentStatus, setPaymentStatus] = useState<string>(props.paymentStatus)
  const [showPaymentStatusModal, setShowPaymentStatusModal] = useState<boolean>(Boolean(props.paymentStatus))
  const [activeOrder, setActiveOrder] = useState<Order | null>(props.order)

  const handleSwapOrConnectClick = async(data: SwapData) => {
    if (!connected) {
      setVisible(true)
      return
    }
    setBusy(true)
    setSwapData(data)
    const { txId, dbTransaction } = await handleCreateOrder(data)
    await initiateDebit(
      { txId: dbTransaction.id, userId: user!.id, blockchainTxId: txId },
      token!
    ).then((res) => {
      if (res.status === 200) {
        if (res.data.paymentLink) {
          window.location.href = res.data.paymentLink
        }
      }
    })
  }

  const completeCheckout = async (data: CardInfo) => {
    if (!swapData) return

  }

  const handleCreateProgramUserAccount = async () => {
    if (orders.length !== 0) return

    const serializedTransaction = await createUserProgramAccountTx(user!.id, token!)
      .then((res) => res.data.serializedTransaction)
    const transaction = VersionedTransaction.deserialize(Uint8Array.from(Buffer.from(serializedTransaction, 'base64')))
    await sendTransaction!(transaction, connection, { skipPreflight: true, preflightCommitment: 'confirmed' })
  }

  const handleCreditUserWallet = async (txId: string) => {
    const serializedTransaction = await initiateCredit(user!.id, txId, token!)
      .then((res) => res.data.serializedTransaction)
    const transaction = VersionedTransaction.deserialize(Uint8Array.from(Buffer.from(serializedTransaction, 'base64')))
    const hash = await sendTransaction!(transaction, connection, { skipPreflight: true, preflightCommitment: 'confirmed' })
    const blockhash = await connection.getLatestBlockhash()
    await connection.confirmTransaction({ 
      signature: hash, 
      blockhash:blockhash.blockhash, 
      lastValidBlockHeight: blockhash.lastValidBlockHeight 
    }, 'confirmed').catch((err) => {
      console.log(err)
    })
    handleCompleteFirstOrder(txId)
  }

  const handleCreateOrder = async (data: SwapData) => {
    const order: Order = {
      fiatAmount: data.debitType === 'Fiat' ? data.debitAmount : data.creditAmount,
      userId: user!.id,
      tokenAmount: data.debitType === 'Fiat' ? data.creditAmount : data.debitAmount,
      token: data.debitType === 'Fiat' ? data.creditCurrency : data.debitCurrency,
      fiat: data.debitType === 'Fiat' ? data.debitCurrency : data.creditCurrency,
      country: 'Ghana',
      kind: data.debitType === 'Fiat' ? TRANSACTIONKIND.ONRAMP : TRANSACTIONKIND.OFFRAMP,
      rate: 10,
    }
    const response = await createOrder(order, token!)
      .then(res => {
        if (res.status === 200) {
          return res.data
        }
      })
      .catch(err => {
        setBusy(false)
      })
    const txId = await signAndSendTransaciton(response.serializedTransaction)
    return { txId, dbTransaction: response.dbTransaction }
  }

  const signAndSendTransaciton = async (solanaTx: string) => {
    const tx = VersionedTransaction.deserialize(Uint8Array.from(Buffer.from(solanaTx, 'base64')))
    console.log(tx, 'transaction')
    return await sendTransaction(tx, connection, { skipPreflight: true, preflightCommitment: 'confirmed' })
  }

  const closeCheckoutModal = () => {
    setBusy(false)
    setShowCheckoutModal(false)
  }

  const handleCompleteFirstOrder = async (txId: string) => {
    const tx = await completeOrder(user!.id, txId, token!)
      .then(res => res.data.serializedTransaction)
    const transactionHash = await signAndSendTransaciton(tx)
    console.log(transactionHash, 'transaction hash')
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
        handleCreateProgramUserAccount()
      }
    }
    storeUserWallet()
  }, [connected, user])

  useEffect(() => {
   async function getPythPrices() {
    const pythConnection = new Connection(getPythClusterApiUrl('devnet'))
    const pythClient = new PythHttpClient(pythConnection, getPythProgramKeyForCluster('devnet'))
    const data = await pythClient.getData()
    for (const symbol of data.symbols) {
      const price = data.productPrice.get(symbol)!
      if (price.price && price.confidence) {
        if (symbol === 'Crypto.USDC/USD') {
          setUsdcRate(price.price)
        } else if (symbol === 'Crypto.USDT/USD') {
          setUsdtRate(price.price)
        }
      }
    }
   }

    getPythPrices()
  }, [])

  useEffect(() => {
    if (props.paymentStatus === 'success' && connected && !busy) {
      handleCreditUserWallet(props.order.id)
      setBusy(true)
    }
  }, [props, connected])

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
      <PaymentStatusModal
        order={activeOrder}
        isOpen={showPaymentStatusModal}
        onClose={() => setShowPaymentStatusModal(false)}
        status={paymentStatus}
      />
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

export async function getServerSideProps({ query }: { query: any}) {
  const { reference } = query

  if (reference) {
    const order = await getOrder(reference as string)
      .then(res => res.data.transaction)
    
    const response = await verifyPayment(reference as string)
      .then((res) => res.data.data.status)
      .catch((err) => {
        console.log(err)
        return 'error'
      })
    return {
      props: {
        order,
        paymentStatus: response,
      }
    }
  }

  return {
    props: {
      order: null,
      paymentStatus: null,
    }
  }
}
