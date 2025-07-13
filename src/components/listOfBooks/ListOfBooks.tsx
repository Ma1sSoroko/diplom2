import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { Book } from '../../types'

type BookParams = {
  isbn13: string
}

export function ListOfBooks(): React.ReactElement {
  const { isbn13 } = useParams<BookParams>()
  const [data, setData] = useState<Book | null>(null)

  useEffect(() => {
    if (!isbn13) return

    fetchData(Number(isbn13))
  }, [isbn13])

  async function fetchData(isbn13: number): Promise<void> {
    const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`)

    if (response.ok) {
      const data: Book = await response.json()

      setData(data)
    }
  }

  if (!data) {
    return <div>Книга не найдена</div>
  }

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