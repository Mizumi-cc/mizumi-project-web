import { useMemo, useEffect } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { SolflareWalletAdapter, BackpackWalletAdapter } from '@solana/wallet-adapter-wallets'
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import useAuthStore from '../stores/auth'
import useUserOrdersStore from '../stores/userOrders'
import { fetchAuthenticatedUser } from '../services/auth'
import { getUserOrders } from '../services/order'
import Toast from '../components/Toast'
import useAlertStore from '../stores/alerts'
import { Analytics } from '@vercel/analytics/react';
import GlobalModals from '../components/GlobalModals'

require('@solana/wallet-adapter-react-ui/styles.css')

function MyApp({ Component, pageProps }: AppProps) {
  const { refreshUser, setToken, user, token } = useAuthStore()
  const { orders, setOrders } = useUserOrdersStore()
  const { alerts, reset } = useAlertStore()
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC

  // hide alert popup after 5 seconds
  const unSub = useAlertStore.subscribe((state) => {
    if (state.alerts.length > 0) {
      setTimeout(() => {
        reset()
      }, 5000)
    }
  })
  

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter()
    ],
    []
  )

  useEffect(() => {
    async function autoLogin() {
      const token = sessionStorage.getItem('token')
      if (token) {
        refreshUser(token)
        setToken(token)
      }
    }

    autoLogin()
  }, [])

  useEffect(() => {
    async function fetchUserOrders() {
      if (user && token && orders.length === 0) {
        const response = await getUserOrders(user.id, token)
        if (response) {
          const orders = response.data.transactions.map((order: any) => {
            return {
              id: order.id,
              userId: order.user_id,
              fiatAmount: order.fiat_amount,
              fiat: order.fiat,
              tokenAmount: order.token_amount,
              token: order.token,
              status: order.status,
              kind: order.kind,
              country: order.country,
              fiatRate: order.fiat_rate,
              tokenRate: order.token_rate,
              transactionHash: order.transaction_hash,
              errorReason: order.error_reason,
              createdAt: order.created_at,
              settledAt: order.settled_at,
              updatedAt: order.updated_at,
              payoutInfo: order.payout_info
            }
          })
          setOrders(orders)
        }
      }
    }

    fetchUserOrders()
  }, [user, token])

  useEffect(() => {
    return () => {
      unSub()
    }
  })

  return (
    <ConnectionProvider endpoint={endpoint!}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
          <Analytics />
          <Toast messages={alerts} />
          <GlobalModals />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MyApp
