import { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import { locales } from '../config'
import type { TitleContextType } from '../types'
import { useAppSelector, useAppDispatch } from '../redux/store'
import { fetchBooks, order } from '../redux/booksSlice'
import { BookForCard } from '../components/bookForCard/BookForCard'

export function Card(): React.ReactElement {
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

    const handleClickOrder = () => {
        dispatch(order(basket))
    }

    return (
        <>
            <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
                {basket.map(book => {
                    if (!book.title || !book.image) return null;
                    return <BookForCard key={book.isbn13} {...book} />;
                })}
            </div>
            <div className="w-75 d-flex flex-column align-items-end justify-content-center">
                <div>
                    <p>Total price: 1 000$</p>
                </div>
                <button className="btn btn-dark" onClick={handleClickOrder}>{locales[lang].basket.order}</button>
            </div>
        </>
    )
}