import { useState, useEffect } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { PythHttpClient, getPythClusterApiUrl, getPythProgramKeyForCluster } from "@pythnetwork/client"
import { VersionedTransaction, Connection } from "@solana/web3.js"
import io from "socket.io-client"

// components
import HTMLHead from "../components/HTMLHead"
import Header from "../components/Header"
import SwapBox from "../components/SwapBox"
import type { SwapData } from "../components/SwapBox"
import RegisterModal from "../components/RegisterModal"
import LoginModal from "../components/LoginModal"
import RatesBox from "../components/RatesBox"
import PaymentStatusModal from "../components/PaymentStatusModal"
import SuccessModal from "../components/SuccessModal"
import VeryfyingPaymentModal from "../components/VeryfyingPaymentModal"

// stores
import useAuthStore from "../stores/auth"
import useUserOrdersStore from "../stores/userOrders"

// services
import { getGHSRates } from "../services/rates"
import { saveWalletAddress } from "../services/auth"
import { createOrder, createUserProgramAccountTx, initiateDebit, initiateCredit, getOrder, completeOrder } from "../services/order"

// utils
import type { Order } from "../utils/models"
import { STABLES, TRANSACTIONKIND, TRANSACTIONSTATUS } from "../utils/enums"

let socket

export default function Home(props: any) {
  const { showLoginModal, token, user,
    showRegisterModal, setShowLoginModal, setShowRegisterModal } = useAuthStore()
  const { orders } = useUserOrdersStore()
  const { connected, publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const { setVisible } = useWalletModal()

  const [busy, setBusy] = useState<boolean>(false)
  const [swapData, setSwapData] = useState<SwapData | null>(null)
  const [ghsRate, setGhsRate] = useState<number>(0)
  const [usdcRate, setUsdcRate] = useState<number>(0)
  const [usdtRate, setUsdtRate] = useState<number>(0)
  const [paymentStatus, setPaymentStatus] = useState<string>('')
  const [showPaymentStatusModal, setShowPaymentStatusModal] = useState<boolean>(false)
  const [activeOrder, setActiveOrder] = useState<Order | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [credited, setCredited] = useState<boolean>(false)
  const [showVerifyingModal, setShowVerifyingModal] = useState<boolean>(false)
  const [paymentVerified, setPaymentVerified] = useState<boolean>(false)

  const handleSwapOrConnectClick = async(data: SwapData) => {
    if (!connected) {
      setVisible(true)
      return
    }
    setBusy(true)
    setSwapData(data)
    const { txId, dbTransaction } = await handleCreateOrder(data)
    await initiateDebit(
      { txId: dbTransaction.id, userId: user!.id, blockchainTxId: txId! },
      token!
    ).then(async (res) => {
      if (res.status === 200) {
        if (res.data.paymentLink) {
          window.location.href = res.data.paymentLink
        } else if (res.data.serializedTransaction) {
          const hash = await signAndSendTransaciton(res.data.serializedTransaction)
          confirmTxAndCreditFiat(hash!, dbTransaction.id)
        }
      }
    })
  }

  const handleCreateProgramUserAccount = async () => {
    if (orders.length !== 0) return

    const serializedTransaction = await createUserProgramAccountTx(user!.id, token!)
      .then((res) => res.data.serializedTransaction)
    const transaction = VersionedTransaction.deserialize(Uint8Array.from(Buffer.from(serializedTransaction, 'base64')))
    await sendTransaction!(transaction, connection, { skipPreflight: true, preflightCommitment: 'confirmed' })
  }

  const handleCreditUserWallet = async (txId: string) => {
    setCredited(true)
    const serializedTransaction = await initiateCredit(user!.id, txId, token!)
      .then((res) => res.data.serializedTransaction)
    const transaction = VersionedTransaction.deserialize(Uint8Array.from(Buffer.from(serializedTransaction, 'base64')))
    setShowVerifyingModal(false)
    const hash = await sendTransaction!(transaction, connection, { skipPreflight: true, preflightCommitment: 'confirmed' })
    const blockhash = await connection.getLatestBlockhash()
    await connection.confirmTransaction({ 
      signature: hash, 
      blockhash:blockhash.blockhash, 
      lastValidBlockHeight: blockhash.lastValidBlockHeight 
    }, 'confirmed').catch((err) => {
      console.log(err)
      setBusy(false)
    })
    handleCompleteOrder(txId)
  }

  const confirmTxAndCreditFiat = async (hash: string, txId: string) => {
    await connection.confirmTransaction(hash, 'confirmed')
      .catch((err) => {
        console.log(err)
        setBusy(false)
      })
    await initiateCredit(user!.id, txId, token!)
      .catch((err) => {
        console.log(err)
        setBusy(false)
      })
    handleCompleteOrder(txId)
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
      fiatRate: ghsRate,
      tokenRate: data.debitType === 'Fiat' ? data.creditCurrency === STABLES.USDC ? usdcRate : usdtRate : ghsRate,
      payoutInfo: data.debitType === 'Fiat' ? {
        method: 'wallet',
        walletAddress: data.creditInfo.walletAddress
      } : {
        method: data.creditInfo.accountNumber ? 'bank' : 'mobile',
        accountNumber: data.creditInfo.accountNumber,
        accountName: data.creditInfo.accountName,
        momoNumber: data.creditInfo.momoNumber,
        momoName: data.creditInfo.momoName,
        momoNetwork: data.creditInfo.momoNetwork
      }
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
    await connection.confirmTransaction(txId!, 'confirmed')
    return { txId, dbTransaction: response.dbTransaction }
  }

  const signAndSendTransaciton = async (solanaTx: string) => {
    const tx = VersionedTransaction.deserialize(Uint8Array.from(Buffer.from(solanaTx, 'base64')))
    return await sendTransaction(tx, connection, { skipPreflight: true, preflightCommitment: 'confirmed' })
      .catch((err) => {
        setBusy(false)
      })
  }

  const handleCompleteOrder = async (txId: string) => {
    const tx = await completeOrder(user!.id, txId, token!)
      .then(res => res.data.serializedTransaction)
    const transactionHash = await signAndSendTransaciton(tx)
    setBusy(false)
    setShowSuccessModal(true)
    console.log(transactionHash, 'transaction hash')
  }

  const initializeSocket = async () => {
    socket = io(process.env.NEXT_PUBLIC_SERVER_URL!)
    socket.on('news', () => {
      console.log('connected')
    })
    socket.on('order', (msg) => {
      console.log(msg)
      if (msg.id === props.reference && msg.status === 'debited') {
        setPaymentVerified(true)
        handleCreditUserWallet(activeOrder!.id as string)
      }
    })
  }

  useEffect(() => {
    async function getRates() {
      const response = await getGHSRates()
      if (response) {
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
    if (connected && user && !credited && activeOrder) {
      setBusy(true)
      setShowVerifyingModal(true)
    }
  }, [props, connected, user, credited, activeOrder])

  useEffect(() => {
    async function fetchOrder() {
      const order = await getOrder(props.reference as string)
        .then(res => res.data.transaction)

      setActiveOrder(order)
    }

    if (props.reference) {
      fetchOrder()
    }
  }, [])

  useEffect(() => {
    initializeSocket()
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
      {/* <PaymentStatusModal
        order={activeOrder}
        isOpen={showPaymentStatusModal}
        onClose={() => setShowPaymentStatusModal(false)}
        status={paymentStatus}
      /> */}
      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      <VeryfyingPaymentModal 
        isOpen={showVerifyingModal}
        onClose={() => setShowVerifyingModal(false)}
        verified={paymentVerified}
      />
    </main>
  )
}

export async function getServerSideProps({ query }: { query: any}) {
  const { reference } = query

  return {
    props: {
      reference: reference || null
    }
  }
}
