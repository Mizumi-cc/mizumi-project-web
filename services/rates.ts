import axios from "axios"

export const getGHSRates = async () => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_RATES_API_URL}/latest?base=USD&symbols=GHS`,
    {
      headers: {
        "apikey": process.env.NEXT_PUBLIC_RATES_API_KEY
      }
    }
  )
}
