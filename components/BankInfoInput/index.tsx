import { FunctionComponent } from "react"
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { motion } from "framer-motion"

export interface Bank {
  name: string
  shortName: string
  bankCode: string
}

interface Props {
  banks: Bank[]
  selectedBank: Bank
  onBankChange: (bank: Bank) => void
  accountNumber: string
  onAccountNumberChange: (accountNumber: string) => void
  accountName: string
  onAccountNameChange: (accountName: string) => void
}

const BankInfoInput: FunctionComponent<Props> = ({
  banks,
  selectedBank,
  onBankChange,
  accountNumber,
  onAccountNumberChange,
  accountName,
  onAccountNameChange,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col space-y-4"
    >
      <Listbox value={selectedBank} onChange={onBankChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-black text-white py-4 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedBank.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {banks.map((bank, bankIdx) => (
                <Listbox.Option
                  key={bankIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gradient-to-r from-blue-400 to-yellow-500  text-white' : 'text-gray-900'
                    }`
                  }
                  value={bank}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {bank.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <input 
        type="number"
        max={13}
        className="rounded-lg bg-black py-4 text-white outline-none px-3 sm:text-sm font-medium"
        value={accountNumber}
        onChange={e => onAccountNumberChange(e.target.value)}
      />
      <input 
        type="text"
        className="rounded-lg bg-black py-4 text-white outline-none px-3 sm:text-sm font-medium"
        value={accountName}
        onChange={e => onAccountNameChange(e.target.value)}
      />
    </motion.div>
  )
}

export default BankInfoInput
