import { useState, useEffect } from "react"
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { AnimatePresence } from "framer-motion"
import { PublicKey } from "@solana/web3.js"

import SwapInput from "../SwapInput"
import CurrencyListbox from "../CurrencyListbox"
import { CURRENCIES } from "../../utils/constants"
import { Currency } from "../CurrencyListbox"
import type { Bank } from "../BankInfoInput"
import BankInfoInput from "../BankInfoInput"
import WalletInput from "../WalletInput"

interface SwapBoxProps {
  openPaymentDetailsMModal: () => void
}

const SwapBox = ({ openPaymentDetailsMModal }: SwapBoxProps) => {
  const { connected } = useWallet()
  const { setVisible } = useWalletModal()

  const [inputValue, setInputValue] = useState(0)
  const [debitCurrency, setDebitCurrency] = useState<Currency>(CURRENCIES[0])
  const [creditCurrency, setCreditCurrency] = useState<Currency>(CURRENCIES[1])
  const [selectedBank, setSelectedBank] = useState<Bank>(banks[1])
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [addressIsValid, setAddressIsValid] = useState(false)
  const [creditAddress, setCreditAddress] = useState<string>('')

  const handleSwapOrConnectClick = () => {
    if (!connected) {
      setVisible(true)
    }
  }

  const switchCurrencies = () => {
    setDebitCurrency(creditCurrency)
    setCreditCurrency(debitCurrency)
  }

  useEffect(() => {
    try {
      new PublicKey(creditAddress)
      setAddressIsValid(true)
    } catch (error) {
      setAddressIsValid(false)
    }
  }, [creditAddress])

  return ( 
    <div className="flex-col space-y-4">
      <div className="flex-col space-y-3 px-6 pt-4 pb-10 w-[448px] bg-stone-700 rounded-xl shadow-md">
        <SwapInput 
          currencies={CURRENCIES.filter(currency => currency !== creditCurrency)}
          selectedCurrency={debitCurrency!}
          onCurrencyChange={setDebitCurrency}
          value={inputValue}
          onValueChange={setInputValue}
          dollarValue={0}
          label={'You pay'}
        />
        <div className="flex justify-center items-center">
          <button
            className="bg-neutral-800 rounded-full p-[6px] border hover:border-black border-transparent"
            onClick={switchCurrencies}
          >
            <ArrowsUpDownIcon 
              className="h-5 w-5 text-gray-400" 
              aria-hidden="true"
            />
          </button>
        </div>
        <p className="text-white font-bold text-sm">You receive</p>
        <div className="w-fit">
          <CurrencyListbox 
            currencies={CURRENCIES.filter(currency => currency !== debitCurrency)}
            selectedCurrency={creditCurrency!}
            onChange={setCreditCurrency}
          />
        </div>
        <p className="text-white font-bold text-sm">Payout Info</p>
        <AnimatePresence>
          {creditCurrency?.name === 'Ghana Cedi' && (
            <BankInfoInput 
              banks={banks}
              selectedBank={selectedBank}
              onBankChange={setSelectedBank}
              accountNumber={accountNumber}
              onAccountNumberChange={setAccountNumber}
              accountName={accountName}
              onAccountNameChange={setAccountName}
            />
          )}
          {creditCurrency?.name !== 'Ghana Cedi' && (
            <WalletInput 
              address={creditAddress}
              isValid={addressIsValid}
              onChange={setCreditAddress}
            />
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={handleSwapOrConnectClick}
        className={`w-[448px] bg-gradient-to-r ${connected ? 'from-blue-400 to-yellow-500 p-[1px]' : ''} rounded-lg h-[58px] `}
      >
        <div className="w-full h-full bg-black rounded-lg flex justify-center items-center">
          <p className="text-white font-bold text-md">{connected ? 'Swap' : 'Connect Wallet'}</p>
        </div>
      </button>
    </div>
  )
}

const banks: Bank[] = [
  {
    "name": "ABSA BANK GHANA LIMITED",
    "shortName": "ABSA",
    "bankCode": "300303"
},
{
    "name": "ACCESS BANK LTD",
    "shortName": "ACCESS",
    "bankCode": "300329"
},
{
    "name": "AGRICULTURAL DEVELOPMENT BANK",
    "shortName": "ADB",
    "bankCode": "300307"
},
{
    "name": "AIRTELTIGO MONEY",
    "shortName": "AIRTELTIGO",
    "bankCode": "300592"
},
{
    "name": "ARB APEX BANK LIMITED",
    "shortName": "ARB APEX",
    "bankCode": "300306"
},
{
    "name": "BANK OF AFRICA",
    "shortName": "BANK OF AFRICA",
    "bankCode": "300320"
},
{
    "name": "BANK OF GHANA",
    "shortName": "BOG",
    "bankCode": "300328"
},
{
    "name": "CONSOLIDATED BANK GHANA",
    "shortName": "CBG",
    "bankCode": "300331"
},
{
    "name": "DALEX FINANCE AND LEASING COMPANY",
    "shortName": "DALEX",
    "bankCode": "300496"
},
{
    "name": "ECOBANK GHANA LTD",
    "shortName": "ECOBANK",
    "bankCode": "300312"
},
{
    "name": "ETRANZACT",
    "shortName": "ETRANZACT",
    "bankCode": "300380"
},
{
    "name": "FIDELITY BANK LIMITED",
    "shortName": "FIDELITY",
    "bankCode": "300323"
},
{
    "name": "FIRST ATLANTIC BANK",
    "shortName": "FAB",
    "bankCode": "300316"
},
{
    "name": "FIRST BANK OF NIGERIA",
    "shortName": "FBN",
    "bankCode": "300319"
},
{
    "name": "GCB BANK LIMITED",
    "shortName": "GCB",
    "bankCode": "300304"
},
{
    "name": "GHL Bank",
    "shortName": "GHL Bank",
    "bankCode": "300362"
},
{
    "name": "GUARANTY TRUST BANK",
    "shortName": "GT BANK",
    "bankCode": "300322"
},
{
    "name": "MTN MOBILE MONEY",
    "shortName": "MTN",
    "bankCode": "300591"
},
{
    "name": "NATIONAL INVESTMENT BANK",
    "shortName": "NIB",
    "bankCode": "300305"
},
{
    "name": "OPPORTUNITY INTERNALTIONAL SAVINGS AND LOANS",
    "shortName": "OPPORTUNITY INT SL",
    "bankCode": "300349"
},
{
    "name": "PRUDENTIAL BANK LTD",
    "shortName": "PRUDENTIAL",
    "bankCode": "300317"
},
{
    "name": "REPUBLIC BANK LIMITED",
    "shortName": "REPUBLIC",
    "bankCode": "300310"
},
{
    "name": "SAHEL - SAHARA BANK (BSIC)",
    "shortName": "SAHEL",
    "bankCode": "300324"
},
{
    "name": "SERVICES INTEGRITY SAVINGS & LOANS",
    "shortName": "SERVICES INT SL",
    "bankCode": "300361"
},
{
    "name": "SOCIETE GENERALE GHANA",
    "shortName": "SG-GH",
    "bankCode": "300308"
},
{
    "name": "STANBIC BANK",
    "shortName": "STANBIC",
    "bankCode": "300318"
},
{
    "name": "STANDARD CHARTERED BANK",
    "shortName": "STANCHART",
    "bankCode": "300302"
},
{
    "name": "UNITED BANK OF AFRICA",
    "shortName": "UBA",
    "bankCode": "300325"
},
{
    "name": "UNIVERSAL MERCHANT BANK",
    "shortName": "UMB",
    "bankCode": "300309"
},
{
    "name": "VODAFONE CASH",
    "shortName": "VODAFONE",
    "bankCode": "300594"
},
{
    "name": "ZENITH BANK GHANA LTD",
    "shortName": "ZENITH",
    "bankCode": "300311"
}
]

export default SwapBox
