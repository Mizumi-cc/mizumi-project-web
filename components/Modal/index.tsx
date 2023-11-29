import { FunctionComponent, Fragment } from "react"
import { XCircleIcon } from "@heroicons/react/20/solid"
import { Dialog, Transition } from "@headlessui/react"

interface Props {
  isOpen: boolean
  onClose: () => void
  canBeDismissed?: boolean
  children: React.ReactNode
}

const Modal: FunctionComponent<Props> = ({ isOpen, onClose, children, canBeDismissed = true }) => {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className={"relative z-10"}
        onClose={canBeDismissed ? onClose : () => {}}
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
        <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-25 backdrop-blur-sm">
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
              <Dialog.Panel
                className={`xl:w-1/3 lg:w-2/5 w-[400px] lg:h-[600px] transform overflow-hidden rounded-xl bg-white py-4 text-left align-middle shadow-xl transition-all px-4 pt-4`}
              >
                <button
                  onClick={onClose}
                  className="absolute top-1 right-1 ring-0 focus:outline-none"
                >
                  <XCircleIcon className="w-10 text-black"/>
                </button>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
