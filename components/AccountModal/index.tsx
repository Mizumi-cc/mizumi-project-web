import { FunctionComponent, useState } from "react"

//components
import EditAccount from "../EditAccount"
import UserDetails from "../UserDetails"
import UserTransactions from "../UserTransactions"
import Modal from "../Modal"

//stores, services
import useAuthStore from "../../stores/auth"
import useAlertStore from "../../stores/alerts"
import useGlobalModalsStore from "../../stores/globalModals"
import { disableTwoFactor } from "../../services/auth"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AccountModal: FunctionComponent<Props> = (
  { isOpen, onClose }
) => {
  const { token } = useAuthStore()
  const { addAlert } = useAlertStore()
  const [editing, setEditing] = useState(false)

  const onEditClick = () => {
    setEditing(true)
  }

  const handleClose = () => {
    onClose()
    setEditing(false)
  }

  const onEnable2FAClick = () => {
    handleClose()
    useGlobalModalsStore.getState().toggleEnable2FAModal()
  }

  const onDisable2FAClick = async() => {
    await disableTwoFactor(token!)
      .then(() => {
        useAuthStore.getState().setUser({
          ...useAuthStore.getState().user!,
          twoFactorEnabled: false
        })
        addAlert({
          type: 'success',
          text: 'Two factor authentication disabled'
        })
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
    >
      <>
        {!editing && (
          <>
            <UserDetails
              onEditClick={onEditClick}
              onEnable2FAClick={onEnable2FAClick}
              onDisable2FAClick={onDisable2FAClick}
            />
            <div className="h-10"/>
            <UserTransactions />
          </>
        )}
        {editing && (
          <EditAccount 
            goBack={() => setEditing(false)}
          />
        )}
      </>
    </Modal>
  )
}

export default AccountModal
