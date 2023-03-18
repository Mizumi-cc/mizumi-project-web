import Image from "next/image"

// components
import HTMLHead from "../components/HTMLHead"

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col justify-center items-center bg-white'>
      <HTMLHead />
      <Image 
        src='/assets/img/mizumi-text.png'
        alt='Mizumi Inc.'
        width={0}
        height={0}
        sizes={'100vw'}
        style={{objectFit: 'contain', height: 'auto'}}
        className="w-1/3"
      />
    </main>
  )
}
