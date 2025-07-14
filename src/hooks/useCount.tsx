import { useState } from 'react'

// Хук для подсчета количества книг в корзине
export function useCount(initValue = 0) {
  const [count, setCount] = useState(initValue)
  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1)

    }
    else {
      setCount(1)
    }
  }

  return {
    count,
    increment,
    decrement,
  }
}