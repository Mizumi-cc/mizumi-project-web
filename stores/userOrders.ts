import { create } from "zustand"

import type { Order } from "../utils/models"

type OrderState = {
  orders: Order[]
}

type Actions = {
  reset: () => void
  setOrders: (orders: Order[]) => void
}

const initialState: OrderState = {
  orders: []
}

const useUserOrdersStore = create<OrderState & Actions>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setOrders: (orders) => set({ orders })
}))

export default useUserOrdersStore
