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
