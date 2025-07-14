import { useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router'
import { Book } from '../components/book/Book'
import { locales } from '../config'
import type { TitleContextType } from '../types'
import { useAppSelector, useAppDispatch } from '../redux/store'
import { fetchBooks } from '../redux/booksSlice'
import { Pagination } from '../components/pagination/Pagination'

export function AllBooks(): React.ReactElement {
    const { currentPage = 1, query } = useParams()
    const dispatch = useAppDispatch()
    const lang = useAppSelector(state => state.lang.lang)
    const { books, isLoading, error } = useAppSelector(state => state.books)
    const { setTitle } = useOutletContext<TitleContextType>()

    // Запрос книг
    useEffect(() => {
        const offset = (Number(currentPage) - 1) * 20
        dispatch(fetchBooks({ offset, search: query ?? '' }))
    }, [dispatch, currentPage, query])

    // Установка заголовка страницы
    useEffect(() => { setTitle(locales[lang].allBooks.title) }, [lang])

    // Отображение загрузки
    if (isLoading) {
        return <div>{locales[lang].allBooks.loading}</div>
    }

    // Отображение ошибки
    if (error) {
        return <div>{locales[lang].allBooks.error}: {error}</div>
    }

    // Отображение пустого списка книг
    if (!books || books.length == 0) {
        return <div>{locales[lang].allBooks.empty}</div>
    }

    // Отображение книг
    return (
        <div>
            <Pagination />
            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {books && books.map(book => (
                    <Book key={book.isbn13} {...book} />
                ))}
            </div>
            <Pagination />
        </div>
    )
}