import { useState } from "react"

// components
import HTMLHead from "../components/HTMLHead"
import Header from "../components/Header"
import SwapBox from "../components/SwapBox"

export default function Home() {
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false)

  return (
    <main className='min-h-screen flex flex-col bg-stone-800'>
      <HTMLHead />
      <Header />
      <div className="justify-center items-center flex h-full pt-32">
        <SwapBox 
          openPaymentDetailsMModal={() => setShowPaymentDetailsModal(true)}
        />
      </div>
    </main>
  )
}
