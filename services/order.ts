import axios from "axios"
import type { Order } from "../utils/models"

export const createOrder = async (order: Order) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/orders`,
    order,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}
