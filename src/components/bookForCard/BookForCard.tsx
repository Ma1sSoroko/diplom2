import { Link } from 'react-router'
import { Counter } from '../counter/Counter'
import { useAppDispatch } from '../../redux/store'
import { removeBasket } from '../../redux/booksSlice'
import type { Book } from '../../types'

export function BookForCard(props: Book): React.ReactElement {
    const { title, image, isbn13, price } = props
    const dispatch = useAppDispatch()

    function handleClickRemoveFromBasket() {
        dispatch(removeBasket(props))
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
                    <Counter />
                    <div className="d-flex align-items-center justify-content-center">{price}</div>
                    <button className="btn" onClick={handleClickRemoveFromBasket}>Удалить</button>
                </div>
            </div>
        </>
    )
}