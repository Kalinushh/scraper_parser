import { useState } from 'react'
import type React from 'react'
import pinkbug from './assets/pinkbug.svg'
import ProductCardUI from './entities/productCard.tsx'
import ParserForm from './widgets/parserForm.tsx'
import { useParser } from './features/useParser.ts'

interface Product {
  id: string
  title: string
  price: number
  image: string
}

type OutputMode = 'cards' | 'json'

export default function App() {
  const [form, setForm] = useState({
    url: '',
    product: '',
    title: '',
    price: '',
    image: '',
    id: '',
    maxPages: '1',
  })

  const [outputMode, setOutputMode] = useState<OutputMode>('cards')
  const { parseProducts, items, loading, error } = useParser()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await parseProducts(form)
  }

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: 'auto' }}>
      <h1 className="flex items-center justify-center gap-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
        <img src={pinkbug} alt="логотип монстрик" className="w-15" />
        Парсер товаров
      </h1>

      <ParserForm
        form={form}
        onFieldChange={handleChange}
        onSubmit={handleSubmit}
        outputMode={outputMode}
        setOutputMode={setOutputMode}
        loading={loading}
      />

      <hr style={{ margin: '20px 0' }} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {outputMode === 'json' ? (
        <pre
          style={{
            background: '#1e1e1e',
            color: '#f8f8f2',
            padding: 16,
            borderRadius: 4,
            overflowX: 'auto',
            fontSize: 14,
          }}
        >
          {JSON.stringify(items, null, 2)}
        </pre>
      ) : (
        <div className="mt-5">
          {items.map((item: Product) => (
            <ProductCardUI
              key={item.id}
              image={item.image}
              title={item.title}
              price={String(item.price)}
              id={Number(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
