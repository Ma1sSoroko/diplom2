import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { Container } from '../components/container/Container'
import type { Book } from '../types'
import { BookCard } from '../components/book-card/BookCard'
import { Loader } from '../components/loader/Loader'

export function BookPage(): React.ReactElement {
    const [book, setBook] = useState<Book | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { isbn13 } = useParams()

    // Получение информации о книге
    useEffect(() => {
        if (!isbn13) return

        fetchBook(Number(isbn13))
    }, [isbn13])

    // Получение информации о книге
    async function fetchBook(isbn13: number) {
        const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`)
        const data = await response.json()
        setBook(data)
        setIsLoading(false)
    }

    // Отображение загрузки
    if (isLoading) {
        return <Loader />
    }

    if (!book) return <div>Книга не найдена</div>

    // Отображение информации о книге
    return (
        <Container>
            <BookCard {...book} />
        </Container>
    )
}