import { useState } from 'react'
export default function Home() {

  const [count, setCount] = useState(4)

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <>
      <h1>Home</h1>
      <button
        onClick={increment}> count: {count}</button>
    </>
  )
}