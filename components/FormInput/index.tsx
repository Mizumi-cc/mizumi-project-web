import { FunctionComponent } from "react";

interface Props {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors?: any
  label: string

}

const FormInput: FunctionComponent<Props> = ({
  type, placeholder, value, onChange, onBlur, errors, label
}) => {

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input 
        type={type}
        placeholder={placeholder}
        className="input bg-black w-full" 
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errors && errors[label.toLocaleLowerCase()] && (
        <label className="label">
          <span className="label-text-alt">{errors[label.toLocaleLowerCase()]}</span>
        </label>
      )}
    </div>
  )
}

export default FormInput
