import { FunctionComponent } from "react"
import { motion } from "framer-motion"

interface Props {
  address: string
  isValid: boolean
  onChange: (address: string) => void
}

const WalletInput: FunctionComponent<Props> = ({ 
  address, 
  onChange,
  isValid, 
}) => {
  return (
    <motion.div>
      <input 
        value={address}
        onChange={(e) => onChange(e.target.value)}
        className="bg-black w-full py-4 rounded-lg text-white text-lg outline-none px-3 mb-1"
      />
      <p
        className="text-green-500 font-bold text-sm ml-3"
      >{address.length > 0 && isValid && 'Valid address'}</p>
      <p
        className="text-red-500 font-bold text-sm ml-3"
      >{address.length > 0 && !isValid && 'Invalid address'}</p>
    </motion.div>
  )
}

export default WalletInput
