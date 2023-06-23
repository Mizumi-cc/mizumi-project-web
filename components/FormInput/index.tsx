import { FunctionComponent } from "react";

interface Props {
  type: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors?: any
  label: string
  darkBg?: boolean
}

const FormInput: FunctionComponent<Props> = ({
  type, placeholder, value, onChange, onBlur, errors, label, darkBg = true
}) => {

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className={`label-text ${darkBg ? 'text-white' : 'text-black'}`}>{label}</span>
      </label>
      <input 
        type={type}
        placeholder={placeholder}
        className={`input bg-black text-white w-full ${errors && errors[label.toLowerCase()] ? 'input-error' : ''}`} 
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errors && errors[label.toLowerCase()] && (
        <label className="label">
          <span className="label-text-alt text-red-500">{errors[label.toLocaleLowerCase()]}</span>
        </label>
      )}
    </div>
  )
}

export default FormInput
