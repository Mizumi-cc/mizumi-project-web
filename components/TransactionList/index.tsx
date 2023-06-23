import { FunctionComponent } from "react"
import Image from "next/image"
import { ArrowsRightLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid"

import { CURRENCIES } from "../../utils/constants"

interface Props {
  data: Record<string, string>[]
}

const TransactionList: FunctionComponent<Props> = ({
  data
}) => {
  return (
    <div className="overflow-x-auto space-y-3 h-[300px] no-scrollbar">
      {data.map((transaction, index) => (
        <Transaction
          key={index}
          transaction={transaction}
        />
      ))}
      {data.map((transaction, index) => (
        <Transaction
          key={index}
          transaction={transaction}
        />
      ))}
      {data.map((transaction, index) => (
        <Transaction
          key={index}
          transaction={transaction}
        />
      ))}
    </div>
  )
}

interface TransactionProps {
  transaction: Record<string, string>
}

const Transaction: FunctionComponent<TransactionProps> = ({transaction}) => (
  <div className="space-y-1">
    <div className="flex flex-row items-center justify-between">
      <span className="flex flex-row items-center space-x-2">
        <ArrowsRightLeftIcon className="w-4 text-black" />
        <p className="text-sm text-black font-medium">Swapped</p>
      </span>
      <p className="text-black text-sm">
        {transaction.date}
      </p>
    </div>
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center space-x-1">
        <Currencies
          from={transaction.from}
          to={transaction.to}
        />
        <div>
          <span
            className="flex flex-row items-center space-x-1"
          >
            <p
              className="text-black font-semibold"
            >{transaction.from}</p>
            <ArrowRightIcon className="w-4 text-black"/>
            <p
              className="text-black font-semibold"
            >{transaction.to}</p>
          </span>
          <p
            className="text-black text-sm"
          >Received {transaction.to}</p>
        </div>
      </div>
      <div
        className="flex flex-col items-end"
      >
        <p className="text-green-600 font-semibold">+{transaction.toAmount}</p>
        <p className="text-gray-600 text-sm">-{transaction.fromAmount}</p>
      </div>
    </div>
  </div>
)

interface CurrencyProps {
  from: string
  to: string
}

const Currencies: FunctionComponent<CurrencyProps> = ({from, to}) => {
  const fromCurrency = CURRENCIES.find(currency => currency.symbol === from)
  const toCurrency = CURRENCIES.find(currency => currency.symbol === to)

  return (
    <div className="relative mb-6 w-[45px]">
      <div
        className="rounded-full bg-blue-600 w-fit h-fit p-1"
      >
        <Image 
          src={fromCurrency!.image}
          alt={fromCurrency!.name}
          width={22}
          height={22}
        />
      </div>
      <div
        className="rounded-full w-fit h-fit bg-blue-600 p-1 absolute -bottom-4 left-3"
      >
        <Image 
          src={toCurrency!.image}
          alt={toCurrency!.name}
          width={22}
          height={22}
        />
      </div>
    </div>
  )
}

export default TransactionList
