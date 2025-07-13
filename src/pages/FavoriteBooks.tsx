import { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import { locales } from '../config'
import type { TitleContextType } from '../types'
import { useAppSelector, useAppDispatch } from '../redux/store'
import { fetchBooks } from '../redux/booksSlice'
import { BookDelFavorite } from '../components/bookDelFavorite/BookDelFavorite'

export function FavoriteBooks(): React.ReactElement {
    const dispatch = useAppDispatch()
    const lang = useAppSelector(state => state.lang.lang)
    const favoriteBooks = useAppSelector(state => state.books.favoriteBooks)
    const { setTitle } = useOutletContext<TitleContextType>()

    useEffect(() => {
        dispatch(fetchBooks({}))
    }, [dispatch])

    useEffect(() => { setTitle(locales[lang].favoriteBooks.title) }, [lang])

    if (favoriteBooks.length == 0) {
        return <div>{locales[lang].favoriteBooks.empty}</div>
    }

    return (
        <div className="d-flex flex-wrap gap-3 justify-content-center">
            {favoriteBooks.map(book => {
                if (!book.title || !book.image) return null;
                return <BookDelFavorite key={book.isbn13} {...book} />;
            })}
        </div>
    )
}