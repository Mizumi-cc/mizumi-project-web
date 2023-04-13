import axios from "axios"

export const getBanks = async () => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/banks}`
  )
}
