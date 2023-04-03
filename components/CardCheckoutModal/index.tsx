import { FunctionComponent, Fragment, useState, useCallback } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs"
import images from "react-payment-inputs/images"

interface CardCheckoutModalProps {
  onSubmit: (data: any) => void
  isOpen: boolean
  onClose: () => void
}

const CardCheckoutModal: FunctionComponent<CardCheckoutModalProps> = ({
  onSubmit, isOpen, onClose
}) => {
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getCVCProps,
    getExpiryDateProps,
    meta
  } = usePaymentInputs()

  const [cardNumber, setCardNumber] = useState<string>('')
  const [cardCVC, setCardCVC] = useState<string>('')
  const [cardExpiry, setCardExpiry] = useState<string>('')
  
  const cardImages: any = { ...images }

  const handleChangeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  }

  const handleChangeExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardExpiry(e.target.value);
  }

  const handleChangeCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardCVC(e.target.value);
  }

  const checkForm = useCallback(() => {
    if (meta.error || cardNumber.length < 16 
      || cardCVC.length < 3 || cardExpiry.length < 1) {
      return true
    }
    return false
  }, [meta, cardNumber, cardCVC, cardExpiry])


  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className={"relative z-10"}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-25 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-fit transform overflow-hidden rounded-xl bg-stone-700 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Enter your card details
                </Dialog.Title>
                <div className="mt-2">
                  <PaymentInputsWrapper {...wrapperProps}>
                    <svg {...getCardImageProps({ images: cardImages })} />
                    <input
                      value={cardNumber}
                      {...getCardNumberProps({
                        onChange: handleChangeCardNumber,
                      })}
                    />
                    <input 
                      value={cardExpiry}
                      {...getExpiryDateProps({
                        onChange: handleChangeExpiryDate
                      })} 
                    />
                    <input
                      value={cardCVC}
                      {...getCVCProps({
                        onChange: handleChangeCVC
                      })} 
                    />
                  </PaymentInputsWrapper>
                </div>

                <div className="mt-12">
                  <button
                    type="button"
                    disabled={checkForm()}
                    className={`bg-gradient-to-r ${!checkForm() ? 'from-blue-400 to-yellow-500 p-[1px]' : ''} w-full h-[50px] rounded-lg`}
                    onClick={onSubmit}
                  >
                    <div className="w-full h-full bg-black rounded-lg flex justify-center items-center text-white font-bold text-md">
                      Pay
                    </div>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CardCheckoutModal
