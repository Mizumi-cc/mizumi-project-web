import CurrencyListbox from "../CurrencyListbox"
import type { Currency } from "../CurrencyListbox"

interface SwapInputProps {
  label: string
  currencies: Currency[]
  selectedCurrency: Currency
  onCurrencyChange: (currency: Currency) => void
  value: number
  onValueChange: (value: number) => void
  dollarValue: number
}

const SwapInput = ({
  currencies, selectedCurrency, 
  onCurrencyChange, value, onValueChange, 
  dollarValue, label
}: SwapInputProps) => {
  return (
    <>
      <p className="font-bold text-white text-sm">{label}</p>
      <div className="flex flex-row items-center justify-between rounded-xl bg-[#060606] xl:p-2.5 p-2">
        <CurrencyListbox 
          selectedCurrency={selectedCurrency}
          currencies={currencies}
          onChange={onCurrencyChange}
        />
        <div className="flex flex-col items-end lg:pr-0 pr-2">
          <input 
            value={value === 0 ? '' : value}
            onChange={e => onValueChange(parseFloat(e.target.value))}
            className="bg-transparent outline-none text-white text-right text-lg"
            type={'number'}
            placeholder={'0.00'}
          />
          {(value !== 0 && !isNaN(dollarValue)) && <span className="text-gray-400 text-xs">
            {`$${dollarValue.toLocaleString('en-US', { maximumFractionDigits: 2})}`}</span>}
        </div>
      </div>
    </>
  )
}

export default SwapInput
