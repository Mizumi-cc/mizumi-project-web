import axios from "axios"

export const joinWaitlist = async (email: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/waitlist/join`,
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  )
}