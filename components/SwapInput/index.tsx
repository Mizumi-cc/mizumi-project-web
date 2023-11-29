import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import CurrencyListbox from "../CurrencyListbox"
import type { Currency } from "../CurrencyListbox"
import TokenBalance from "../TokenBalance"
import { PublicKey } from "@solana/web3.js"
import { useState } from "react"

interface SwapInputProps {
  label: string
  currencies: Currency[]
  selectedCurrency: Currency
  onCurrencyChange: (currency: Currency) => void
  value: number
  onValueChange: (value: number) => void
  dollarValue: number
  tokenBalance: number
  updateTokenBalance: (balance: number) => void
}

const SwapInput = ({
  currencies, 
  selectedCurrency, 
  onCurrencyChange, 
  value, 
  onValueChange, 
  dollarValue, 
  label,
  tokenBalance,
  updateTokenBalance
}: SwapInputProps) => {
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold text-white text-sm">{label}</p>
        {publicKey && selectedCurrency.symbol !== 'GHS' && (
          <div className="flex flex-row items-center space-x-2">
            <TokenBalance 
              connection={connection}
              mintAddress={new PublicKey(selectedCurrency.mintAddress!)}
              walletAddress={publicKey!}
              symbol={selectedCurrency.symbol}
              balance={tokenBalance}
              updateBalance={updateTokenBalance}
            />
            <button
              onClick={() => onValueChange(tokenBalance / 2)}
              className="uppercase text-white rounded-2xl px-[8px] py-[2px] border border-gray-500 text-[10px] font-semibold bg-stone-800"
            >
              half
            </button>
            <button
              onClick={() => onValueChange(tokenBalance)}
              className="uppercase text-white rounded-2xl px-[8px] py-[2px] border border-gray-500 text-[10px] font-semibold bg-stone-800"
            >
              max
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2 rounded-xl bg-[#060606] xl:p-2.5 p-2">
        <div className="col-span-1">
          <CurrencyListbox 
            selectedCurrency={selectedCurrency}
            currencies={currencies}
            onChange={onCurrencyChange}
          />
        </div>
        <div className="flex flex-col items-end lg:pr-0 pr-2 col-span-3">
          <input 
            value={value === 0 ? '' : value}
            onChange={e => onValueChange(parseFloat(e.target.value))}
            className="bg-transparent outline-none text-white text-right text-lg w-full"
            type={'number'}
            placeholder={'0.00'}
          />
          {(value !== 0 && !isNaN(dollarValue)) && <span className="text-gray-400 text-xs truncate w-[200px] text-right">
            {`$${dollarValue.toLocaleString('en-US', { maximumFractionDigits: 2})}`}</span>
          }
        </div>
      </div>
    </>
  )
}

export default SwapInput
