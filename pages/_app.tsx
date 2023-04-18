import { useMemo, useEffect } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets'
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
    () => [
      new UnsafeBurnerWalletAdapter()
    ],
    []
  )

  useEffect(() => {
    async function checkForToken() {
      const token = sessionStorage.getItem('token')
      if (token) {
        const response = await fetchAuthenticatedUser(token)
        if (response) {
          setUser(response.data.user)
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
