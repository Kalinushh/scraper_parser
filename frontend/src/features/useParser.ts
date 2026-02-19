import { useCallback, useState } from 'react'

export interface Product {
  id: string
  title: string
  price: number
  image: string
}

export type ParseForm = {
  url: string
  product: string
  title: string
  price: string
  image: string
  id: string
  maxPages: string
}

function toSearchParams(form: ParseForm) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(form)) {
    const v = value.trim()
    if (v) params.append(key, v)
  }
  return params
}

export function useParser() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const parseProducts = useCallback(async (form: ParseForm) => {
    setLoading(true)
    setItems([])
    setError('')

    try {
      const params = toSearchParams(form)
      const res = await fetch(`/api/parse?${params.toString()}`)

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data: unknown = await res.json()
      if (!Array.isArray(data)) throw new Error('Ошибка: API вернул неожиданный формат')

      setItems(data as Product[])
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка запроса')
    } finally {
      setLoading(false)
    }
  }, [])

  return { parseProducts, items, loading, error }
}
