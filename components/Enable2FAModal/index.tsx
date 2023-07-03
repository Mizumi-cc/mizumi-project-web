import { FunctionComponent, useState, useEffect } from "react"
import { ClipboardIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid"
import Image from "next/image"

//components
import Loading from "../Loading"
import Modal from "../Modal"
import FormInput from "../FormInput"

// services, stores, utils
import useAuthStore from "../../stores/auth"
import useAlertStore from "../../stores/alerts"
import { enableTwoFactor, fetchTwoFactorRecoveryCodes, twoFactorChallenge } from "../../services/auth"
import useGlobalModalsStore from "../../stores/globalModals"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const Enable2FAModal: FunctionComponent<Props> = ({ isOpen, onClose }) => {
  const { user, token } = useAuthStore()
  const { addAlert } = useAlertStore()
  const [busy, setBusy] = useState<boolean>(true)
  const [secret, setSecret] = useState<string>('')
  const [svg, setSvg] = useState<string>('')
  const [showVerify, setShowVerify] = useState<boolean>(false)
  const [showBackupCodes, setShowBackupCodes] = useState<boolean>(false)
  const [otp, setOtp] = useState<string>('')
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([])

  const getTwoFactorCodes = async() => {
    const response = await enableTwoFactor(token!)
      .then((res) => res.data)
      .catch((err) => {
        addAlert({
          type: 'error',
          text: 'Something went wrong. Please try again later'
        })
      })
    setSecret(response.code.secret)
    setSvg(response.code.svg)
    setBusy(false)
  }

  const verifyCode = async() => {
    const response = await twoFactorChallenge({ code: otp, id: user!.email })
      .then((res) => res.data)
      .catch((err) => {
        addAlert({
          type: 'error',
          text: 'Something went wrong. Please try again later'
        })
      })
    if (response) {
      addAlert({
        type: 'success',
        text: '2FA enabled successfully'
      })
      setShowVerify(false)
      setShowBackupCodes(true)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(secret)
    addAlert({
      type: 'info',
      text: 'Code copied to clipboard'
    })
  }

  const copyRecoveryCodes = () => {
    navigator.clipboard.writeText(recoveryCodes.join('\n'))
    addAlert({
      type: 'info',
      text: 'Recovery codes copied to clipboard'
    })
  }

  const handleClose = () => {
    onClose()
    useGlobalModalsStore.getState().toggleAccountModal()
  }

  const getRecoveryCodes = async() => {
    const response = await fetchTwoFactorRecoveryCodes(token!)
      .then((res) => res.data)
      .catch((err) => {
        addAlert({
          type: 'error',
          text: 'Something went wrong. Please try again later'
        })
      })
    setRecoveryCodes(response.recoveryCodes)
  }

  useEffect(() => {
    getTwoFactorCodes()
  }, [])

  useEffect(() => {
    if (svg) {
      getRecoveryCodes()
    }
  }, [svg])

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
    >
      <div className="h-full flex flex-col justify-center items-center px-2">
        {!busy && !showVerify && !showBackupCodes && (
          <div
            className="flex flex-col items-center w-fit pt-6"
          >
            <p
              className="font-medium text-center text-lg"
            >Scan this with your favorite authenticator app</p>
            <Image 
              src={svg}
              width={250}
              height={250}
              alt="qr code"
            />
            <p>Or enter the code manually</p>
            <div
              className="flex flex-row items-center space-x-3 mt-3"
            >
              <div
                className="border border-black rounded-md p-1"
              >
                <p className="text-sm font-semibold">{secret}</p>
              </div>
              <button
                onClick={copyCode}
                className="border border-black border-opacity-40 p-1 rounded-md"
              >
                <ClipboardIcon className="w-5 text-blue-400" />
              </button>
            </div>
            <button
              onClick={() => setShowVerify(true)}
              className="bg-blue-600 rounded-md px-4 py-2 text-white font-semibold mt-6 md:w-2/3 w-full"
            >
              Continue
            </button>
            <div className="h-[1px] w-full border-t border-black border-opacity-20 my-6" />
            <p
              className="text-center md:w-2/3 w-full"
            >
              Google Authenticator is a free 2FA app for your phone. Download it now for Android or iOS.
            </p>
            <span
              className="flex flex-row items-center space-x-2"
            >
              <a
                target="_blank"
                className="flex flex-row items-center space-x-1 text-blue-600 font-medium"
                href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US&pli=1"
              >
                Play Store
                <ArrowTopRightOnSquareIcon className="w-4"/>
              </a>
              <a
                target="_blank"
                className="flex flex-row items-center space-x-1 text-blue-600 font-medium"
                href="https://apps.apple.com/us/app/google-authenticator/id388497605"
              >
                App Store
                <ArrowTopRightOnSquareIcon className="w-4"/>
              </a>
            </span>
          </div>
        )}
        {busy && !showVerify && !showBackupCodes && (
          (
            <div className="flex flex-col justify-center items-center h-full space-y-8">
              <Loading size="loading-lg"/>
              <p
                className="text-black"
              >Generating QR Code...</p>
            </div>
          )
        )}

        {showVerify && (
          <div className="flex flex-col justify-center items-center h-full">
            <p
              className="font-semibold text-2xl mb-6"
            >
              Verify 2FA
            </p>
            <p
              className="text-center md:w-2/3 w-full"
            >
              Enter the code from your authenticator app to ensure that everything works.
            </p>
            <div
              className="md:w-2/3 w-full mt-6"
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
              className="bg-blue-600 rounded-md px-4 py-2 text-white font-semibold mt-6 md:w-2/3 w-full"
            >
              Verify
            </button>
            <button
              onClick={() => setShowVerify(false)}
              className="bg-white rounded-md px-4 py-2 text-black font-semibold mt-2 md:w-2/3 w-full border border-black"
            >
              Back
            </button>
          </div>
        )}

        {showBackupCodes && (
          <div
            className="flex flex-col justify-center items-center h-full"
          >
            <p
              className="font-semibold text-2xl mb-6"
            >
              Backup Verification Codes
            </p>
            <p
              className="text-center md:w-2/3 w-full mb-4"
            >
              With 2FA enabled for your account, you&apos;ll need these backup codes if you ever lose your device.
            </p>
            <div
              className="grid grid-cols-2 gap-4"
            >
              {recoveryCodes.map((code, index) => (
                <p
                  key={index}
                  className="font-bold"
                >
                  {code}
                </p>
              ))}
            </div>
            <button
              onClick={copyRecoveryCodes}
              className="rounded-md px-4 py-2 text-white font-semibold mt-6 md:w-2/3 w-full bg-blue-600"
            >
              Copy Codes
            </button>

            <button
              onClick={handleClose}
              className="bg-white rounded-md px-4 py-2 text-black font-semibold mt-2 md:w-2/3 w-full border border-black"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default Enable2FAModal
