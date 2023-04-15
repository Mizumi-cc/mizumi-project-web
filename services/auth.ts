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