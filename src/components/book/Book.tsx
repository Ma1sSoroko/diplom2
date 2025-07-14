import { Link } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { addCard, addFavoriteBook } from '../../redux/booksSlice'
import type { Book } from '../../types'
import { FaBookmark, FaShoppingBasket } from 'react-icons/fa'
import { locales } from '../../config'

export function Book(props: Book): React.ReactElement {
    const { title, price, image, isbn13 } = props
    const dispatch = useAppDispatch()
    const lang = useAppSelector(state => state.lang.lang)
    
    function handleClickAddToFavorite() {
        dispatch(addFavoriteBook(props))
    }

    function handleClickAddToCard() {
        dispatch(addCard(props))
    }

    return (
        <>
            <div className="card w-25 mb-4 flex-1-1-200 m-3 text-dark d-flex flex-column justify-content-between">
                <div>
                    <img src={image} alt="#" className="w-100" />
                </div>
                <div className="p-3">
                    <p className="text-transform-uppercase font-weight-bold font-size-10">{title}</p>
                    <p className="card-text font-size-14">{price}</p>
                </div>
                <div className="d-flex justify-content-between flex-end">
                    <Link to={`/book/${isbn13}`} className="btn">{locales[lang].book.more}</Link>
                    <div>
                        <div className="btn mb-2" onClick={handleClickAddToFavorite}>
                            <FaBookmark className="text-dark" />
                        </div>
                        <div className="btn mb-2" onClick={handleClickAddToCard}>
                            <FaShoppingBasket className="text-dark" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}