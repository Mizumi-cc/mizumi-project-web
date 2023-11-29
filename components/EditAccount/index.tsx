import { FunctionComponent, useState, useMemo } from "react"
import { ChevronLeftIcon } from "@heroicons/react/20/solid"

// components
import FormInput from "../FormInput"
import Loading from "../Loading"

// services, stores
import useAuthStore from "../../stores/auth"
import useAlertStore from "../../stores/alerts"
import { isUniqueUsernameOrEmail, changePassword, updateProfile } from "../../services/auth"

interface Props {
  goBack: () => void
}

const EditAccount: FunctionComponent<Props> = ({ goBack }) => {
  const { user, token, refreshUser } = useAuthStore()
  const { addAlert } = useAlertStore()
  const [busy, setBusy] = useState<boolean>(false)
  const [btnLabel, setBtnLabel] = useState<string>('Save')
  const [username, setUsername] = useState<string>(user!.username)
  const [email, setEmail] = useState<string>(user!.email)
  const [password, setPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const checkUsername = async() => {
    if (username.length === 0 || username.length > 20) {
      setErrors((prevState) => ({...prevState, username: 'Username must be between 1 and 20 characters'}))
      return
    } else if (username.length < 3) {
      setErrors((prevState) => ({...prevState, username: 'Username must be at least 4 characters'}))
      return
    } else {
      setErrors((prevState) => ({...prevState, username: ''}))
    }
    const response = await isUniqueUsernameOrEmail(username)
    if (!response.data.isUnique) {
      setErrors((prevState) => ({...prevState, username: 'Username is already taken'}))
    }
  }

  const checkPassword = () => {
    if (newPassword.length === 0) {
      setErrors((prevState) => ({...prevState, newPassword: 'Please enter a password'}))
    } else if (newPassword.length < 8) {
      setErrors((prevState) => ({...prevState, newPassword: 'Password must be at least 8 characters'}))
    } else {
      setErrors((prevState) => ({...prevState, newPassword: ''}))
    }

    if (newPassword !== confirmNewPassword) {
      setErrors((prevState) => ({...prevState, confirmNewPassword: 'Passwords do not match'}))
    } else {
      setErrors((prevState) => ({...prevState, confirmNewPassword: ''}))
    }
  }

  const handleSave = async() => {
    checkUsername()
    checkPassword()

    setBusy(true)
    if (username !== user?.username) {
      await updateProfile(token!, { username })
        .then(() => {
          refreshUser(token!)
          setBtnLabel('Saved')
          setBusy(false)   
        })
       .catch(() => {
          setBusy(false)
          addAlert({ type: 'error', text: 'An error occurred, failed to update username. Please try again later.' })
       })
    } else if (password.length > 0 && newPassword.length > 0) {
      await changePassword(token!, password, newPassword)
        .then(() => {
          setBtnLabel('Saved')
          setBusy(false)   
        })
        .catch((e) => {
          setBusy(false)
          if (e.response.data === 'Invalid credentials') {
            addAlert({ type: 'error', text: 'Invalid credentials, please try again.' })
          } else {
            addAlert({ type: 'error', text: 'An error occurred, failed to update password. Please try again later.' })
          }
        })
    }  
  }

  const disabled = useMemo(() => {
    if (user?.username !== username || (password.length > 0 && newPassword.length > 0 && newPassword === confirmNewPassword)) {
      return false
    } else if (user?.username === username || password.length === 0) {
      return true
    } else if (Object.values(errors).every((error) => error === '')) {
      return false
    } else {
      return true
    }
  }, [errors, username, password, newPassword, confirmNewPassword, user?.username])

  return (
    <div
      className="pt-4"
    >
      <button
        onClick={goBack}
        className="flex flex-row items-center"
      >
        <ChevronLeftIcon className="text-black w-8"/>
        <p
          className="text-3xl font-thin underline text-black"
        >
          Edit Account
        </p>
      </button>
      <div className="h-[510px] overflow-y-scroll no-scrollbar">
        <div className="flex flex-col space-y-2 mt-4">
          <FormInput 
            label='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            errors={errors.username}
            onBlur={checkUsername}
            darkBg={false}
          />
          <FormInput 
            label="Email"
            type="email"
            value={email}
            onChange={() => setEmail(email)}
            errors={errors.email}
            darkBg={false}
          />
        </div>
        <div className="w-full h-[1px] border border-dashed border-black mt-6 mb-4"/>
        <div className="flex flex-col space-y-2">
          <FormInput 
            label="Current Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errors={errors.password}
            darkBg={false}
            placeholder="***********"
          />
          <FormInput 
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            errors={errors.newPassword}
            darkBg={false}
            placeholder="***********"
          />
          <FormInput 
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            errors={errors.confirmNewPassword}
            darkBg={false}
            placeholder="***********"
            onBlur={checkPassword}
          />
        </div>
        <button
          onClick={handleSave}
          disabled={disabled || busy}
          className={`w-full py-3 text-white ${disabled ? 'bg-gray-700' : 'bg-blue-500'} rounded-md mt-5`}
        >
          {busy ? <Loading size="loading-md"/> : btnLabel}
        </button>
      </div>
    </div>
  )
}

export default EditAccount
