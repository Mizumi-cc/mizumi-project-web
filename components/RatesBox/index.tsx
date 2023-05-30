import { FunctionComponent } from "react"
import { motion } from "framer-motion"

interface RatesBoxProps {
  usdcRate: number
  ghsRate: number
  usdtRate: number
}

const RatesBox: FunctionComponent<RatesBoxProps> = ({
  usdcRate,
  ghsRate,
  usdtRate,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col w-[448px]"
    >
      <h3
        className="text-xl font-bold text-white mb-4"
      >Rates</h3>
      <div className="stats stats-vertical lg:stats-horizontal shadow bg-stone-700">
        <div className="stat">
          <div className="stat-title text-white">USDC</div>
          <div className="font-mono text-3xl text-yellow-500">${usdcRate.toFixed(2)}</div>
          <div className="stat-desc"></div>
        </div>
        
        <div className="stat">
          <div className="stat-title text-white">USDT</div>
          <div className="countdown font-mono text-3xl text-yellow-500">${usdtRate.toFixed(2)}</div>
          <div className="stat-desc"></div>
        </div>
        
        <div className="stat">
          <div className="stat-title text-white">Ghana Cedi</div>
          <div className="countdown font-mono text-3xl text-yellow-500">${(ghsRate / 100).toFixed(2)}</div>
          <div className="stat-desc"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default RatesBox
