import { useState } from 'react'

export function useCount (initValue = 0, price: number) {
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