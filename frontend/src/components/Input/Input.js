import { useContext } from 'react'
import SendContext from '../../contexts/SendContext'

export default function Input({ name, type, placeholder, minLength, maxLength, isInputValid, value, onChange, error }) {
  const isSending = useContext(SendContext)

  return (
    <>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        minLength={minLength ? minLength : ''}
        maxLength={maxLength ? maxLength : ''}
        required
        className={`login__input${isInputValid === undefined || isInputValid ? '' : " login__input_invalid"}`}
        value={value ? value : ''}
        onChange={onChange}
        disabled={isSending}
      />
      <span className="login__error">{error}</span>
    </>
  )
}