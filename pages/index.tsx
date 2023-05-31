import { useMemo, useState } from "react"

// components
import HTMLHead from "../components/HTMLHead"
import Header from "../components/Header"
import Loading from "../components/Loading"

//services
import { joinWaitlist } from "../services/waitlist"

export default function Home() {
  const [busy, setBusy] = useState(false)
  const [email, setEmail] = useState('')
  const [requestStatus, setRequestStatus] = useState('')

  const validEmail = useMemo(() => {
    if (email.length === 0) return false
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    } else {
      return false
    }
  }, [email])

  const handleSubmit = async () => {
    setBusy(true)
    await joinWaitlist(email)
      .then(res => {
        setRequestStatus('You have been added to the waitlist!')
        setBusy(false)
      })
      .catch(err => {
        setBusy(false)  
        console.log(err)
        setRequestStatus('Something went wrong.')
      })
    
  }

  return (
    <main
      className="h-screen flex flex-col bg-stone-800"
    >
      <HTMLHead />
      <Header showAuthButtons={false} />
      <div
        className="flex justify-center items-center flex-col h-full mb-40"
      >
        <h1 className="font-bold text-white text-5xl w-[800px] text-center leading-snug mb-6">
          Empowering Cross-Border Transactions in Africa
        </h1>
        <p className="text-white w-[600px] text-center tracking-wider mb-20">
          Mizumi is a decentralized exchange platform enables users to swap stable coins (USDC, USDT) for national African currencies directly and securely.
          It leverages liquidity pools to facilitate these swaps and bridge the gap between traditional finance and digital assets
        </p>
        <input 
          value={email}
          placeholder="Email address"
          onChange={e => setEmail(e.target.value)}
          className="bg-transparent outline-none text-white text-center text-lg border-b border-gray-400 focus:border-white focus:border-b-2 focus:ring-0 transition-all w-[300px]"
        />
        {requestStatus.length > 0 && (
          <p className="text-white text-sm mt-2 tracking-wide">{requestStatus}</p>
        )}
        <button
          onClick={handleSubmit}
          disabled={!validEmail || busy}
          className={`bg-transparent border ${validEmail ? 'border-[#6ACAFF]' : 'border-white'} rounded-3xl text-white text-lg mt-8 px-4 py-2 tracking-wide transition-all`}
        >
          {busy ? <Loading /> : 'Join the private beta'}
        </button>
      </div>
    </main>
  )
}