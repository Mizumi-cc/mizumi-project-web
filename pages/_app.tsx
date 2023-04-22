import { useMemo, useEffect } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import { clusterApiUrl } from '@solana/web3.js'
import useAuthStore from '../stores/auth'
import { fetchAuthenticatedUser } from '../services/auth'

require('@solana/wallet-adapter-react-ui/styles.css')

function MyApp({ Component, pageProps }: AppProps) {
  const { setUser, setToken } = useAuthStore()
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [],
    []
  )

  useEffect(() => {
    async function checkForToken() {
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

    checkForToken()
  }, [])

  

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MyApp
