import { FunctionComponent } from 'react'
import { DateTime } from 'luxon'

import useAuthStore from '../../stores/auth'

const UserDetails: FunctionComponent = () => {
  const { user } = useAuthStore()

  return (
    <>
      <p
        className='text-2xl font-thin underline'
      >User Details</p>
      <div className='p-4 border border-black rounded-xl mt-2'>
        <p className='flex'>
          <span className='mr-2 w-20 italic font-semibold'>username</span>
          {user?.username}
        </p>
        <p className='flex'>
          <span className='mr-2 w-20 italic font-semibold'>email</span>
          {user?.email}
        </p>
        <p className='flex'>
          <span className='mr-2 w-20 italic font-semibold'>joined</span>
          {DateTime.fromISO(user!.createdAt).toLocaleString(DateTime.DATE_MED)}
        </p>
        <button
          className='border-b border-black font-semibold hover:border-blue-400 mt-3'
        >
          Edit Profile
        </button>
      </div>
    </>
  )
}

export default UserDetails