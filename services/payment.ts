import axios from "axios"

export const verifyPayment = async (reference: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_FINCRA_URL}/checkout/payments/merchant-reference`,
    {
      headers: {
        reference: reference
      }
    }
  )
}
