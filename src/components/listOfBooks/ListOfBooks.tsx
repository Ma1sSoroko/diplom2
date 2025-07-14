import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { Book } from '../../types'

// Тип параметров книги
type BookParams = {
  isbn13: string
}

// Список книг
export function ListOfBooks(): React.ReactElement {
  const { isbn13 } = useParams<BookParams>()
  const [data, setData] = useState<Book | null>(null)

  // Запрос данных
  useEffect(() => {
    if (!isbn13) return

    fetchData(Number(isbn13))
  }, [isbn13])

  // Запрос данных
  async function fetchData(isbn13: number): Promise<void> {
    const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`)

    // Если ответ успешный, то устанавливаем данные
    if (response.ok) {
      const data: Book = await response.json()

      setData(data)
    }
  }

  // Если данные не найдены, то возвращаем сообщение
  if (!data) {
    return <div>Книга не найдена</div>
  }

  // Возвращаем список книг
  return (
    <article>
      <div className="d-flex justify-content-center">
        <img src={data.image} alt="" className="img-fluid rounded" />
      </div>
      <h1 className="mt-3">{data.title}</h1>
      <p>{data.price}</p>
    </article>
  )
}