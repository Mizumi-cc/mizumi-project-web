import { useState } from "react"

// components
import HTMLHead from "../components/HTMLHead"
import Header from "../components/Header"
import SwapBox from "../components/SwapBox"
import CardCheckoutModal from "../components/CardCheckoutModal"

export default function Home() {
  const [showCheckoutModal, setShowCheckoutModal] = useState(true)

  const completeCheckout = async () => {

  }

  return (
    <main className='min-h-screen flex flex-col bg-stone-800'>
      <HTMLHead />
      <Header />
      <div className="justify-center items-center flex h-full pt-32">
        <SwapBox 
          openCheckoutMModal={() => setShowCheckoutModal(true)}
        />
      </div>
      <CardCheckoutModal 
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        submit={completeCheckout}
      />
    </main>
  )
}
