import axios from "axios"
import type { Order } from "../utils/models"

type DebitForm = {
  txId: string, 
  userId: string,
  blockchainTxId: string,
}

export const createOrder = async (order: Order, token: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/order/create`,
    order,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }
  )
}

export const initiateDebit = async (data: DebitForm, token: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/order/debit`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
}

export const completeOrder = async (userId: string, txId: string, token: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/order/complete`,
    { userId, txId },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization":  `Bearer ${token}`
      }
    }
  )
}

export const initiateCredit = async (userId: string, txId: string, token: string) => {
  return await axios.post(
   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/order/credit`,
    { userId, txId },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
}

export const createUserProgramAccountTx = async (userId: string, token: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/order/create-user-program-account-tx/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
}

export const getUserOrders = async (userId: string, token: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/order/by-user/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
}

export const getOrder = async (orderId: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/order/${orderId}`,
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  )
}

