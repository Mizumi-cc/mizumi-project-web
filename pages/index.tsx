import Head from "next/head"

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col justify-center items-center bg-white'>
      <Head>
        <title>Mizumi Project</title>
      </Head>
      <h1 className="text-[40px] text-purple-400 font-bold">Mizumi Project</h1>
    </main>
  )
}
