import { FunctionComponent, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import type { Order } from "../../utils/models"
import { TRANSACTIONKIND } from "../../utils/enums"

interface Props {
  order: Order | null
  isOpen: boolean
  status: string
  onClose: () => void
}

interface Map {
  [key: string]: string
}

const TITLEMATRIX: Map = {
  success: "Payment Successful",
  expired: "Payment Expired",
  error: "Payment Failed"
}

const DESCRIPTIONMATRIX: Map = {
  success: "Your payment has been successfully submitted.",
  expired: "Your payment has expired. Please try again.",
  error: "Your payment has failed. Please try again."
}


const PaymentStatusModal: FunctionComponent<Props> = ({
  isOpen, onClose, status, order
}) => {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className={"relative z-10"}
        onClose={onClose}
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {TITLEMATRIX[status]}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {DESCRIPTIONMATRIX[status]} {order?.kind === TRANSACTIONKIND.ONRAMP && 'You should receive a prompt to complete the on-chain transfer.'}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PaymentStatusModal
