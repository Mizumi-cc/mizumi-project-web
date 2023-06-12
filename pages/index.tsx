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
import RatesBox from "../components/RatesBox"
import SuccessModal from "../components/SuccessModal"
import VeryfyingPaymentModal from "../components/VeryfyingPaymentModal"

// stores
import useAuthStore from "../stores/auth"
import useUserOrdersStore from "../stores/userOrders"
import useAlertStore from "../stores/alerts"

// services
import { getGHSRates } from "../services/rates"
import { saveWalletAddress } from "../services/auth"
import { createOrder, createUserProgramAccountTx, initiateDebit, initiateCredit, getOrder, completeOrder } from "../services/order"

// utils
import type { Order } from "../utils/models"
import { STABLES, TRANSACTIONKIND, TRANSACTIONSTATUS } from "../utils/enums"
import { useRouter } from "next/router"

let socket

export default function Swap() {
  const router = useRouter()
  const { token, user } = useAuthStore()
  const { orders } = useUserOrdersStore()
  const { connected, publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const { setVisible } = useWalletModal()
  const { addAlert } = useAlertStore()

  const [busy, setBusy] = useState<boolean>(false)
  const [ghsRate, setGhsRate] = useState<number>(0)
  const [usdcRate, setUsdcRate] = useState<number>(0)
  const [usdtRate, setUsdtRate] = useState<number>(0)
  const [activeOrder, setActiveOrder] = useState<Order | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [crediting, setCrediting] = useState<boolean>(false)
  const [showVerifyingModal, setShowVerifyingModal] = useState<boolean>(false)
  const [paymentVerified, setPaymentVerified] = useState<boolean>(false)

  const handleSwapOrConnectClick = async(data: SwapData) => {
    if (!connected) {
      setVisible(true)
      return
    }
    setBusy(true)
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

  const handleCreditUserWallet = async (userId: string) => {
    setCrediting(true)
    const token = sessionStorage.getItem('token')

    const serializedTransaction = await initiateCredit(userId, router.query.reference as string, token!)
      .then((res) => res.data.serializedTransaction)
    const hash = await signAndSendTransaciton(serializedTransaction)
    const blockhash = await connection.getLatestBlockhash()
    await connection.confirmTransaction({ 
      signature: hash!, 
      blockhash:blockhash.blockhash, 
      lastValidBlockHeight: blockhash.lastValidBlockHeight 
    }, 'confirmed').catch((err) => {
      console.log(err)
      setBusy(false)
    })
    handleCompleteOrder(router.query.reference as string)
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
    setShowVerifyingModal(false)
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
      if (msg.id === router.query.reference && msg.status === 'debited') {
        setPaymentVerified(true)
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
    async function fetchOrder() {
      const order = await getOrder(router.query.reference as string)
        .then(res => res.data.transaction)

      setActiveOrder({
        userId: order.user_id,
        token: order.token,
        tokenAmount: order.token_amount,
        fiat: order.fiat,
        fiatAmount: order.fiat_amount,
        status: order.status,
        kind: order.kind,
        country: order.country,
        tokenRate: order.token_rate,
        fiatRate: order.fiat_rate,
        payoutInfo: order.payout_info,
        createdAt: order.created_at,
      })

      if (order.status !== TRANSACTIONSTATUS.DEBITING) {
        setPaymentVerified(true)
      }
    }

    if (router.query.reference) {
      setBusy(true)
      setShowVerifyingModal(true)
      fetchOrder()
    }
  }, [])

  useEffect(() => {
    initializeSocket()
  }, [])

  useEffect(() => {
    if(connected && showVerifyingModal && busy && activeOrder && paymentVerified) {
      handleCreditUserWallet(activeOrder.userId)
    }
  }, [connected, showVerifyingModal, busy, activeOrder, paymentVerified])


  return (
    <main className='min-h-screen flex flex-col bg-stone-800 lg:px-0 px-4 lg:pb-0 pb-12'>
      <HTMLHead />
      <Header />
      <div className="justify-center items-center flex flex-col h-full lg:pt-32 pt-28 space-y-10">
        <SwapBox 
          busy={busy}
          rates={{
            USDC: usdcRate,
            USDT: usdtRate,
            GHS: ghsRate,
          }}
          onSubmit={handleSwapOrConnectClick}
        />
        <div
          className="lg:fixed lg:top-20 lg:left-8 lg:w-1/12 w-full"
        >
          <RatesBox 
            usdcRate={usdcRate}
            ghsRate={ghsRate}
            usdtRate={usdtRate}
          />
        </div>
      </div>     
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
