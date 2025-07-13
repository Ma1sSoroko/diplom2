import { Link } from 'react-router'
import { useAppDispatch } from '../../redux/store'
import { removeFavoriteBook } from '../../redux/booksSlice'
import type { Book } from '../../types'
import { FaRegBookmark } from 'react-icons/fa'

export function BookDelFavorite(props: Book): React.ReactElement {
    const { title, price, image, isbn13 } = props
    const dispatch = useAppDispatch()

    function handleClickRemoveFromFavorite() {
        dispatch(removeFavoriteBook(props))
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
                    <div className="d-flex gap-2">
                        <Link to={`/book/${isbn13}`} className="btn">Подробнее</Link>
                    </div>
                    <div className="btn mb-2" onClick={handleClickRemoveFromFavorite}>
                        <FaRegBookmark className="text-dark" />
                    </div>
                </div>
            </div>
        </>
    )
}