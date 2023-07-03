import axios from "axios"

export type RegisterForm = {
  email: string
  username: string
  password: string
}

export type LoginForm = {
  email?: string
  password: string
  username?: string
}

export type UpdateProfileForm = {
  username?: string
  firstName?: string
  lastName?: string
}

export type TwoFactorChallengeForm = {
  id: string
  code?: string
  recoveryCode?: string
}

export const register = async (form: RegisterForm) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
    form,
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  )
}

export const login = async (form: LoginForm) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
    form,
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  )
}

export const logout = async (token: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
}

export const fetchAuthenticatedUser = async (token: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
}

export const isUniqueUsernameOrEmail = async (username?: string, email?: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/is-unique?${username ? `username=${username}` : ''}${email ? `email=${email}` : ''}`,
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  )
}

export const saveWalletAddress = async (token: string, address: string) => {
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/wallet-address`,
    { address },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
}

export const changePassword = async (token: string, oldPassword: string, newPassword: string) => {
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/change-password`,
    { oldPassword, newPassword },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
}

export const updateProfile = async (token: string, form: UpdateProfileForm) => {
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/update-profile`,
    form,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
}

export const enableTwoFactor = async (token: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/enable-2fa`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
}

export const disableTwoFactor = async (token: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/disable-2fa`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
}

export const twoFactorChallenge =async (form: TwoFactorChallengeForm) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/2fa-challenge`,
    form,
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  )
}

export const fetchTwoFactorRecoveryCodes = async (token: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/2fa-recovery-codes`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
}
