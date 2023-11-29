import { FunctionComponent, ReactElement } from "react"
import { Alert } from "../../utils/models"

interface Props {
  messages: Alert[]
}

interface Map {
  [key: string]: ReactElement
}

const ALERTICONS: Map  = {
  'info': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  'error': <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  'success': <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
}

const Toast: FunctionComponent<Props> = (
  { messages }
) => {
  return (
    <div className="toast toast-start">
      {messages.map((message, idx) => (
        <div
          key={idx}
          className={message.type === 'error' ? 'alert alert-error' : message.type === 'success' ? 'alert alert-success' : 'alert alert-info'}
        >
          {ALERTICONS[message.type]}
          <div>
            <span>{message.text}.</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Toast
