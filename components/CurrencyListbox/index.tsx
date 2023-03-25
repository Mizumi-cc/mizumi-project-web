import { Fragment } from "react"
import { Menu, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Image from "next/image"

export interface Currency {
  name: string
  symbol: string
  image: string
}

interface CurrencyMenuProps {
  currencies: Currency[]
  selectedCurrency: Currency
  onChange: (currency: Currency) => void
}

const CurrencyMenu = ({currencies, selectedCurrency, onChange}: CurrencyMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      <div className="relative mt-1">
        <Menu.Button className="relative w-full rounded-lg bg-transparent py-2 pl-3 pr-10 text-left sm:text-sm hover:bg-gray-100 hover:bg-opacity-20 cursor-pointer">
          <span className="block truncate text-white font-bold text-lg tracking-wider">{selectedCurrency.symbol}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute mt-1 max-h-60 w-56 overflow-auto rounded-lg bg-stone-400 py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {currencies.map((currency, currencyIdx) => (
              <Menu.Item
                key={currencyIdx}
              >
                {({ active }) => (
                  <button
                    onClick={() => onChange(currency)}
                    className={`flex flex-row items-center w-full px-4 space-x-3 py-2 ${active ? 'bg-gradient-to-r from-blue-400 to-yellow-500 bg-opacity-40' : 'bg-transparent'}`}
                  >
                    <Image 
                      src={currency.image}
                      alt={currency.name}
                      width={24}
                      height={24}
                    />
                    <span
                      className={`block truncate text-lg ${
                        active ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {currency.name}
                    </span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  )
}

export default CurrencyMenu
