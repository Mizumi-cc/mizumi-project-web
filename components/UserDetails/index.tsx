import { FunctionComponent } from 'react'
import { DateTime } from 'luxon'

import useAuthStore from '../../stores/auth'

interface Props {
  onEditClick: () => void
  onEnable2FAClick: () => void
  onDisable2FAClick: () => void
}

const UserDetails: FunctionComponent<Props> = ({
  onEditClick, onEnable2FAClick, onDisable2FAClick
}) => {
  const { user } = useAuthStore()

  return (
    <>
      <p
        className='text-2xl font-thin underline text-black'
      >User Details</p>
      <div className='p-4 border border-black rounded-xl mt-2'>
        <p className='flex text-black'>
          <span className='mr-2 w-20 italic font-semibold'>username</span>
          {user?.username}
        </p>
        <p className='flex text-black'>
          <span className='mr-2 w-20 italic font-semibold'>email</span>
          {user?.email}
        </p>
        <p className='flex text-black'>
          <span className='mr-2 w-20 italic font-semibold'>joined</span>
          {DateTime.fromISO(user!.createdAt).toLocaleString(DateTime.DATE_MED)}
        </p>
        <div className='flex flex-row items-center space-x-6'>
          <button
            onClick={onEditClick}
            className='border-b border-black font-semibold hover:border-blue-400 mt-3 text-black'
          >
            Edit Account
          </button>
          {!user?.twoFactorEnabled && (
            <button
              onClick={onEnable2FAClick}
              className='border-b border-black font-semibold hover:border-blue-400 mt-3 text-black'
            >
              Enable 2FA
            </button>
          )}
          {user?.twoFactorEnabled && (
            <button
              onClick={onDisable2FAClick}
              className='border-b border-black font-semibold hover:border-blue-400 mt-3 text-black'
            >
              Disable 2FA
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default UserDetails