import { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import { locales } from '../config/locales'
import type { TitleContextType } from '../types'
import { useAppSelector, useAppDispatch } from '../redux/showModals/store'
import { fetchBooks } from '../redux/booksSlice'
import { BookBasket } from '../components/bookBasket/BookBasket'

export function Basket(): React.ReactElement {
    const dispatch = useAppDispatch()
    const lang = useAppSelector(state => state.lang.lang)
    const basket = useAppSelector(state => state.books.basket)
    const { setTitle } = useOutletContext<TitleContextType>()

    useEffect(() => {
        dispatch(fetchBooks({}))
    }, [dispatch])

    useEffect(() => { setTitle(locales[lang].basket.title) }, [lang])

    if (basket.length == 0) {
        return <div>{locales[lang].basket.empty}</div>
    }

    return (
        <div className="d-flex flex-wrap gap-3 justify-content-center">
            {basket.map(book => {
                if (!book.title || !book.image) return null;
                return <BookBasket key={book.isbn13} {...book} />;
            })}
        </div>
    )
}