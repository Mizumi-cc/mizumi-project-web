import Link from 'next/link'
import Image from 'next/image'

interface ImageProps {
  black: string
  white: string
}

interface LogoProps {
  image: ImageProps
  mode?: 'dark' | 'light'
  href?: string
}

const Logo = ({
  image, mode, href
}: LogoProps) => {

  return (
    <a href={href} className='flex flex-row items-center space-x-2'>
      <Image 
        src={mode === "light" ? image!.black : image!.white}
        alt="Logo"
        width={100}
        height={100}
        sizes={'100vw'}
        style={{objectFit: 'contain', height: 'auto'}}
        className="cursor-pointer transition ease-in-out hover:opacity-100"
      />
      <div className='px-[8px] bg-black w-fit h-fit text-white rounded-lg'>
        beta
      </div>
    </a>
  )
}

export default Logo
