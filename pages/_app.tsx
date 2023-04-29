import { useMemo, useEffect } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import useAuthStore from '../stores/auth'
import useUserOrdersStore from '../stores/userOrders'
import { fetchAuthenticatedUser } from '../services/auth'
import { getUserOrders } from '../services/order'

require('@solana/wallet-adapter-react-ui/styles.css')

function MyApp({ Component, pageProps }: AppProps) {
  const { setUser, setToken, user, token } = useAuthStore()
  const { orders, setOrders } = useUserOrdersStore()
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
    ],
    []
  )

  useEffect(() => {
    async function autoLogin() {
      const token = sessionStorage.getItem('token')
      if (token) {
        const response = await fetchAuthenticatedUser(token)
        if (response) {
          setUser({
            id: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
            walletAddress: response.data.user.wallet_address,
            createdAt: response.data.user.created_at,
            updatedAt: response.data.user.updated_at
          })
          setToken(token)
        }
      }
    }

    autoLogin()
  }, [])

  useEffect(() => {
    async function fetchUserOrders() {
      if (user && token && orders.length === 0) {
        const response = await getUserOrders(user.id, token)
        if (response) {
          setOrders(response.data.transactions)
        }
      }
    }

    fetchUserOrders()
  }, [user, token])

  return (
    <ConnectionProvider endpoint={endpoint!}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MyApp
