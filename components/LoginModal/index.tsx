import { FunctionComponent, Fragment, useState, useCallback } from "react"
import { Dialog, Transition } from "@headlessui/react"

import FormInput from "../FormInput"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const LoginModal: FunctionComponent<Props> = ({
  isOpen, onClose
}) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = () => {}

  const checkUsernameOrEmail = () => {
    if (usernameOrEmail.length === 0) return

    if (usernameOrEmail.includes('@') && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(usernameOrEmail)) {
      setError('')
    } else {
      setError('Please enter a valid email')
    }
  }

  const checkPassword = () => {
    if (password.length === 0) {
      setError('Please enter a password')
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters')
    } else {
      setError('')
    }
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
                className="w-fit transform overflow-hidden rounded-xl bg-stone-700 py-4 text-left align-middle shadow-xl transition-all min-w-[400px]"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg xl:text-2xl font-medium leading-6 text-white text-center"
                > 
                  Login
                </Dialog.Title>
                <div className="h-[1px] bg-gradient-to-r from-blue-400 to-yellow-500 mt-4" />
                <form
                  className="mt-10 space-y-6 flex flex-col px-6"
                  onClick={(e) => e.preventDefault()}
                >
                  <FormInput
                    label="Username/Email"
                    type="text"
                    placeholder="Username/Email"
                    value={usernameOrEmail}
                    onBlur={checkUsernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                  />
                  <FormInput
                    label="Password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onBlur={checkPassword}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error.length > 0 && (
                    <div className="text-red-500 text-sm font-medium">
                      {error}
                    </div>
                  )}
                </form>
                <div className="mt-10 px-6">
                  <button
                    type="button"
                    disabled={error.length > 0}
                    className={`bg-gradient-to-r ${error.length === 0 ? 'from-blue-400 to-yellow-500 p-[1px]' : ''} w-full h-[50px] rounded-lg`}
                    onClick={handleSubmit}
                  >
                    <div className="w-full h-full bg-black rounded-lg flex justify-center items-center text-white font-bold text-md">
                      Submit
                    </div>
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

export default LoginModal
