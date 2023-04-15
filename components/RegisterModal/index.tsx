import { FunctionComponent, Fragment, useState, useMemo } from "react"
import { Dialog, Transition } from "@headlessui/react"

import FormInput from "../FormInput"
import useAuthStore from "../../stores/auth"
import { RegisterForm, register } from "../../services/auth"
import Loading from "../Loading"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const RegisterModal: FunctionComponent<Props> = ({
  isOpen, onClose
}) => {
  const { setUser, setToken } = useAuthStore()
  const [busy, setBusy] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async() => {
    const form: RegisterForm = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    }
    const response = await register(form)
      .catch((err) => {
        setBusy(false)
        setErrors((prevState) => ({...prevState, register: err.response.data.message}))
      })
    if (response) {
      clearForm()
      setToken(response.data.token.token)
      setUser(response.data.user)
      sessionStorage.setItem('token', response.data.token.token)
      onClose()
    }
  }

  const clearForm = () => {
    setPassword('')
    setConfirmPassword('')
    setEmail('')
    setUsername('')
    setBusy(false)
  }

  const checkUsername = () => {
    if (username.length === 0 || username.length > 20) {
      setErrors((prevState) => ({...prevState, username: 'Username must be between 1 and 20 characters'}))
    } else if (username.length < 3) {
      setErrors((prevState) => ({...prevState, username: 'Username must be at least 4 characters'}))
    } else {
      setErrors((prevState) => ({...prevState, username: ''}))
    }
  }

  const checkEmail = () => {
    if (email.length === 0) return
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrors((prevState) => ({...prevState, email: ''}))
    } else {
      setErrors((prevState) => ({...prevState, email: 'Please enter a valid email'}))
    }
  }

  const checkPassword = () => {
    if (password.length === 0) {
      setErrors((prevState) => ({...prevState, password: 'Please enter a password'}))
    } else if (password.length < 8) {
      setErrors((prevState) => ({...prevState, password: 'Password must be at least 8 characters'}))
    } else {
      setErrors((prevState) => ({...prevState, password: ''}))
    }

    if (password !== confirmPassword) {
      setErrors((prevState) => ({...prevState, confirmPassword: 'Passwords do not match'}))
    } else {
      setErrors((prevState) => ({...prevState, confirmPassword: ''}))
    }
  }

  const disabled = useMemo(() => {
    if (Object.values(errors).every((error) => error === '')) {
      return false
    } else {
      return true
    }
  }, [errors])

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
                  Register
                </Dialog.Title>
                <div className="h-[1px] bg-gradient-to-r from-blue-400 to-yellow-500 mt-4" />
                <form
                  className="mt-2 space-y-2 flex flex-col px-6"
                  onClick={(e) => e.preventDefault()}
                >
                  <FormInput 
                    label="Username"
                    type="text"
                    placeholder="john.doe"
                    value={username}
                    onBlur={checkUsername}
                    onChange={(e) => setUsername(e.target.value)}
                  /> 
                  <FormInput 
                    label="Email"
                    type="text"
                    placeholder="someone@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={checkEmail}
                  />
                  <FormInput
                    label="Password" 
                    type="password"
                    placeholder="xxxxxxxxxxxxx"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormInput 
                    label="Confirm Password"
                    type="password"
                    placeholder="xxxxxxxxxxxxx"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={checkPassword}
                  />
                </form>
                <div className="mt-10 px-6">
                  <button
                    type="button"
                    disabled={disabled || busy}
                    className={`bg-gradient-to-r ${Object.keys(errors).length > 0 ? 'from-blue-400 to-yellow-500 p-[1px]' : ''} w-full h-[50px] rounded-lg`}
                    onClick={handleSubmit}
                  >
                    <div className="w-full h-full bg-black rounded-lg flex justify-center items-center text-white font-bold text-md">
                      {busy ? <Loading /> : 'Submit'}
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

export default RegisterModal
