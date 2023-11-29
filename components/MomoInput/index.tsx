import { FunctionComponent, Fragment } from "react"
import { motion } from "framer-motion"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"


interface Props {
  phone: string
  onPhoneChange: (phone: string) => void
  name: string
  onNameChange: (name: string) => void
  network: string
  onNetworkChange: (network: string) => void
}

const NETWORKS = [
  { name: 'MTN', value: 'MTN' },
  { name: 'Vodafone', value: 'VODAFONE' },
  { name: 'AirtelTigo', value: 'AIRTELTIGO' },
]

const MomoInput: FunctionComponent<Props> = ({
  phone, name, onPhoneChange, onNameChange, network, onNetworkChange
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col space-y-4"
    >
      <Listbox value={network} onChange={onNetworkChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-black text-white py-4 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{network}</span>
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
              {NETWORKS.map((network, networkIdx) => (
                <Listbox.Option
                  key={networkIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gradient-to-r from-blue-400 to-yellow-500  text-white' : 'text-gray-900'
                    }`
                  }
                  value={network.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {network.value}
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
        value={phone}
        placeholder="Enter phone number"
        onChange={(e) => onPhoneChange(e.target.value)}
        className="rounded-lg bg-black xl:text-lg text-base xl:py-4 py-3 text-white outline-none px-3 sm:text-sm font-medium"
      />
      <input 
        value={name}
        placeholder="Enter name"
        onChange={(e) => onNameChange(e.target.value)}
        className="rounded-lg bg-black xl:py-4 py-3 xl:text-lg text-base text-white outline-none px-3 sm:text-sm font-medium"
      />
    </motion.div>
  )
}

export default MomoInput
