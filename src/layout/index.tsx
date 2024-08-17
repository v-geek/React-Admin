import { useOutlet } from 'react-router-dom'
import { RootState, useSelector } from '@/store'
import logo from '@/assets/imgs/logo.svg'
import './index.scss'
import Menu from './components/Menu'

const TITLE = import.meta.env.VITE_TITLE

const Layout = () => {
  const outlet = useOutlet()
  const isCollapse = useSelector((state: RootState) => state.system.sideBar.isCollapse)
  const sideBarWidth = isCollapse ? 64 : 210

  return (
    <div className="flex">
      <div className="sidebar" style={{ width: sideBarWidth + 'px' }}>
        <div className="logo">
          <img src={logo} alt="logo" />
          {!isCollapse && <span>{TITLE}</span>}
        </div>

        <Menu />
      </div>

      <div className="right flex-1">
        <div>122222222222222222222222222</div>
        <div>122222222222222222222222222</div>
        <div>122222222222222222222222222</div>
        <div>122222222222222222222222222</div>
        {outlet}
      </div>
    </div>
  )
}

export default Layout
