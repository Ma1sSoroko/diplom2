import { useEffect } from 'react'
import { useParams, NavLink, useOutletContext } from 'react-router'
import { Book } from '../components/book/Book'
import { locales } from '../config/locales'
import type { TitleContextType, OrderingType } from '../types'
import { useAppSelector, useAppDispatch } from '../redux/showModals/store'
import { fetchBooks, setOrdering } from '../redux/booksSlice'
import { buildSchemePagination } from '../utils/buildPagination'

export function AllBooks(): React.ReactElement {
    const { currentPage = 1, query } = useParams()
    const dispatch = useAppDispatch()
    const lang = useAppSelector(state => state.lang.lang)
    const { books, isLoading, error, ordering } = useAppSelector(state => state.books)
    const { setTitle } = useOutletContext<TitleContextType>()
    const total = books?.length || 0

    useEffect(() => {
        const offset = (Number(currentPage) - 1) * 20
        dispatch(fetchBooks({ offset, search: query ?? '' }))
    }, [dispatch, currentPage, query])

    useEffect(() => { setTitle(locales[lang].allBooks.title) }, [lang])

    useEffect(() => {
        dispatch(setOrdering(ordering as OrderingType))
    }, [dispatch, ordering])

    if (isLoading) {
        return <div>{locales[lang].allBooks.loading}</div>
    }

    if (error) {
        return <div>{locales[lang].allBooks.error}: {error}</div>
    }

    if (!books || books.length == 0) {
        return <div>{locales[lang].allBooks.empty}</div>
    }

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

                        return <li className="page-item" key={index}><NavLink className="page-link" to={`/book/${item}`}>{item}</NavLink></li>
                    })}
                </ul>
            </nav>
        )
    }

    function handleChangeOrdering(event: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(setOrdering(event.target.value as OrderingType))
        dispatch(fetchBooks({ ordering: event.target.value as OrderingType }))
        console.log(event.target.value);
    }

    return (
        <div>
            <div className="navbar navbar-expand-lg">
                <div className="nav nav-tabs">
                    <select className="form-select" onChange={handleChangeOrdering} value={ordering}>
                        <option value="title">По названию</option>
                        <option value="price">По цене</option>
                    </select>
                </div>
            </div>
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