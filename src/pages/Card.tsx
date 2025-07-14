import { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import { locales } from '../config'
import type { TitleContextType } from '../types'
import { useAppSelector, useAppDispatch } from '../redux/store'
import { fetchBooks } from '../redux/booksSlice'
import { BookForCard } from '../components/bookForCard/BookForCard'
import { useTotalPrice } from '../hooks/useTotalPrice'
import { order } from '../redux/booksSlice'

export function Card(): React.ReactElement {
    const dispatch = useAppDispatch()
    const lang = useAppSelector(state => state.lang.lang)
    const card = useAppSelector(state => state.books.card)
    const { setTitle } = useOutletContext<TitleContextType>()

    // Получение книг из корзины
    useEffect(() => {
        dispatch(fetchBooks({}))
    }, [dispatch])

    // Установка заголовка страницы
    useEffect(() => { setTitle(locales[lang].card.title) }, [lang])


    if (card.length == 0) {
        return <div>{locales[lang].card.empty}</div>
    }

    // Обработка заказа
    const handleClickOrder = () => {
        dispatch(order(card))
    }

    // Отображение книг в корзине
    return (
        <>
            <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
                {card.map(book => {
                    if (!book.title || !book.image) return null;
                    return <BookForCard key={book.isbn13} {...book} />;
                })}
            </div>
            <div className="w-75 d-flex flex-column align-items-end justify-content-center">
                <div>
                    <p>{locales[lang].card.total}: ${card.reduce((acc, book) => acc + useTotalPrice(1, book.price), 0)}</p>
                </div>
                <button className="btn btn-dark" onClick={handleClickOrder}>{locales[lang].card.order}</button>
            </div>
        </>
    )
}