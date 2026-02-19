import InputUI from '../shared/InputUI.tsx'
import type React from 'react'
import ButtonUI from '../shared/ButtonUI.tsx'

type OutputMode = 'cards' | 'json'

type FormState = {
  url: string
  product: string
  title: string
  price: string
  image: string
  id: string
  maxPages: string
}

type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onChange'> & {
  form: FormState
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  outputMode: OutputMode
  setOutputMode: React.Dispatch<React.SetStateAction<OutputMode>>
  loading: boolean
}

export default function ParserForm({
  form,
  onFieldChange,
  onSubmit,
  outputMode,
  setOutputMode,
  loading,
  ...props
}: FormProps) {
  return (
    <form {...props} onSubmit={onSubmit} className="flex flex-col items-center">
      {['url', 'product', 'title', 'price', 'image', 'id', 'maxPages'].map((item) => (
        <div key={item}>
          <InputUI
            name={item}
            required={item === 'url' || item === 'product'}
            value={form[item as keyof FormState]}
            onChange={onFieldChange}
            className="border-input flex w-full"
          />
        </div>
      ))}

      <label className="mt-2.5">
        Режим вывода:{' '}
        <select
          name="outputMode"
          value={outputMode}
          onChange={(e) => setOutputMode(e.target.value as OutputMode)}
        >
          <option value="cards">Карточки</option>
          <option value="json">JSON</option>
        </select>
      </label>

      <ButtonUI
        className="border-button mt-3 cursor-pointer px-5 py-0.5 text-base"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Загрузка...' : 'Спарсить'}
      </ButtonUI>
    </form>
  )
}
