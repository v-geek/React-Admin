import { useEffect, useState } from 'react'

const contextMenu = () => {
  const [count, setCount] = useState(0)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCount(count + 1)
  //   }, 1000)

  //   return () => clearInterval(timer)
  // }, [])

  return <div className="App">{count}</div>
}

export default contextMenu
