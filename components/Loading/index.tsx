import { FunctionComponent } from "react"

interface Props {
  size?: 'loading-xs' | 'loading-sm' | 'loading-md' | 'loading-lg'
}
const Loading: FunctionComponent<Props> = ({
  size = 'loading-xs'
}) => {
  return(
    <div
      className="w-full flex justify-center darkmode-text"
    >
      <span className={`loading loading-spinner ${size}`}></span>
    </div>
  )
}

export default Loading
