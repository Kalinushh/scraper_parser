import type { ReactElement } from 'react'

type InputProps = {
  name: string
  value: string
  required?: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function InputUI(props: InputProps): ReactElement {
  const { name, value, required, onChange } = props
  return (
    <label htmlFor={name}>
      {`${name}:`}
      <input
        id={name}
        type="text"
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      />
    </label>
  )
}
