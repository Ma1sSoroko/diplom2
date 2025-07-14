import { useEffect } from 'react'
import { useParams, NavLink, useOutletContext } from 'react-router'
import { Book } from '../components/book/Book'
import { locales } from '../config'
import type { TitleContextType } from '../types'
import { useAppSelector, useAppDispatch } from '../redux/store'
import { fetchBooks } from '../redux/booksSlice'
import { buildSchemePagination } from '../utils/buildPagination'

export function AllBooks(): React.ReactElement {
    const { currentPage = 1, query = '' } = useParams()
    const dispatch = useAppDispatch()
    const lang = useAppSelector(state => state.lang.lang)
    const { books, isLoading, error } = useAppSelector(state => state.books)
    const { setTitle } = useOutletContext<TitleContextType>()
    const total = (books?.length || 0) / 20


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

    // Пагинация
    function renderPagination(): React.ReactElement {
        const pageCount = Math.ceil(total / 20)
        const pagination = buildSchemePagination(+currentPage, pageCount)

        return (
            <nav className="my-4">
                <ul className="pagination">
                    {pagination.map((item: number | string, index: number) => {
                        if (item === '...') {
                            return <li className="page-item disabled" key={index}><span className="page-link">{item}</span></li>
                        }

                        return <li className="page-item" key={index}><NavLink className="page-link" to={`/books/all/${item}`}>{item}</NavLink></li>
                    })}
                </ul>
            </nav>
        )
    }

    // Отображение книг
    return (
        <div>
            {renderPagination()}
            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {books && books.map(book => (
                    <Book key={book.isbn13} {...book} />
                ))}
            </div>
            {renderPagination()}
        </div>
    )
}