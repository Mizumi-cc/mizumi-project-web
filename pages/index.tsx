/* eslint-disable @next/next/no-img-element */
import Head from "next/head"

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col justify-center items-center bg-white'>
      <Head>
        <title>Mizumi Inc.</title>
      </Head>
      <img 
        src="img/mizumi-text.png"
        alt=""
        className="w-1/3"
      />
    </main>
  )
}
