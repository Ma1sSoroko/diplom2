import { FaMinus, FaPlus } from 'react-icons/fa'
import { useCount } from '../../hooks/useCount'
import { useTotalPrice } from '../../hooks/useTotalPrice'

// Счетчик количества книг в корзине
export function Counter(props: { price: string }): React.ReactElement {
    const { price } = props
    const { count, increment, decrement } = useCount(1)

    function handleClickIncrement() {
        increment()
    }

    function handleClickDecrement() {
        decrement()
    }

    const totalPrice = useTotalPrice(count, price)

    return (
        <>
            <button
                type="button"
                className="btn mb-2"
                onClick={handleClickDecrement} >
                <FaMinus />
            </button>
            <span className="d-flex align-items-center justify-content-center">{count}</span>
            <button
                type="button"
                className="btn mb-2 "
                onClick={handleClickIncrement}>
                <FaPlus />
            </button>
            <div className="d-flex align-items-center justify-content-center">${totalPrice}</div>
        </>
    )
}