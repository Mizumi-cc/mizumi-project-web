import axios from "axios"

export const verifyPayment = async (reference: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_FINCRA_URL}/checkout/payments/merchant-reference/${reference}`,
    {
      headers: {
        "x-business-id": process.env.NEXT_PUBLIC_FINCRA_BUSINESS_ID,
        "api-key": process.env.NEXT_PUBLIC_FINCRA_SK,
        "x-pub-key": process.env.NEXT_PUBLIC_FINCRA_PK,
      }
    }
  )
}
