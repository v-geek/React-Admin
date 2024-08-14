import { useOutlet } from 'react-router-dom'

const Layout = () => {
  const outlet = useOutlet()

  return (
    <div className="flex">
      <div className="left">111</div>
      <div className="right flex-1">{outlet}</div>
    </div>
  )
}

export default Layout
