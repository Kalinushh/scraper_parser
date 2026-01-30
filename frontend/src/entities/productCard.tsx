interface ProductCardProps {
  image: string
  title: string
  price: string
  id: number
}

export default function ProductCardUI(props: ProductCardProps) {
  const { image, title, id, price } = props
  return (
    <div className="mb-5 flex border-b border-gray-300 pb-5">
      <div>
        {image && (
          <img className="mr-4 h-auto w-[100px]" src={image} alt={title || 'Изображение товара'} />
        )}
      </div>
      <div>
        <strong>{title || 'Без названия'}</strong>
        <p>ID:{id ?? '-'}</p>
        <p>Цена:{price || '-'}</p>
      </div>
    </div>
  )
}
