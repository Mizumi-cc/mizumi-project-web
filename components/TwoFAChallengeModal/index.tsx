import { FunctionComponent, useState } from "react"

// components
import Modal from "../Modal"
import FormInput from "../FormInput"
import Loading from "../Loading"

// services, storees
import useAuthStore from "../../stores/auth"
import useAlertStore from "../../stores/alerts"
import useGlobalModalsStore from "../../stores/globalModals"
import { twoFactorChallenge } from "../../services/auth"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const TwoFAChallengeModal: FunctionComponent<Props> = ({ isOpen, onClose }) => {
  const { user, token, setUser, setToken } = useAuthStore()
  const { toggle2FAChallengeModal } = useGlobalModalsStore()
  const { addAlert } = useAlertStore()
  const [isRecoveryCode, setIsRecoveryCode] = useState<boolean>(false)
  const [busy, setBusy] = useState<boolean>(false)
  const [otp, setOtp] = useState<string>('')

  const verifyCode = async() => {
    setBusy(true)
    const response = await twoFactorChallenge({ 
      code: isRecoveryCode ? undefined : otp, 
      recoveryCode: isRecoveryCode ? otp : undefined,
      id: sessionStorage.getItem('id')!,
     })
      .then((res) => res.data)
      .catch((err) => {
        setBusy(false)
        addAlert({
          type: 'error',
          text: 'Something went wrong. Please try again later'
        })
      })

    if (response) {
      setToken(response.token.token)
      setUser({
        id: response.user.id,
        username: response.user.username,
        email: response.user.email,
        walletAddress: response.user.wallet_address,
        createdAt: response.user.created_at,
        updatedAt: response.user.updated_at,
        twoFactorEnabled: response.twoFactorEnabled
      })
      sessionStorage.setItem('token', response.token.token)
      setBusy(false)
      setOtp('')
      toggle2FAChallengeModal()
    }
  }


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      canBeDismissed={false}
    >
      <div
        className="flex flex-col justify-center items-center h-full"
      >
        <p
          className="text-2xl font-bold text-center mb-8"
        >
          2FA
        </p>
        <p
          className="text-center md:w-2/3"
        >
          {isRecoveryCode ? (
            'Enter one of your recovery codes to continue. Once used that code will be invalidated.'
          ): (
            'Enter the code from your authenticator app'
          )}
        </p>
        <div
          className="md:w-2/3 mt-6 w-full"
        >
          <FormInput 
            label="Code"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="number"
            darkBg={false}
          />
        </div>
        <button
          disabled={otp.length !== 6}
          onClick={verifyCode}
          className="bg-blue-600 rounded-md px-4 py-2 text-white font-semibold mt-4 md:w-2/3 w-full"
        >
          {busy ? (
            <Loading size="loading-sm" />
          ) : (
            'Verify'
          )}
        </button>
        <button
          onClick={() => setIsRecoveryCode(!isRecoveryCode)}
          className="bg-white rounded-md px-4 py-2 text-black font-semibold mt-2 md:w-2/3 border border-black w-full"
        >
          {isRecoveryCode ? (
            'Use Authenticator Code'
          ) : (
            'Use Recovery Code'
          )}
        </button>
      </div>
    </Modal>
  )
}

export default TwoFAChallengeModal
