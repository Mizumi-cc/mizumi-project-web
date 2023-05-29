import { FunctionComponent, Fragment, useState, useMemo } from "react"
import { Dialog, Transition } from "@headlessui/react"

import FormInput from "../FormInput"
import useAuthStore from "../../stores/auth"
import { LoginForm, login } from "../../services/auth"
import Loading from "../Loading"
import useAlertStore from "../../stores/alerts"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const LoginModal: FunctionComponent<Props> = ({
  isOpen, onClose
}) => {
  const { setUser, setToken, setShowRegisterModal } = useAuthStore()
  const { addAlert } = useAlertStore()
  const [busy, setBusy] = useState<boolean>(false)
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async() => {
    checkPassword()
    checkUsernameOrEmail()

    console.log(errors)
    if (Object.keys(errors).length > 0) {
      addAlert({
        type: 'info',
        text: 'Please fill the form correctly'
      })
      return
    }
    setBusy(true)
    const form = generateForm()
    const response = await login(form)
      .catch((err) => {
        setBusy(false)
      })
    if (response) {
      clearForm()
      setToken(response.data.token.token)
      setUser({
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        walletAddress: response.data.user.wallet_address,
        createdAt: response.data.user.created_at,
        updatedAt: response.data.user.updated_at
      })
      sessionStorage.setItem('token', response.data.token.token)
      onClose()
    }
  }

  const handleClose = () => {
    clearForm()
    onClose()
  }

  const clearForm = () => {
    setPassword('')
    setUsernameOrEmail('')
    setErrors({})
    setBusy(false)
  }

  const generateForm = () => {
    const form: LoginForm = {
      email: undefined,
      username: undefined,
      password: ''
    }
    if (usernameOrEmail.includes('@')) {
      form['email'] = usernameOrEmail.trim()
    } else {
      form['username'] = usernameOrEmail.trim()
    }
    form['password'] = password
    return form
  }

  const checkUsernameOrEmail = () => {
    if (usernameOrEmail.length === 0) return

    if (usernameOrEmail.includes('@') && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(usernameOrEmail)) {
      setErrors((prevState) => ({...prevState, email: ''}))
    } else if (!usernameOrEmail.includes('@')) {
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
  }

  const disabled = useMemo(() => {
    if (Object.values(errors).every((error) => error === '')) {
      return false
    } else {
      return true
    }
  }, [errors])

  const openRegisterModal = () => {
    setShowRegisterModal(true)
    onClose()
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
        onClose={handleClose}
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
                  className="mt-2 space-y-2 flex flex-col px-6"
                  onClick={(e) => e.preventDefault()}
                >
                  <FormInput
                    label="Username/Email"
                    type="text"
                    placeholder=""
                    value={usernameOrEmail}
                    onBlur={checkUsernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                  />
                  <FormInput
                    label="Password"
                    type="password"
                    placeholder="xxxxxxxxxxxx"
                    value={password}
                    onBlur={checkPassword}
                    onChange={(e) => setPassword(e.target.value)}
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
                <div className="flex flex-row items-center justify-between px-6 mt-2 mb-6">
                  <p className="text-white text-sm font-medium">New here?</p>
                  <button
                    onClick={openRegisterModal}
                    className="text-white text-sm font-medium"
                  >
                    Create account
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
