import { FIATCURRENCY, STABLES, TRANSACTIONKIND } from "./enums"

export type Order = {
  userId: string
  fiatAmount: number
  fiat: FIATCURRENCY
  tokenAmount: number
  token: STABLES
  kind: TRANSACTIONKIND
  country: string
  rate: number
}

export type User = {
  id: string
  email: string
  username: string
  walletAddress: string
  createdAt: string
  updatedAt: string
}
