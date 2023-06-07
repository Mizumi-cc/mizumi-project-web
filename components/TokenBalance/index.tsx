import { FunctionComponent, useEffect, useCallback} from "react"
import { BanknotesIcon } from "@heroicons/react/20/solid"
import { getAssociatedTokenAddressSync } from "@solana/spl-token"
import { Connection, PublicKey } from "@solana/web3.js"

interface Props {
  connection: Connection
  mintAddress: PublicKey
  walletAddress: PublicKey
  symbol: string
  balance: number
  updateBalance: (balance: number) => void
}

const TokenBalance: FunctionComponent<Props> = ({ 
  mintAddress, walletAddress, connection, symbol, updateBalance, balance
}) => {

  const fetchBalance = useCallback(async () => {
    const tokenAddress = getAssociatedTokenAddressSync(mintAddress, walletAddress, true)
    await connection.getTokenAccountBalance(tokenAddress)
      .then((res) => {
        updateBalance(res.value.uiAmount!)
      })
      .catch((err) => {
        updateBalance(0)
        console.log(err)
      })
  }, [connection, walletAddress, mintAddress, updateBalance])

  useEffect(() => {
    fetchBalance()
  }, [walletAddress, fetchBalance])

  return (
    <div className="flex flex-row items-center space-x-1">
      <BanknotesIcon
        className="w-3 h-3 text-white text-opacity-50"    
      />
      <p className="text-white text-opacity-50 text-xs font-medium">{balance} {symbol}</p>
    </div>
  )
}

export default TokenBalance
