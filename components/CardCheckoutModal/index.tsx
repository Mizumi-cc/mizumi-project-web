import { FunctionComponent, Fragment, useState, useCallback } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs"
import images from "react-payment-inputs/images"

import SelectInput, { InputOption } from "../SelectInput"
import { COUNTRIES } from "../../utils/constants"

export interface CardInfo {
  cardNumber: string
  cardCVC: string
  cardExpiry: string
  firstName: string
  lastName: string
  email: string
  address: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
}

interface CardCheckoutModalProps {
  onSubmit: (data: CardInfo) => void
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
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [address2, setAddress2] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [zipCode, setZipCode] = useState<string>('')
  const [country, setCountry] = useState<InputOption>(COUNTRIES[0])

  
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

  const handleSubmit = () => {
    onSubmit({
      cardNumber,
      cardCVC,
      cardExpiry,
      firstName,
      lastName,
      email,
      address,
      address2,
      city,
      state,
      zip: zipCode,
      country: country.label
    })
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
                  className="text-lg xl:text-2xl font-medium leading-6 text-white"
                >
                  Enter your card details
                </Dialog.Title>
                <form 
                  className="mt-6 space-y-3 flex flex-col"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="flex flex-row items-center space-x-3">
                    <input 
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="rounded-sm bg-white h-[40px] text-black outline-none px-3 sm:text-sm font-medium text-lg"
                    />
                    <input 
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="rounded-sm bg-white h-[40px] text-black outline-none px-3 sm:text-sm font-medium text-lg"
                    />
                  </div>
                  <input 
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-sm bg-white h-[40px] text-black outline-none px-3 sm:text-sm font-medium text-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="rounded-sm bg-white h-[40px] text-black outline-none px-3 sm:text-sm font-medium text-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Address Line 2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className="rounded-sm bg-white h-[40px] text-black outline-none px-3 sm:text-sm font-medium text-lg"
                  />
                  <div className="flex flex-row items-center space-x-3">
                    <input 
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="rounded-sm bg-white h-[40px] text-black outline-none px-3 sm:text-sm font-medium text-lg"
                    />
                    <input 
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="rounded-sm bg-white h-[40px] text-black outline-none px-3 sm:text-sm font-medium text-lg"
                    />
                  </div>
                  <div className="flex flex-row items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Zip code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="rounded-sm bg-white h-[40px] text-black outline-none px-3 sm:text-sm font-medium text-lg"
                    />
                    
                  </div>
                  <SelectInput 
                      options={COUNTRIES}
                      onChange={setCountry}
                      selectedOption={country}
                    />
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
                </form>

                <div className="mt-24">
                  <button
                    type="button"
                    disabled={checkForm()}
                    className={`bg-gradient-to-r ${!checkForm() ? 'from-blue-400 to-yellow-500 p-[1px]' : ''} w-full h-[50px] rounded-lg`}
                    onClick={handleSubmit}
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
