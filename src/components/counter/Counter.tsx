import { FaMinus, FaPlus } from 'react-icons/fa'
import { useCount } from '../../hooks/useCount'


export function Counter(): React.ReactElement {
    const { count, increment, decrement } = useCount(1)

    function handleClickIncrement() {
        increment()
    }

    function handleClickDecrement() {
        decrement()
    }

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
        </>
    )
}