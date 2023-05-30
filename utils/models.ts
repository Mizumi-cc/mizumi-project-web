import { FIATCURRENCY, STABLES, TRANSACTIONKIND, TRANSACTIONSTATUS } from "./enums"

export type Order = {
  id?: string
  userId: string
  fiatAmount: number
  fiat: FIATCURRENCY
  tokenAmount: number
  token: STABLES
  status?: TRANSACTIONSTATUS
  kind: TRANSACTIONKIND
  country: string
  fiatRate: number
  tokenRate: number
  transactionHash?: string
  errorReason?: string
  settledDate?: string
  createdAt?: string
  updatedAt?: string
  payoutInfo?: any
}

export type User = {
  id: string
  email: string
  username: string
  walletAddress: string
  createdAt: string
  updatedAt: string
}

export type Alert = {
  text: string
  type: "success" | "error" | "warning" | "info"
}
