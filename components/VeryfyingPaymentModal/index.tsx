import { FunctionComponent, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

import Loading from "../Loading"

interface Props {
  isOpen: boolean
  onClose: () => void
  verified: boolean
}

const VeryfyingPayment: FunctionComponent<Props> = ({ isOpen, onClose, verified }) => {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className={"relative z-10"}
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white lg:p-6 p-4 text-left align-middle shadow-xl transition-all h-[200px] flex flex-col items-center">
                <div
                  className="text-xl font-medium leading-6 text-gray-900 lg:mb-10 mb-4"
                >
                  {verified ? "Payment Verified" : "Verifying Payment"}
                </div>
                {!verified && (
                  <p>
                    Please wait...
                  </p>
                )}
                {verified && (
                  <div>
                    <p className="text-center">
                      Your payment has been verified. You should receive a prompt to complete the on-chain transfer.
                    </p>
                  </div>
                )}


                {verified && (
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      Okay
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default VeryfyingPayment