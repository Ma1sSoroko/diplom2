import { Link } from 'react-router'
import { Counter } from '../counter/Counter'
import { useAppDispatch } from '../../redux/store'
import { removeCard } from '../../redux/booksSlice'
import type { Book } from '../../types'
import { FaTrash } from 'react-icons/fa'

// Книга для корзины
export function BookForCard(props: Book): React.ReactElement {
    const { title, image, isbn13, price } = props
    const dispatch = useAppDispatch()

    function handleClickRemoveFromCard() {
        dispatch(removeCard(props))
    }

    return (
        <>
            <div className="card w-75 d-flex flex-row">
                <Link to={`/book/${isbn13}`} className="d-flex">
                    <div>
                        <img src={image} alt="#" className="w-75" />
                    </div>
                    <div className="p-3">
                        <p className="font-weight-bold font-size-10 text-dark w-100">{title}</p>
                    </div>
                </Link>
                <div className="d-flex justify-content-between w-50">
                    <Counter price={price} />
                    <button className="btn" onClick={handleClickRemoveFromCard}>
                        <FaTrash />
                    </button>
                </div>
            </div>
        </>
    )
}