import Image from "next/image"

// components
import HTMLHead from "../components/HTMLHead"
import Header from "../components/Header"

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col bg-slate-800'>
      <HTMLHead />
      <Header />
    </main>
  )
}
