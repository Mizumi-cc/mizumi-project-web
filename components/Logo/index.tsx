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
    <a href={href}>
      <Image 
        src={mode === "light" ? image!.black : image!.white}
        alt="Logo"
        width={140}
        height={140}
        sizes={'100vw'}
        style={{objectFit: 'contain', height: 'auto'}}
        className="cursor-pointer transition ease-in-out hover:opacity-100"
      />
    </a>
  )
}

export default Logo
