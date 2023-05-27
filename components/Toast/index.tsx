import { FunctionComponent } from "react"
import { Alert } from "../../utils/models"

interface Props {
  messages: Alert[]
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
          <div>
            <span>{message.text}.</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Toast
