import { FunctionComponent, Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XCircleIcon } from "@heroicons/react/20/solid"

//components
import EditAccount from "../EditAccount"
import UserDetails from "../UserDetails"
import UserTransactions from "../UserTransactions"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AccountModal: FunctionComponent<Props> = (
  { isOpen, onClose }
) => {
  const [editing, setEditing] = useState(false)

  const onEditClick = () => {
    setEditing(true)
  }

  const handleClose = () => {
    onClose()
    setEditing(false)
  }

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
                className={`md:w-1/2 w-[400px] lg:h-[600px] transform overflow-hidden rounded-xl bg-white py-4 text-left align-middle shadow-xl transition-all px-4 pt-4`}
              >
                <button
                  onClick={handleClose}
                  className="absolute top-1 right-1 ring-0 focus:outline-none"
                >
                  <XCircleIcon className="w-10 text-black"/>
                </button>
                {!editing ? (
                  <>
                    <UserDetails
                      onEditClick={onEditClick}
                    />
                    <div className="h-10"/>
                    <UserTransactions />
                  </>
                ) : (
                  <EditAccount 
                    goBack={() => setEditing(false)}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AccountModal
