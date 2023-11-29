import { FunctionComponent, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/20/solid"

const options = [
  { name: 'Bank', value: 'bank', description: 'Instantpay transfers to Ghanaian bank accounts' },
  { name: 'Mobile Money', value: 'momo', description: 'MTN, Vodafone, AirtelTigo' },
]

interface Props {
  onSubmit: (option: string) => void
}

const PayoutMethods: FunctionComponent<Props> = (
  { onSubmit }
) => {
  const [selected, setSelected] = useState(options[1])

  return (
    <div className="w-full py-2">
      <div className="mx-auto w-full">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Payout Method</RadioGroup.Label>
          <div className="space-y-2">
            {options.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                disabled={option.value === 'bank'}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg lg:px-5 px-3 lg:py-4 py-2 shadow-md focus:outline-none`
                }
              >
                {({ active, checked, disabled }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {option.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                              {disabled ? 'Coming soon' : option.description}
                            </span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <button
        onClick={() => onSubmit(selected.value)}
        className="max-w-md mx- w-full bg-gradient-to-r from-blue-400 to-yellow-500 text-white px-4 py-2 rounded-lg mt-8 h-[48px]"
      >
        Continue
      </button>
    </div>
  )
}

export default PayoutMethods
